# Deployment Guide - Get Your Live Preview Link

## Option 1: Deploy to Vercel (Recommended - Fastest)

### Method A: Using Vercel CLI (if you have Node.js)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory:**
   ```bash
   cd "C:\Users\divya\OneDrive\Desktop\ALL SEM\Sem 7.5\Zenfinity\battery-analytics-dashboard"
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will ask you to login/create account
   - It will give you a live preview link immediately!

### Method B: Using Vercel Website (No CLI needed)

1. **Push code to GitHub first:**
   - Follow instructions in `GITHUB_SETUP.md`
   - Push your code to GitHub

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign up/Login (you can use GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings
   - Click "Deploy"
   - **Your live link will be shown in ~2 minutes!**

## Option 2: Deploy to Netlify

### Method A: Using Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Navigate to project:**
   ```bash
   cd "C:\Users\divya\OneDrive\Desktop\ALL SEM\Sem 7.5\Zenfinity\battery-analytics-dashboard"
   ```

3. **Build the project first:**
   ```bash
   npm install
   npm run build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   - Follow prompts to login/connect
   - You'll get a live link!

### Method B: Using Netlify Website

1. **Push code to GitHub first**
   - Follow instructions in `GITHUB_SETUP.md`

2. **Deploy on Netlify:**
   - Go to https://netlify.com
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"
   - **Your live link will be shown!**

## Option 3: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "homepage": "https://DivYonko.github.io/battery-analytics-dashboard",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to your repo settings → Pages
   - Select `gh-pages` branch
   - Your site will be at: `https://DivYonko.github.io/battery-analytics-dashboard`

## Quick Start (Recommended for Fastest Deployment)

**If you want a live link RIGHT NOW:**

1. **Push to GitHub:**
   ```bash
   cd "C:\Users\divya\OneDrive\Desktop\ALL SEM\Sem 7.5\Zenfinity\battery-analytics-dashboard"
   
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/DivYonko/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Go to Vercel.com:**
   - Login with GitHub
   - Import repository
   - Click Deploy
   - **Get your live link in ~2 minutes!**

## After Deployment

Once you have your live link, you can:
- Share it with others
- Submit it in the assignment form
- It will automatically update when you push changes to GitHub (if using Vercel/Netlify)

Your live link will look like:
- Vercel: `https://battery-analytics-dashboard.vercel.app` (or custom domain)
- Netlify: `https://random-name-123.netlify.app`
- GitHub Pages: `https://DivYonko.github.io/battery-analytics-dashboard`

