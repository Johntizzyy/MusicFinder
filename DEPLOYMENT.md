# Deploying to Vercel

This guide explains how to deploy your MusicFind application to Vercel.

## Prerequisites

1. A Vercel account (free at [vercel.com](https://vercel.com))
2. Git repository with your code

## Environment Variables

Set these environment variables in your Vercel project:

- `SESSION_SECRET`: A secure random string for session encryption
- `NODE_ENV`: Set to `production`

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository

### 2. Configure Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add each variable from the list above

### 4. Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy your app
3. Your app will be available at `https://your-project.vercel.app`

## How It Works

- **Frontend**: Built with Vite and served as static files
- **Backend**: Runs as serverless functions in the `/api` directory
- **Database**: In-memory storage with sample data (no external database required)
- **Routing**: All API calls go to `/api/*` and are handled by serverless functions

## Important Notes

1. **WebSocket Support**: Vercel doesn't support WebSockets in serverless functions. If you need real-time features, consider using external services like Pusher or Socket.io.

2. **File Uploads**: For file uploads, use external services like AWS S3, Cloudinary, or Vercel's own storage solutions.

3. **Session Storage**: Consider using external session stores like Redis or database-based sessions for production.

4. **Cold Starts**: Serverless functions may have cold starts. This is normal and expected.

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Environment Variables**: Ensure all required env vars are set in Vercel
3. **Data Persistence**: Data is stored in memory and will reset on serverless function cold starts
4. **CORS Issues**: The API is configured to handle CORS automatically

### Performance Optimization

1. **Bundle Splitting**: Vite automatically splits your code for better performance
2. **Tree Shaking**: Unused code is automatically removed
3. **CDN**: Vercel automatically serves static assets from their global CDN

## Support

If you encounter issues:

1. Check Vercel's deployment logs
2. Verify environment variables are set correctly
3. Test your API endpoints locally first
4. Check Vercel's documentation for serverless function limitations
