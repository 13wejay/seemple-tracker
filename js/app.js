    // ==================== DATA & STATE ====================
    let data = {
      projects: [],
      tasks: [],
      columns: [
        { id: 'backlog', title: 'Backlog' },
        { id: 'todo', title: 'To Do' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'review', title: 'Review' },
        { id: 'done', title: 'Done' }
      ]
    };

    let currentView = 'kanban';
    let currentTaskId = null;
    let draggedTaskId = null;
    let draggedColumnId = null;
    let currentCalendarDate = new Date();
    let timelineViewMode = 'weekly'; // daily, weekly, monthly

    // ==================== UTILITY FUNCTIONS ====================
    function generateId(prefix) {
      return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    function formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function getInitials(name) {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    function saveData() {
      try {
        localStorage.setItem('projectTrackerData', JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save data:', e);
      }
    }

    function loadData() {
      try {
        const stored = localStorage.getItem('projectTrackerData');
        if (stored) {
          data = JSON.parse(stored);
          // Ensure columns exist (for backward compatibility)
          if (!data.columns) {
            data.columns = [
              { id: 'backlog', title: 'Backlog' },
              { id: 'todo', title: 'To Do' },
              { id: 'in-progress', title: 'In Progress' },
              { id: 'review', title: 'Review' },
              { id: 'done', title: 'Done' }
            ];
            saveData();
          }
        } else {
          initializeSampleData();
        }
      } catch (e) {
        console.error('Failed to load data:', e);
        initializeSampleData();
      }
    }

    function initializeSampleData() {
      data = {
        projects: [
          { id: 'p1', name: 'Website Redesign', color: '#3b82f6' },
          { id: 'p2', name: 'Mobile App', color: '#10b981' },
          { id: 'p3', name: 'Marketing Campaign', color: '#f59e0b' },
          { id: 'p4', name: 'API Development', color: '#8b5cf6' }
        ],
        columns: [
          { id: 'backlog', title: 'Backlog' },
          { id: 'todo', title: 'To Do' },
          { id: 'in-progress', title: 'In Progress' },
          { id: 'review', title: 'Review' },
          { id: 'done', title: 'Done' }
        ],
        tasks: [
          {
            id: 't1',
            projectId: 'p1',
            title: 'Design homepage mockup',
            description: 'Create wireframes and high-fidelity designs for the new homepage',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Alice Cooper',
            startDate: '2024-11-10',
            dueDate: '2024-11-20',
            progress: 60,
            tags: ['design', 'ui']
          },
          {
            id: 't2',
            projectId: 'p1',
            title: 'Implement responsive navigation',
            description: 'Build mobile-friendly navigation menu',
            status: 'todo',
            priority: 'medium',
            assignee: 'Bob Smith',
            startDate: '2024-11-12',
            dueDate: '2024-11-18',
            progress: 0,
            tags: ['frontend', 'css']
          },
          {
            id: 't3',
            projectId: 'p2',
            title: 'Set up authentication flow',
            description: 'Implement OAuth and JWT token system',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Charlie Davis',
            startDate: '2024-11-08',
            dueDate: '2024-11-22',
            progress: 45,
            tags: ['backend', 'security']
          },
          {
            id: 't4',
            projectId: 'p2',
            title: 'Design app icon',
            description: 'Create app icon for iOS and Android',
            status: 'review',
            priority: 'low',
            assignee: 'Diana Prince',
            startDate: '2024-11-05',
            dueDate: '2024-11-15',
            progress: 90,
            tags: ['design', 'branding']
          },
          {
            id: 't5',
            projectId: 'p3',
            title: 'Create email templates',
            description: 'Design and code responsive email templates',
            status: 'done',
            priority: 'medium',
            assignee: 'Eve Wilson',
            startDate: '2024-11-01',
            dueDate: '2024-11-10',
            progress: 100,
            tags: ['email', 'design']
          },
          {
            id: 't6',
            projectId: 'p3',
            title: 'Launch social media campaign',
            description: 'Schedule posts across all platforms',
            status: 'todo',
            priority: 'high',
            assignee: 'Frank Miller',
            startDate: '2024-11-15',
            dueDate: '2024-11-30',
            progress: 0,
            tags: ['marketing', 'social']
          },
          {
            id: 't7',
            projectId: 'p4',
            title: 'API documentation',
            description: 'Write comprehensive API docs with examples',
            status: 'backlog',
            priority: 'medium',
            assignee: 'Grace Lee',
            startDate: '2024-11-20',
            dueDate: '2024-12-05',
            progress: 0,
            tags: ['documentation', 'api']
          },
          {
            id: 't8',
            projectId: 'p4',
            title: 'Implement rate limiting',
            description: 'Add rate limiting middleware to API endpoints',
            status: 'todo',
            priority: 'high',
            assignee: 'Henry Ford',
            startDate: '2024-11-13',
            dueDate: '2024-11-25',
            progress: 15,
            tags: ['backend', 'security']
          },
          {
            id: 't9',
            projectId: 'p1',
            title: 'User testing session',
            description: 'Conduct usability testing with 10 users',
            status: 'backlog',
            priority: 'low',
            assignee: 'Ivy Chen',
            startDate: '2024-11-25',
            dueDate: '2024-12-01',
            progress: 0,
            tags: ['testing', 'ux']
          },
          {
            id: 't10',
            projectId: 'p2',
            title: 'Optimize app performance',
            description: 'Reduce app load time and memory usage',
            status: 'in-progress',
            priority: 'medium',
            assignee: 'Jack Ryan',
            startDate: '2024-11-11',
            dueDate: '2024-11-24',
            progress: 35,
            tags: ['performance', 'optimization']
          }
        ]
      };
      saveData();
    }

    function getProject(projectId) {
      return data.projects.find(p => p.id === projectId);
    }

    function getTask(taskId) {
      return data.tasks.find(t => t.id === taskId);
    }

    function showToast(title, message, type = 'info') {
      // Create container if it doesn't exist
      let container = document.getElementById('toastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      // Icon mapping
      const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
      };

      // Create toast
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          ${message ? `<div class="toast-message">${message}</div>` : ''}
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
      `;

      container.appendChild(toast);

      // Auto remove after 3 seconds
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 3000);
    }

    // Dialog system - modern alternative to alert/confirm/prompt
    function showDialog(options) {
      return new Promise((resolve) => {
        const {
          type = 'info', // info, success, warning, error
          title = 'Notification',
          message = '',
          input = false,
          inputValue = '',
          inputPlaceholder = '',
          confirmText = 'OK',
          cancelText = 'Cancel',
          showCancel = false,
          confirmDanger = false
        } = options;

        const icons = {
          info: 'ℹ',
          success: '✓',
          warning: '⚠',
          error: '✕'
        };

        const dialogHTML = `
          <div class="dialog-overlay active" id="customDialog">
            <div class="dialog">
              <div class="dialog-header">
                <div class="dialog-icon ${type}">${icons[type] || icons.info}</div>
                <div class="dialog-header-content">
                  <div class="dialog-title">${title}</div>
                  <div class="dialog-message">${message}</div>
                </div>
              </div>
              ${input ? `
                <div class="dialog-body">
                  <input type="text" class="dialog-input" id="dialogInput" 
                         value="${inputValue}" placeholder="${inputPlaceholder}" autofocus>
                </div>
              ` : ''}
              <div class="dialog-footer">
                ${showCancel ? `<button class="dialog-btn dialog-btn-cancel" id="dialogCancel">${cancelText}</button>` : ''}
                <button class="dialog-btn dialog-btn-confirm ${confirmDanger ? 'danger' : ''}" id="dialogConfirm">${confirmText}</button>
              </div>
            </div>
          </div>
        `;

        // Remove existing dialog
        const existing = document.getElementById('customDialog');
        if (existing) existing.remove();

        // Add new dialog
        document.body.insertAdjacentHTML('beforeend', dialogHTML);

        const dialog = document.getElementById('customDialog');
        const confirmBtn = document.getElementById('dialogConfirm');
        const cancelBtn = document.getElementById('dialogCancel');
        const inputField = document.getElementById('dialogInput');

        const closeDialog = (result) => {
          dialog.remove();
          resolve(result);
        };

        confirmBtn.addEventListener('click', () => {
          if (input) {
            closeDialog(inputField.value);
          } else {
            closeDialog(true);
          }
        });

        if (cancelBtn) {
          cancelBtn.addEventListener('click', () => closeDialog(null));
        }

        // Click overlay to cancel (if cancel is available)
        if (showCancel || input) {
          dialog.addEventListener('click', (e) => {
            if (e.target === dialog) closeDialog(null);
          });
        }

        // Enter key to confirm
        if (inputField) {
          inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              closeDialog(inputField.value);
            }
          });
          inputField.focus();
        }

        // Escape key to cancel
        const escHandler = (e) => {
          if (e.key === 'Escape' && (showCancel || input)) {
            closeDialog(null);
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);
      });
    }

    // Convenience functions
    async function dialogAlert(message, title = 'Alert', type = 'info') {
      return await showDialog({ title, message, type, confirmText: 'OK' });
    }

    async function dialogConfirm(message, title = 'Confirm', type = 'warning') {
      return await showDialog({ 
        title, 
        message, 
        type, 
        showCancel: true,
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      });
    }

    async function dialogPrompt(message, title = 'Input', defaultValue = '', placeholder = '') {
      return await showDialog({ 
        title, 
        message, 
        type: 'info',
        input: true,
        inputValue: defaultValue,
        inputPlaceholder: placeholder,
        showCancel: true,
        confirmText: 'OK',
        cancelText: 'Cancel'
      });
    }

    // ==================== RENDERING FUNCTIONS ====================
    function renderKanban() {
      const board = document.getElementById('kanbanBoard');
      board.innerHTML = '';

      data.columns.forEach(column => {
        const tasks = data.tasks.filter(t => t.status === column.id);
        
        const columnEl = document.createElement('div');
        columnEl.className = 'kanban-column';
        columnEl.dataset.status = column.id;
        columnEl.dataset.columnId = column.id;
        columnEl.draggable = true;
        
        columnEl.innerHTML = `
          <div class="column-header">
            <div class="column-title">
              <span class="column-drag-handle" title="Drag to reorder column">☰</span>
              <input type="text" class="column-title-editable" value="${column.title}" data-column-id="${column.id}">
              <span class="column-count">${tasks.length}</span>
            </div>
            <div class="column-controls">
              <button class="column-control-btn delete" data-column-id="${column.id}" title="Delete column">×</button>
            </div>
          </div>
          <div class="column-cards" data-status="${column.id}"></div>
          <button class="add-task-btn" data-status="${column.id}">+ Add Task</button>
        `;

        const cardsContainer = columnEl.querySelector('.column-cards');
        
        tasks.forEach(task => {
          const project = getProject(task.projectId);
          const card = createTaskCard(task, project);
          cardsContainer.appendChild(card);
        });

        // Task drag and drop event listeners
        cardsContainer.addEventListener('dragover', handleDragOver);
        cardsContainer.addEventListener('drop', handleDrop);
        cardsContainer.addEventListener('dragleave', handleDragLeave);

        // Column drag and drop event listeners
        columnEl.addEventListener('dragstart', handleColumnDragStart);
        columnEl.addEventListener('dragend', handleColumnDragEnd);
        columnEl.addEventListener('dragover', handleColumnDragOver);
        columnEl.addEventListener('drop', handleColumnDrop);
        columnEl.addEventListener('dragleave', handleColumnDragLeave);

        // Add task button listener
        const addBtn = columnEl.querySelector('.add-task-btn');
        addBtn.addEventListener('click', () => openTaskModal(null, column.id));

        // Column title edit listener
        const titleInput = columnEl.querySelector('.column-title-editable');
        titleInput.addEventListener('blur', (e) => {
          const newTitle = e.target.value.trim();
          if (newTitle && newTitle !== column.title) {
            column.title = newTitle;
            saveData();
            populateStatusDropdown(); // Update status dropdown to reflect new name
            showToast('Column updated', `Renamed to "${newTitle}"`, 'success');
          } else if (!newTitle) {
            e.target.value = column.title;
          }
        });
        titleInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        });
        // Prevent column drag when editing title
        titleInput.addEventListener('mousedown', (e) => {
          e.stopPropagation();
        });

        // Delete column listener
        const deleteBtn = columnEl.querySelector('.column-control-btn.delete');
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteColumn(column.id);
        });

        board.appendChild(columnEl);
      });

      // Add "Add Column" button
      const addColumnBtn = document.createElement('button');
      addColumnBtn.className = 'add-column-btn';
      addColumnBtn.innerHTML = '<span class="add-column-icon">+</span>';
      addColumnBtn.title = 'Add Column';
      addColumnBtn.addEventListener('click', addColumn);
      board.appendChild(addColumnBtn);
    }

    function createTaskCard(task, project) {
      const card = document.createElement('div');
      card.className = 'task-card';
      card.draggable = true;
      card.dataset.taskId = task.id;
      
      const projectColor = project ? project.color : '#3b82f6';
      card.style.borderLeftColor = projectColor;

      card.innerHTML = `
        <div class="task-card-header">
          <div class="task-title">${task.title}</div>
          <div class="priority-dot priority-${task.priority}"></div>
        </div>
        ${project ? `<div class="task-project" style="background: ${projectColor}">${project.name}</div>` : ''}
        <div class="task-meta">
          <span class="task-date">📅 ${formatDate(task.dueDate)}</span>
          <div class="task-assignee" style="background: ${projectColor}">${getInitials(task.assignee)}</div>
        </div>
      `;

      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragend', handleDragEnd);
      card.addEventListener('click', () => openTaskModal(task.id));

      return card;
    }

    function renderTimeline() {
      const container = document.getElementById('timelineScroll');
      
      // Get date range from all tasks
      let minDate = new Date();
      let maxDate = new Date();
      
      if (data.tasks.length > 0) {
        const dates = data.tasks.flatMap(t => [new Date(t.startDate), new Date(t.dueDate)]);
        minDate = new Date(Math.min(...dates));
        maxDate = new Date(Math.max(...dates));
        
        // Add padding based on view mode
        if (timelineViewMode === 'daily') {
          minDate.setDate(minDate.getDate() - 3);
          maxDate.setDate(maxDate.getDate() + 3);
        } else if (timelineViewMode === 'weekly') {
          minDate.setDate(minDate.getDate() - 7);
          maxDate.setDate(maxDate.getDate() + 7);
        } else { // monthly
          minDate.setDate(minDate.getDate() - 30);
          maxDate.setDate(maxDate.getDate() + 30);
        }
      } else {
        maxDate.setDate(maxDate.getDate() + 30);
      }

      // Generate date headers based on view mode
      const dateHeaders = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (timelineViewMode === 'daily') {
        // Daily view - show each day
        const daysDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
        for (let i = 0; i <= daysDiff; i++) {
          const date = new Date(minDate);
          date.setDate(date.getDate() + i);
          dateHeaders.push(date);
        }
      } else if (timelineViewMode === 'weekly') {
        // Weekly view - show week starts (Sundays)
        const weeksDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24 * 7));
        let currentDate = new Date(minDate);
        // Align to Sunday
        currentDate.setDate(currentDate.getDate() - currentDate.getDay());
        for (let i = 0; i <= weeksDiff; i++) {
          dateHeaders.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 7);
        }
      } else { // monthly
        // Monthly view - show month starts
        let currentDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        while (currentDate <= maxDate) {
          dateHeaders.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }

      const daysDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

      // Filter tasks by project if needed
      const filterValue = document.getElementById('timelineProjectFilter')?.value || '';
      const filteredTasks = filterValue 
        ? data.tasks.filter(t => t.projectId === filterValue)
        : data.tasks;

      // Build timeline HTML
      let html = '<div class="timeline-grid">';
      
      // Date headers
      html += '<div class="timeline-dates">';
      dateHeaders.forEach(date => {
        const isToday = date.getTime() === today.getTime();
        let label = '';
        
        if (timelineViewMode === 'daily') {
          const dayNum = date.getDate();
          const showMonth = dayNum === 1 || date === dateHeaders[0];
          label = showMonth 
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : dayNum;
        } else if (timelineViewMode === 'weekly') {
          label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else { // monthly
          label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        }
        
        html += `<div class="timeline-date ${isToday ? 'today' : ''}">${label}</div>`;
      });
      html += '</div>';

      // Tasks
      html += '<div class="timeline-tasks">';
      
      filteredTasks.forEach(task => {
        const project = getProject(task.projectId);
        const startDate = new Date(task.startDate + 'T00:00:00');
        const endDate = new Date(task.dueDate + 'T00:00:00');
        
        const startOffset = Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        const leftPercent = (startOffset / daysDiff) * 100;
        const widthPercent = (duration / daysDiff) * 100;
        
        const color = project ? project.color : '#3b82f6';
        
        html += `
          <div class="timeline-row">
            <div class="timeline-bar" 
                 data-task-id="${task.id}"
                 style="left: ${leftPercent}%; width: ${widthPercent}%; background: ${color}; --progress: ${task.progress}%;">
              <div class="timeline-bar-title">${task.title}</div>
              <div class="timeline-bar-progress"><strong>${task.progress}%</strong> Complete • ${formatDate(task.startDate)} - ${formatDate(task.dueDate)}</div>
            </div>
          </div>
        `;
      });

      // Today marker
      const todayOffset = Math.ceil((today - minDate) / (1000 * 60 * 60 * 24));
      const todayPercent = (todayOffset / daysDiff) * 100;
      if (todayPercent >= 0 && todayPercent <= 100) {
        html += `<div class="timeline-today-marker" style="left: ${todayPercent}%;"></div>`;
      }

      html += '</div></div>';
      
      container.innerHTML = html;

      // Add click listeners to timeline bars
      container.querySelectorAll('.timeline-bar').forEach(bar => {
        bar.addEventListener('click', () => {
          const taskId = bar.dataset.taskId;
          openTaskModal(taskId);
        });
      });
    }

    function renderCalendar() {
      const year = currentCalendarDate.getFullYear();
      const month = currentCalendarDate.getMonth();
      
      // Update title
      document.getElementById('calendarTitle').textContent = 
        currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      // Update month picker
      const monthPicker = document.getElementById('calendarMonthPicker');
      if (monthPicker) {
        const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
        monthPicker.value = yearMonth;
      }

      // Get first day of month and total days
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      // Get previous month days
      const prevMonthLastDay = new Date(year, month, 0).getDate();

      // Build calendar grid
      const grid = document.getElementById('calendarGrid');
      grid.innerHTML = '';

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let dayCount = 1;
      let nextMonthDay = 1;

      // 6 weeks to ensure full calendar
      for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
          const cellIndex = week * 7 + day;
          const dayEl = document.createElement('div');
          dayEl.className = 'calendar-day';

          let currentDate;
          let dayNumber;
          let isOtherMonth = false;

          if (cellIndex < startingDayOfWeek) {
            // Previous month
            dayNumber = prevMonthLastDay - (startingDayOfWeek - cellIndex - 1);
            currentDate = new Date(year, month - 1, dayNumber);
            isOtherMonth = true;
          } else if (dayCount <= daysInMonth) {
            // Current month
            dayNumber = dayCount;
            currentDate = new Date(year, month, dayNumber);
            dayCount++;
          } else {
            // Next month
            dayNumber = nextMonthDay;
            currentDate = new Date(year, month + 1, dayNumber);
            nextMonthDay++;
            isOtherMonth = true;
          }

          if (isOtherMonth) {
            dayEl.classList.add('other-month');
          }

          if (currentDate.getTime() === today.getTime()) {
            dayEl.classList.add('today');
          }

          // Get tasks for this date
          const dateStr = currentDate.toISOString().split('T')[0];
          const tasksForDate = data.tasks.filter(task => {
            const taskStart = new Date(task.startDate + 'T00:00:00');
            const taskEnd = new Date(task.dueDate + 'T00:00:00');
            return currentDate >= taskStart && currentDate <= taskEnd;
          });

          let tasksHTML = '';
          tasksForDate.slice(0, 3).forEach(task => {
            const project = getProject(task.projectId);
            const color = project ? project.color : '#3b82f6';
            tasksHTML += `<div class="calendar-task-pill" style="background: ${color}" title="${task.title}">${task.title}</div>`;
          });

          if (tasksForDate.length > 3) {
            tasksHTML += `<div style="font-size: 10px; color: var(--gray-600); margin-top: 2px;">+${tasksForDate.length - 3} more</div>`;
          }

          dayEl.innerHTML = `
            <div class="calendar-day-number">${dayNumber}</div>
            <div class="calendar-day-tasks">${tasksHTML}</div>
          `;

          dayEl.addEventListener('click', () => showTasksForDate(currentDate, tasksForDate));

          grid.appendChild(dayEl);
        }
      }
    }

    function showTasksForDate(date, tasks) {
      if (tasks.length === 0) {
        openTaskModal(null, 'todo');
        return;
      }

      // Show modal with all tasks for this date
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      const modalHTML = `
        <div class="modal-overlay day-tasks-modal active" id="dayTasksModal">
          <div class="modal">
            <div class="modal-header">
              <h3 class="modal-title">Tasks for ${dateStr}</h3>
              <button class="modal-close" onclick="closeDayTasksModal()">×</button>
            </div>
            <div class="modal-body">
              <div class="day-tasks-list">
                ${tasks.map(task => {
                  const project = getProject(task.projectId);
                  const color = project ? project.color : '#3b82f6';
                  return `
                    <div class="day-task-item" style="border-left-color: ${color}" onclick="openTaskFromDay('${task.id}')">
                      <div class="day-task-item-title">${task.title}</div>
                      <div class="day-task-item-meta">
                        ${project ? `<span class="day-task-item-project" style="background: ${color}">${project.name}</span>` : ''}
                        <span>📅 ${formatDate(task.startDate)} - ${formatDate(task.dueDate)}</span>
                        <span>📊 ${task.progress}%</span>
                        <span style="color: var(--priority-${task.priority});">● ${task.priority}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            <div class="modal-footer">
              <div></div>
              <div class="modal-footer-right">
                <button class="btn btn-secondary" onclick="closeDayTasksModal()">Close</button>
                <button class="btn btn-primary" onclick="closeDayTasksModal(); openTaskModal(null, 'todo');">+ New Task</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Remove existing day tasks modal if any
      const existing = document.getElementById('dayTasksModal');
      if (existing) existing.remove();

      // Add new modal
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function closeDayTasksModal() {
      const modal = document.getElementById('dayTasksModal');
      if (modal) modal.remove();
    }

    function openTaskFromDay(taskId) {
      closeDayTasksModal();
      openTaskModal(taskId);
    }

    function populateProjectDropdowns() {
      // Populate project datalist for task form
      const projectList = document.getElementById('projectList');
      if (projectList) {
        projectList.innerHTML = '';
        data.projects.forEach(project => {
          const option = document.createElement('option');
          option.value = project.name;
          option.dataset.id = project.id;
          projectList.appendChild(option);
        });
      }

      // Populate timeline filter - show only projects that have tasks in kanban columns
      const filterSelect = document.getElementById('timelineProjectFilter');
      if (filterSelect) {
        const currentValue = filterSelect.value;
        filterSelect.innerHTML = '<option value="">All Projects</option>';
        
        // Get unique project IDs from tasks that are in existing columns
        const existingColumnIds = data.columns.map(c => c.id);
        const tasksInColumns = data.tasks.filter(t => existingColumnIds.includes(t.status));
        const activeProjectIds = [...new Set(tasksInColumns.map(t => t.projectId))];
        const activeProjects = data.projects.filter(p => activeProjectIds.includes(p.id));
        
        activeProjects.forEach(project => {
          const option = document.createElement('option');
          option.value = project.id;
          option.textContent = project.name;
          filterSelect.appendChild(option);
        });

        // Restore selection if still valid
        if (currentValue && activeProjectIds.includes(currentValue)) {
          filterSelect.value = currentValue;
        } else if (currentValue) {
          // Reset to "All Projects" if selected project no longer exists
          filterSelect.value = '';
        }
      }
    }

    // ==================== EVENT HANDLERS ====================
    function handleDragStart(e) {
      draggedTaskId = e.target.dataset.taskId;
      e.target.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.innerHTML);
      
      // Disable column dragging while dragging a task card
      document.querySelectorAll('.kanban-column').forEach(col => {
        col.draggable = false;
      });
      
      // Stop propagation to prevent column drag
      e.stopPropagation();
    }

    function handleDragEnd(e) {
      e.target.classList.remove('dragging');
      document.querySelectorAll('.column-cards').forEach(col => {
        col.style.background = '';
      });
      
      // Re-enable column dragging after task card drag ends
      document.querySelectorAll('.kanban-column').forEach(col => {
        col.draggable = true;
      });
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
      return false;
    }

    function handleDragLeave(e) {
      e.currentTarget.style.background = '';
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.preventDefault();

      const newStatus = e.currentTarget.dataset.status;
      const task = getTask(draggedTaskId);

      if (task && task.status !== newStatus) {
        task.status = newStatus;
        saveData();
        
        // Update timeline if it's the current view
        if (currentView === 'timeline') {
          populateProjectDropdowns();
          renderTimeline();
        } else if (currentView === 'kanban') {
          renderKanban();
        } else if (currentView === 'calendar') {
          renderCalendar();
        }
      }

      e.currentTarget.style.background = '';
      return false;
    }

    // Column drag and drop handlers
    function handleColumnDragStart(e) {
      draggedColumnId = e.currentTarget.dataset.columnId;
      e.currentTarget.classList.add('dragging-column');
      e.dataTransfer.effectAllowed = 'move';
    }

    function handleColumnDragEnd(e) {
      e.currentTarget.classList.remove('dragging-column');
      document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over-column');
      });
    }

    function handleColumnDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      
      const column = e.currentTarget;
      if (column.dataset.columnId !== draggedColumnId) {
        column.classList.add('drag-over-column');
      }
      
      return false;
    }

    function handleColumnDragLeave(e) {
      e.currentTarget.classList.remove('drag-over-column');
    }

    function handleColumnDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.preventDefault();

      const targetColumnId = e.currentTarget.dataset.columnId;
      
      if (draggedColumnId && targetColumnId && draggedColumnId !== targetColumnId) {
        // Find the indices
        const draggedIndex = data.columns.findIndex(c => c.id === draggedColumnId);
        const targetIndex = data.columns.findIndex(c => c.id === targetColumnId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
          // Remove dragged column
          const [draggedColumn] = data.columns.splice(draggedIndex, 1);
          // Insert at new position
          data.columns.splice(targetIndex, 0, draggedColumn);
          
          saveData();
          renderKanban();
          showToast('Column moved', `"${draggedColumn.title}" repositioned`, 'success');
        }
      }

      e.currentTarget.classList.remove('drag-over-column');
      return false;
    }

    function switchView(viewName) {
      currentView = viewName;

      // Update tabs
      document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === viewName);
      });

      // Update views
      document.querySelectorAll('.view').forEach(view => {
        view.classList.toggle('active', view.id === `${viewName}-view`);
      });

      // Render the active view
      if (viewName === 'kanban') {
        renderKanban();
      } else if (viewName === 'timeline') {
        renderTimeline();
      } else if (viewName === 'calendar') {
        renderCalendar();
      }
    }

    function populateStatusDropdown() {
      const statusSelect = document.getElementById('taskStatus');
      if (!statusSelect) return;
      
      const currentValue = statusSelect.value;
      statusSelect.innerHTML = '';
      
      data.columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column.id;
        option.textContent = column.title;
        statusSelect.appendChild(option);
      });
      
      if (currentValue && data.columns.find(c => c.id === currentValue)) {
        statusSelect.value = currentValue;
      }
    }

    function openTaskModal(taskId = null, defaultStatus = 'todo') {
      const modal = document.getElementById('taskModal');
      const form = document.getElementById('taskForm');
      const deleteBtn = document.getElementById('deleteTaskBtn');
      
      currentTaskId = taskId;
      populateStatusDropdown();

      if (taskId) {
        // Edit existing task
        const task = getTask(taskId);
        if (!task) return;

        document.getElementById('modalTitle').textContent = 'Edit Task';
        document.getElementById('taskId').value = task.id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description || '';
        const project = getProject(task.projectId);
        document.getElementById('taskProject').value = project ? project.name : '';
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskAssignee').value = task.assignee || '';
        document.getElementById('taskStartDate').value = task.startDate;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskProgress').value = task.progress;
        document.getElementById('taskTags').value = task.tags ? task.tags.join(', ') : '';

        deleteBtn.classList.remove('hidden');
      } else {
        // New task
        document.getElementById('modalTitle').textContent = 'New Task';
        form.reset();
        document.getElementById('taskStatus').value = defaultStatus;
        
        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        document.getElementById('taskStartDate').value = today;
        document.getElementById('taskDueDate').value = nextWeek.toISOString().split('T')[0];

        deleteBtn.classList.add('hidden');
      }

      modal.classList.add('active');
    }

    function closeTaskModal() {
      const modal = document.getElementById('taskModal');
      modal.classList.remove('active');
      currentTaskId = null;
    }

    function saveTask() {
      const form = document.getElementById('taskForm');
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Handle project - find existing or create new
      const projectInput = document.getElementById('taskProject').value.trim();
      let projectId = '';
      
      // Check if it's an existing project
      let project = data.projects.find(p => p.name.toLowerCase() === projectInput.toLowerCase());
      
      if (!project && projectInput) {
        // Create new project with random color
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
        project = {
          id: generateId('proj'),
          name: projectInput,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        data.projects.push(project);
        populateProjectDropdowns();
      }
      
      projectId = project ? project.id : '';

      const taskData = {
        title: document.getElementById('taskTitle').value.trim(),
        description: document.getElementById('taskDescription').value.trim(),
        projectId: projectId,
        status: document.getElementById('taskStatus').value,
        priority: document.getElementById('taskPriority').value,
        assignee: document.getElementById('taskAssignee').value.trim(),
        startDate: document.getElementById('taskStartDate').value,
        dueDate: document.getElementById('taskDueDate').value,
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        tags: document.getElementById('taskTags').value.split(',').map(t => t.trim()).filter(t => t)
      };

      if (currentTaskId) {
        // Update existing task
        const task = getTask(currentTaskId);
        if (task) {
          Object.assign(task, taskData);
        }
      } else {
        // Create new task
        taskData.id = generateId('task');
        data.tasks.push(taskData);
      }

      saveData();
      closeTaskModal();
      
      // Refresh project dropdowns (including timeline filter)
      populateProjectDropdowns();
      
      // Refresh current view
      switchView(currentView);
      
      const action = currentTaskId ? 'updated' : 'created';
      showToast('Task saved', `Task "${taskData.title}" has been ${action}`, 'success');
    }

    async function deleteTask() {
      if (!currentTaskId) return;
      
      const task = getTask(currentTaskId);
      const confirmed = await showDialog({
        type: 'error',
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
        showCancel: true,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmDanger: true
      });

      if (confirmed) {
        data.tasks = data.tasks.filter(t => t.id !== currentTaskId);
        saveData();
        
        // Update project filter and refresh views
        populateProjectDropdowns();
        closeTaskModal();
        switchView(currentView);
        
        showToast('Task deleted', `"${task.title}" has been removed`, 'success');
      }
    }

    async function addColumn() {
      const columnName = await dialogPrompt(
        'Enter a name for the new column:',
        'Add Column',
        '',
        'e.g., Testing, Deployment'
      );
      
      if (!columnName || !columnName.trim()) return;

      const columnId = columnName.toLowerCase().replace(/\s+/g, '-');
      
      // Check if column already exists
      if (data.columns.find(c => c.id === columnId)) {
        await dialogAlert(
          'A column with this name already exists. Please choose a different name.',
          'Column Exists',
          'warning'
        );
        return;
      }

      data.columns.push({
        id: columnId,
        title: columnName.trim()
      });

      saveData();
      renderKanban();
      showToast('Column added', `"${columnName.trim()}" has been added`, 'success');
    }

    async function deleteColumn(columnId) {
      const column = data.columns.find(c => c.id === columnId);
      if (!column) return;

      // Check if column has tasks
      const tasksInColumn = data.tasks.filter(t => t.status === columnId);
      
      let confirmMsg = '';
      if (tasksInColumn.length > 0) {
        confirmMsg = `This column contains ${tasksInColumn.length} task(s). All tasks in this column will be permanently deleted. This action cannot be undone.`;
      } else {
        confirmMsg = `Are you sure you want to delete the "${column.title}" column?`;
      }

      const confirmed = await showDialog({
        type: 'error',
        title: 'Delete Column',
        message: confirmMsg,
        showCancel: true,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmDanger: true
      });

      if (!confirmed) return;

      // Delete all tasks in this column
      if (tasksInColumn.length > 0) {
        data.tasks = data.tasks.filter(t => t.status !== columnId);
      }

      // Remove column
      data.columns = data.columns.filter(c => c.id !== columnId);
      saveData();
      
      // Refresh project dropdowns to update timeline filter
      populateProjectDropdowns();
      
      // Refresh current view
      switchView(currentView);
      
      const taskMsg = tasksInColumn.length > 0 ? ` and ${tasksInColumn.length} task(s)` : '';
      showToast('Column deleted', `"${column.title}"${taskMsg} removed`, 'success');
    }

    function navigateCalendar(direction) {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
      renderCalendar();
    }

    function goToToday() {
      currentCalendarDate = new Date();
      renderCalendar();
    }

    // ==================== INITIALIZATION ====================
    function init() {
      loadData();
      populateProjectDropdowns();
      populateStatusDropdown();
      renderKanban();

      // View tab listeners
      document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => switchView(tab.dataset.view));
      });

      // Modal listeners
      document.getElementById('newTaskBtn').addEventListener('click', () => openTaskModal());
      document.getElementById('closeModal').addEventListener('click', closeTaskModal);
      document.getElementById('cancelBtn').addEventListener('click', closeTaskModal);
      document.getElementById('saveTaskBtn').addEventListener('click', saveTask);
      document.getElementById('deleteTaskBtn').addEventListener('click', deleteTask);

      // Close modal on overlay click
      document.getElementById('taskModal').addEventListener('click', (e) => {
        if (e.target.id === 'taskModal') {
          closeTaskModal();
        }
      });

      // Calendar navigation
      document.getElementById('prevMonth').addEventListener('click', () => navigateCalendar(-1));
      document.getElementById('nextMonth').addEventListener('click', () => navigateCalendar(1));
      document.getElementById('todayBtn').addEventListener('click', goToToday);

      // Timeline project filter
      document.getElementById('timelineProjectFilter').addEventListener('change', renderTimeline);

      // Timeline view switcher
      document.querySelectorAll('.timeline-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          timelineViewMode = btn.dataset.view;
          document.querySelectorAll('.timeline-view-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderTimeline();
        });
      });

      // Calendar month picker
      document.getElementById('calendarMonthPicker').addEventListener('change', (e) => {
        const [year, month] = e.target.value.split('-');
        currentCalendarDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        renderCalendar();
      });

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeTaskModal();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          openTaskModal();
        }
      });
    }

    // Start the app
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
