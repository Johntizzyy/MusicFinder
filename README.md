# MusicFind - Music Discovery Platform

A modern music discovery and sharing platform built with React, Express, and Vite. Features include user authentication, song management, playlists, likes, comments, and search functionality.

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **Song Management**: Upload, view, and manage songs
- **Playlists**: Create and manage playlists
- **Social Features**: Like songs and add comments
- **Search**: Search through songs by title, artist, or album
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Radix UI
- **Backend**: Express.js, Passport.js
- **Database**: In-memory storage (no external database required)
- **Authentication**: Session-based with bcrypt password hashing
- **Deployment**: Vercel (serverless functions)

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd MusicFind
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🚀 Deployment to Vercel

### Prerequisites

- Vercel account (free at [vercel.com](https://vercel.com))
- Git repository with your code

### Environment Variables

Set these in your Vercel project:

- `SESSION_SECRET`: A secure random string for session encryption
- `NODE_ENV`: Set to `production`

### Deployment Steps

1. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your Git repository

2. **Configure Build Settings**:

   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

3. **Set Environment Variables**:

   - Go to Settings → Environment Variables
   - Add the variables listed above

4. **Deploy**:
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

## 📁 Project Structure

```
MusicFind/
├── api/                 # Vercel serverless functions
│   └── index.js        # Main API entry point
├── client/             # React frontend
│   ├── src/           # Source code
│   └── index.html     # HTML template
├── shared/            # Shared code
│   ├── schema.ts      # TypeScript schemas
│   └── database.js    # In-memory database
├── vercel.json        # Vercel configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Songs

- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create new song
- `GET /api/songs/:id/likes` - Get song likes
- `POST /api/songs/:id/like` - Like/unlike song

### Playlists

- `GET /api/playlists` - Get all playlists
- `GET /api/playlists/:id` - Get playlist by ID
- `POST /api/playlists` - Create new playlist
- `POST /api/playlists/:id/songs` - Add song to playlist

### Comments

- `GET /api/songs/:id/comments` - Get song comments
- `POST /api/songs/:id/comments` - Add comment to song

### Search

- `GET /api/search?q=query` - Search songs

## 🎵 Sample Data

The application comes with sample data including:

- Demo users (username: `demo_user`, password: `password123`)
- Sample songs (Bohemian Rhapsody, Hotel California, etc.)
- Sample playlists and comments

## ⚠️ Important Notes

1. **Data Persistence**: Data is stored in memory and will reset on serverless function cold starts
2. **WebSocket Support**: Not available in Vercel serverless functions
3. **File Uploads**: Use external services like AWS S3 or Cloudinary
4. **Sessions**: Consider external session stores for production

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Environment Variables**: Ensure all required env vars are set in Vercel
3. **CORS Issues**: The API is configured to handle CORS automatically

### Performance Optimization

1. **Bundle Splitting**: Vite automatically splits your code
2. **Tree Shaking**: Unused code is automatically removed
3. **CDN**: Vercel automatically serves static assets from their global CDN

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:

1. Check Vercel's deployment logs
2. Verify environment variables are set correctly
3. Test your API endpoints locally first
4. Check Vercel's documentation for serverless function limitations
