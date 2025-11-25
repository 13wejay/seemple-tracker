# 🚀 GitHub Deployment Guide

This guide will help you deploy your Project Tracker to GitHub Pages.

## 📋 Prerequisites

- Git installed on your computer
- A GitHub account
- Basic command line knowledge

## 🎯 Step-by-Step Deployment

### 1. Initialize Git Repository (if not already done)

```bash
cd d:\TrialApps\task-tracker
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Project Tracker with Kanban, Timeline, and Calendar views"
```

### 4. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Name it: `task-tracker` (or your preferred name)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### 5. Connect Local Repository to GitHub

```bash
# Replace 'your-username' with your actual GitHub username
git remote add origin https://github.com/your-username/task-tracker.git
git branch -M main
git push -u origin main
```

### 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

### 7. Wait for Deployment

- GitHub will build your site (usually takes 1-2 minutes)
- Once done, you'll see a green success message with your URL
- Your site will be at: `https://your-username.github.io/task-tracker`

### 8. Configure the Main HTML File

Since we created `index-new.html` as the separated version:

**Option A: Rename the file**
```bash
# Backup old single-file version
mv index.html index-legacy.html

# Rename new version to index.html
mv index-new.html index.html

# Commit and push
git add .
git commit -m "Use separated structure as main version"
git push
```

**Option B: Use index-new.html as default**

Create a new file called `index.html` that redirects:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=index-new.html">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to Project Tracker...</p>
</body>
</html>
```

## 🔄 Updating Your Site

Whenever you make changes:

```bash
# Stage your changes
git add .

# Commit with a meaningful message
git commit -m "Add new feature: [describe your change]"

# Push to GitHub
git push origin main
```

Your GitHub Pages site will automatically update!

## 🛠️ Troubleshooting

### Site not loading?
- Check that `index.html` or `index-new.html` exists in the root directory
- Verify GitHub Pages is enabled in Settings
- Clear your browser cache

### CSS/JS not loading?
- Check that file paths are correct (relative paths)
- Make sure `css/styles.css` and `js/app.js` exist
- Open browser Developer Tools (F12) to see any errors

### 404 Error?
- Wait a few minutes after enabling GitHub Pages
- Check the Actions tab for build status
- Ensure all files are committed and pushed

## 📱 Custom Domain (Optional)

To use your own domain:

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In repository Settings → Pages → Custom domain
3. Enter your domain (e.g., `tracker.yourdomain.com`)
4. Add DNS records at your registrar:
   ```
   Type: CNAME
   Name: tracker (or www)
   Value: your-username.github.io
   ```
5. Wait for DNS propagation (can take 24-48 hours)

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS for your site. To enforce it:

1. Go to Settings → Pages
2. Check **"Enforce HTTPS"**
3. Wait a few minutes for the certificate

## 📊 Analytics (Optional)

To track visitors, add Google Analytics:

1. Get your Google Analytics tracking code
2. Add to `index-new.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```
3. Commit and push

## 🎉 You're Live!

Your Project Tracker is now deployed and accessible worldwide!

Share your URL:
```
https://your-username.github.io/task-tracker
```

## 📝 Quick Reference

```bash
# Clone your repo on another computer
git clone https://github.com/your-username/task-tracker.git

# Check status
git status

# See commit history
git log

# Create a new branch for features
git checkout -b new-feature

# Merge branch
git checkout main
git merge new-feature

# View remote
git remote -v
```

## 🚀 Alternative Deployment Platforms

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Cloudflare Pages
1. Connect GitHub repository
2. Build settings: None needed (static site)
3. Deploy!

---

**Need help?** Open an issue on GitHub or check the documentation.

Good luck with your deployment! 🎊
