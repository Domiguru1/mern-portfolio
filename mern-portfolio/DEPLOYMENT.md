# 🚀 Deployment Guide: Vercel + Render

This guide will help you deploy your MERN portfolio to production using Vercel (frontend) and Render (backend).

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account
- Render account

## 🗂️ Part 1: Backend Deployment on Render

### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user:
   - Go to Database Access → Add New Database User
   - Choose "Password" authentication
   - Username: `admin` (or your choice)
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"

4. Whitelist IP addresses:
   - Go to Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Render to connect

5. Get connection string:
   - Go to Database → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/mern-portfolio?retryWrites=true&w=majority`

### Step 2: Deploy Backend on Render

1. **Push code to GitHub** (if not done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub and select your repository
   - Configure:
     - **Name**: `mern-portfolio-api` (or your choice)
     - **Region**: Oregon (US West)
     - **Branch**: `main`
     - **Root Directory**: `server`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secure-random-string-here
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```
   
   **Generate JWT Secret**: Use [this tool](https://generate-secret.vercel.app/32) or run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Deploy**: Click "Create Web Service"

6. **Note your Render URL**: After deployment, you'll get a URL like:
   `https://mern-portfolio-api.onrender.com`

### Step 3: Test Backend

Visit your Render URL to confirm it's working:
- `https://your-render-service.onrender.com/` - Should show API info
- `https://your-render-service.onrender.com/health` - Should show health status

## 🎨 Part 2: Frontend Deployment on Vercel

### Step 1: Update API Configuration

1. **Update API URL in code**:
   - Open `client/src/services/api.js`
   - Replace `your-render-service-name` with your actual Render service name
   
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 
     (process.env.NODE_ENV === 'production' 
       ? 'https://your-actual-render-service.onrender.com/api'
       : 'http://localhost:5000/api');
   ```

2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

### Step 2: Deploy Frontend on Vercel

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub
   - Select your `mern-portfolio` repository

3. **Configure Deployment**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variables**:
   - Go to project Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-render-service.onrender.com/api
     ```

5. **Deploy**: Click "Deploy"

6. **Note your Vercel URL**: You'll get a URL like:
   `https://mern-portfolio.vercel.app`

### Step 3: Update Backend CORS

1. **Go back to Render**:
   - Navigate to your web service
   - Go to Environment tab
   - Update `CLIENT_URL` with your Vercel URL:
     ```
     CLIENT_URL=https://your-vercel-app.vercel.app
     ```

2. **Redeploy Backend**: Your service will automatically redeploy

## 🔧 Part 3: Final Configuration

### Step 1: Create Admin User

1. **Test API endpoint**:
   Visit: `https://your-render-service.onrender.com/api/admin/create`

2. **Create admin via API call**:
   ```bash
   curl -X POST https://your-render-service.onrender.com/api/admin/create \
   -H "Content-Type: application/json" \
   -d '{
     "username": "admin",
     "email": "admin@example.com", 
     "password": "your-secure-password"
   }'
   ```

   Or use a tool like Postman/Insomnia

3. **Test admin login**:
   - Go to `https://your-vercel-app.vercel.app/admin/login`
   - Use the credentials you just created

### Step 2: Test Everything

1. **Frontend**: `https://your-vercel-app.vercel.app`
2. **Admin Panel**: `https://your-vercel-app.vercel.app/admin/login`
3. **API**: `https://your-render-service.onrender.com`

## 🎯 Common Issues & Solutions

### Backend Issues

**Issue**: "Application failed to respond"
- **Solution**: Check environment variables are set correctly
- **Check**: MongoDB connection string is valid
- **Check**: All required env vars are present

**Issue**: CORS errors
- **Solution**: Ensure CLIENT_URL in Render matches your Vercel URL exactly

**Issue**: "Cannot connect to MongoDB"
- **Solution**: 
  - Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
  - Check connection string has correct password
  - Ensure database user has proper permissions

### Frontend Issues

**Issue**: "Network Error" or API calls failing
- **Solution**: Verify REACT_APP_API_URL points to correct Render URL
- **Check**: Render service is running and accessible

**Issue**: Blank page after deployment
- **Solution**: Check browser console for errors
- **Check**: Ensure all routes are properly configured

**Issue**: Admin routes not working
- **Solution**: Ensure vercel.json is configured for SPA routing

## 🔄 Redeployment

### Frontend (Vercel)
- Push changes to GitHub
- Vercel automatically redeploys

### Backend (Render)
- Push changes to GitHub  
- Render automatically redeploys
- Or manually redeploy from Render dashboard

## 📊 Monitoring

### Render
- Monitor logs in Render dashboard
- Check health endpoint: `/health`
- Monitor resource usage

### Vercel
- Check function logs in Vercel dashboard
- Monitor build times and deployments

## 🚀 Production Optimizations

### Backend
- Enable MongoDB Atlas connection pooling
- Add request rate limiting
- Implement proper logging (Winston)
- Add health checks and monitoring

### Frontend
- Optimize images and assets
- Enable Vercel Analytics
- Add error boundary components
- Implement service workers for caching

## 🔐 Security

### Environment Variables
- Never commit .env files
- Use strong JWT secrets
- Rotate secrets regularly

### Database
- Use database user with minimal required permissions
- Enable MongoDB Atlas auditing
- Regular backup verification

---

## 🎉 Congratulations!

Your MERN portfolio is now live in production!

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.onrender.com
- **Admin**: https://your-app.vercel.app/admin/login

### Next Steps
1. Add your own content and projects
2. Customize the design
3. Set up monitoring and analytics
4. Consider adding a custom domain