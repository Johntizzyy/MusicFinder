import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { db } from "../shared/database.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.users.findByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Authentication routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.users.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await db.users.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

app.post("/api/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Logout successful" });
  });
});

// User routes
app.get("/api/user/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ user: req.user });
});

// Song routes
app.get("/api/songs", async (req, res) => {
  try {
    const allSongs = await db.songs.list();
    res.json(allSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/songs/:id", async (req, res) => {
  try {
    const song = await db.songs.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/songs", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { title, artist, album, duration, url, coverImage } = req.body;
    const newSong = await db.songs.create({
      title,
      artist,
      album,
      duration: parseInt(duration),
      url,
      coverImage,
      userId: req.user.id,
    });

    res.json(newSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Playlist routes
app.get("/api/playlists", async (req, res) => {
  try {
    const allPlaylists = await db.playlists.list();
    res.json(allPlaylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/playlists/:id", async (req, res) => {
  try {
    const playlist = await db.playlists.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const playlistSongs = await db.playlistSongs.findByPlaylistId(
      req.params.id
    );
    const songs = await Promise.all(
      playlistSongs.map(async (ps) => await db.songs.findById(ps.songId))
    );

    res.json({ playlist, songs: songs.filter(Boolean) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/playlists", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { name, description, isPublic } = req.body;
    const newPlaylist = await db.playlists.create({
      name,
      description,
      isPublic: isPublic !== false,
      userId: req.user.id,
    });

    res.json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/playlists/:id/songs", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { songId } = req.body;
    const playlist = await db.playlists.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const playlistSong = await db.playlistSongs.create({
      playlistId: req.params.id,
      songId,
    });

    res.json(playlistSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like routes
app.post("/api/songs/:id/like", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const existingLike = await db.likes.findByUserAndSong(
      req.user.id,
      req.params.id
    );
    if (existingLike) {
      await db.likes.delete(existingLike.id);
      res.json({ message: "Like removed" });
    } else {
      const newLike = await db.likes.create({
        userId: req.user.id,
        songId: req.params.id,
      });
      res.json(newLike);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/songs/:id/likes", async (req, res) => {
  try {
    const likes = await db.likes.findBySongId(req.params.id);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comment routes
app.get("/api/songs/:id/comments", async (req, res) => {
  try {
    const comments = await db.comments.findBySongId(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/songs/:id/comments", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { content } = req.body;
    const newComment = await db.comments.create({
      userId: req.user.id,
      songId: req.params.id,
      content,
    });

    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search functionality
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query required" });
    }

    const searchResults = await db.songs.search(q);
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist/public"));

  app.get("*", (req, res) => {
    res.sendFile("dist/public/index.html", { root: "." });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Export for Vercel
export default app;
