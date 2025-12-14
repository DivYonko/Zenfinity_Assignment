# GitHub Setup Instructions

## Steps to Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/DivYonko?tab=repositories
   - Click "New" to create a new repository
   - Name it: `zenfinity-battery-dashboard` (or any name you prefer)
   - Make it **Public**
   - Do NOT initialize with README, .gitignore, or license (we already have these)

2. **Connect your local repository to GitHub:**

   Open PowerShell or Git Bash in the project directory and run:

   ```bash
   cd "C:\Users\divya\OneDrive\Desktop\ALL SEM\Sem 7.5\Zenfinity\battery-analytics-dashboard"
   
   git remote add origin https://github.com/DivYonko/YOUR_REPO_NAME.git
   
   git branch -M main
   
   git push -u origin main
   ```

   Replace `YOUR_REPO_NAME` with the actual repository name you created.

3. **If you need to authenticate:**
   - GitHub may ask for your username and password
   - For password, use a Personal Access Token (not your GitHub password)
   - To create a token: GitHub Settings → Developer settings → Personal access tokens → Generate new token
   - Give it `repo` permissions

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create zenfinity-battery-dashboard --public --source=. --remote=origin --push
```

## After Pushing

Once your code is on GitHub, you can:

1. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect React and deploy

2. **Deploy to Netlify:**
   - Go to https://netlify.com
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Submit the assignment:**
   - Fill out the Google Form with your repository URL and live demo URL

