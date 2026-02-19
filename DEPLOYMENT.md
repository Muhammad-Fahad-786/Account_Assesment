# Deployment Guide

## Backend (Render) - Already Deployed ✅

**Backend URL:** `https://account-assesment-1.onrender.com`

The backend is already deployed and configured. The frontend is set to use this URL by default.

## Frontend (Vercel) - Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

### Step-by-Step Deployment

#### Method 1: Via Vercel Dashboard (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with GitHub

3. **Create New Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

4. **Configure Project Settings**
   - **Framework Preset:** Vite (or select "Other" if Vite is not listed)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variable (Optional)**
   - Click "Environment Variables"
   - Add:
     - **Key:** `VITE_API_URL`
     - **Value:** `https://account-assesment-1.onrender.com/api`
   - **Note:** This is optional since the code already uses this URL as default

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Method 2: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name? (Enter a name or press Enter)
   - Directory? **./** (current directory)
   - Override settings? **N**

6. **Your app is deployed!**
   - You'll get a URL like `https://your-project.vercel.app`

### Post-Deployment

1. **Test the deployment:**
   - Visit your Vercel URL
   - Try creating an account
   - Test deposit, withdraw, and transfer features

2. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain

### Troubleshooting

**Issue: API calls failing**
- Check that backend is running at `https://account-assesment-1.onrender.com`
- Verify CORS is enabled on backend (already configured)
- Check browser console for errors

**Issue: Build fails**
- Ensure `frontend/package.json` has correct build script
- Check that all dependencies are listed
- Review build logs in Vercel dashboard

**Issue: 404 errors on routes**
- Ensure `vercel.json` has rewrites configured (already done)
- Check that `outputDirectory` is set to `dist`

### Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://account-assesment-1.onrender.com/api` | Optional (default already set) |

### Backend Environment Variables (Render)

| Variable | Value | Required |
|----------|-------|----------|
| `MONGODB_URI` | Your MongoDB connection string | Yes |
| `PORT` | Auto-set by Render | No |
| `NODE_ENV` | `production` | Recommended |

## Testing Production Deployment

1. **Health Check:**
   - Backend: `https://account-assesment-1.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Banking API is running"}`

2. **Frontend:**
   - Visit your Vercel URL
   - All features should work as expected

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check Render backend logs
3. Verify environment variables are set correctly
4. Test API endpoints directly using Postman or curl
