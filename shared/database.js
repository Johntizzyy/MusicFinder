import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

// In-memory storage
const users = new Map();
const songs = new Map();
const playlists = new Map();
const playlistSongs = new Map();
const likes = new Map();
const comments = new Map();
const follows = new Map();
const notifications = new Map();
const sessions = new Map();

// Initialize with some sample data
const initializeSampleData = () => {
  // Sample users
  const sampleUsers = [
    {
      id: nanoid(),
      username: "demo_user",
      email: "demo@example.com",
      password: bcrypt.hashSync("password123", 10),
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      username: "music_lover",
      email: "music@example.com",
      password: bcrypt.hashSync("password123", 10),
      createdAt: new Date(),
    },
  ];

  sampleUsers.forEach((user) => {
    users.set(user.id, user);
  });

  // Sample songs
  const sampleSongs = [
    {
      id: nanoid(),
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: 354,
      url: "https://example.com/bohemian-rhapsody.mp3",
      coverImage: "https://example.com/bohemian-rhapsody.jpg",
      userId: sampleUsers[0].id,
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: 391,
      url: "https://example.com/hotel-california.mp3",
      coverImage: "https://example.com/hotel-california.jpg",
      userId: sampleUsers[0].id,
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: 183,
      url: "https://example.com/imagine.mp3",
      coverImage: "https://example.com/imagine.jpg",
      userId: sampleUsers[1].id,
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: 482,
      url: "https://example.com/stairway-to-heaven.mp3",
      coverImage: "https://example.com/stairway-to-heaven.jpg",
      userId: sampleUsers[1].id,
      createdAt: new Date(),
    },
  ];

  sampleSongs.forEach((song) => {
    songs.set(song.id, song);
  });

  // Sample playlists
  const samplePlaylists = [
    {
      id: nanoid(),
      name: "Classic Rock",
      description: "The best classic rock songs",
      userId: sampleUsers[0].id,
      isPublic: true,
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      name: "Chill Vibes",
      description: "Relaxing music for any mood",
      userId: sampleUsers[1].id,
      isPublic: true,
      createdAt: new Date(),
    },
  ];

  samplePlaylists.forEach((playlist) => {
    playlists.set(playlist.id, playlist);
  });

  // Sample playlist songs
  const samplePlaylistSongs = [
    {
      id: nanoid(),
      playlistId: samplePlaylists[0].id,
      songId: sampleSongs[0].id,
      addedAt: new Date(),
    },
    {
      id: nanoid(),
      playlistId: samplePlaylists[0].id,
      songId: sampleSongs[1].id,
      addedAt: new Date(),
    },
    {
      id: nanoid(),
      playlistId: samplePlaylists[1].id,
      songId: sampleSongs[2].id,
      addedAt: new Date(),
    },
  ];

  samplePlaylistSongs.forEach((playlistSong) => {
    playlistSongs.set(playlistSong.id, playlistSong);
  });

  // Sample likes
  const sampleLikes = [
    {
      id: nanoid(),
      userId: sampleUsers[0].id,
      songId: sampleSongs[2].id,
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      userId: sampleUsers[1].id,
      songId: sampleSongs[0].id,
      createdAt: new Date(),
    },
  ];

  sampleLikes.forEach((like) => {
    likes.set(like.id, like);
  });

  // Sample comments
  const sampleComments = [
    {
      id: nanoid(),
      userId: sampleUsers[0].id,
      songId: sampleSongs[2].id,
      content: "This song is absolutely beautiful!",
      createdAt: new Date(),
    },
    {
      id: nanoid(),
      userId: sampleUsers[1].id,
      songId: sampleSongs[0].id,
      content: "A true masterpiece!",
      createdAt: new Date(),
    },
  ];

  sampleComments.forEach((comment) => {
    comments.set(comment.id, comment);
  });
};

// Initialize sample data
initializeSampleData();

// Database operations
export const db = {
  // User operations
  users: {
    create: async (userData) => {
      const user = {
        id: nanoid(),
        ...userData,
        createdAt: new Date(),
      };
      users.set(user.id, user);
      return user;
    },

    findById: async (id) => {
      return users.get(id) || null;
    },

    findByUsername: async (username) => {
      for (const user of users.values()) {
        if (user.username === username) {
          return user;
        }
      }
      return null;
    },

    findByEmail: async (email) => {
      for (const user of users.values()) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    },

    update: async (id, updates) => {
      const user = users.get(id);
      if (!user) return null;

      const updatedUser = { ...user, ...updates };
      users.set(id, updatedUser);
      return updatedUser;
    },

    delete: async (id) => {
      return users.delete(id);
    },

    list: async () => {
      return Array.from(users.values());
    },
  },

  // Song operations
  songs: {
    create: async (songData) => {
      const song = {
        id: nanoid(),
        ...songData,
        createdAt: new Date(),
      };
      songs.set(song.id, song);
      return song;
    },

    findById: async (id) => {
      return songs.get(id) || null;
    },

    findByUserId: async (userId) => {
      return Array.from(songs.values()).filter(
        (song) => song.userId === userId
      );
    },

    search: async (query) => {
      const lowercaseQuery = query.toLowerCase();
      return Array.from(songs.values()).filter(
        (song) =>
          song.title.toLowerCase().includes(lowercaseQuery) ||
          song.artist.toLowerCase().includes(lowercaseQuery) ||
          (song.album && song.album.toLowerCase().includes(lowercaseQuery))
      );
    },

    list: async () => {
      return Array.from(songs.values()).sort(
        (a, b) => b.createdAt - a.createdAt
      );
    },

    update: async (id, updates) => {
      const song = songs.get(id);
      if (!song) return null;

      const updatedSong = { ...song, ...updates };
      songs.set(id, updatedSong);
      return updatedSong;
    },

    delete: async (id) => {
      return songs.delete(id);
    },
  },

  // Playlist operations
  playlists: {
    create: async (playlistData) => {
      const playlist = {
        id: nanoid(),
        ...playlistData,
        createdAt: new Date(),
      };
      playlists.set(playlist.id, playlist);
      return playlist;
    },

    findById: async (id) => {
      return playlists.get(id) || null;
    },

    findByUserId: async (userId) => {
      return Array.from(playlists.values()).filter(
        (playlist) => playlist.userId === userId
      );
    },

    list: async () => {
      return Array.from(playlists.values()).sort(
        (a, b) => b.createdAt - a.createdAt
      );
    },

    update: async (id, updates) => {
      const playlist = playlists.get(id);
      if (!playlist) return null;

      const updatedPlaylist = { ...playlist, ...updates };
      playlists.set(id, updatedPlaylist);
      return updatedPlaylist;
    },

    delete: async (id) => {
      return playlists.delete(id);
    },
  },

  // PlaylistSong operations
  playlistSongs: {
    create: async (playlistSongData) => {
      const playlistSong = {
        id: nanoid(),
        ...playlistSongData,
        addedAt: new Date(),
      };
      playlistSongs.set(playlistSong.id, playlistSong);
      return playlistSong;
    },

    findByPlaylistId: async (playlistId) => {
      return Array.from(playlistSongs.values()).filter(
        (ps) => ps.playlistId === playlistId
      );
    },

    delete: async (id) => {
      return playlistSongs.delete(id);
    },
  },

  // Like operations
  likes: {
    create: async (likeData) => {
      const like = {
        id: nanoid(),
        ...likeData,
        createdAt: new Date(),
      };
      likes.set(like.id, like);
      return like;
    },

    findBySongId: async (songId) => {
      return Array.from(likes.values()).filter(
        (like) => like.songId === songId
      );
    },

    findByUserId: async (userId) => {
      return Array.from(likes.values()).filter(
        (like) => like.userId === userId
      );
    },

    findByUserAndSong: async (userId, songId) => {
      for (const like of likes.values()) {
        if (like.userId === userId && like.songId === songId) {
          return like;
        }
      }
      return null;
    },

    delete: async (id) => {
      return likes.delete(id);
    },
  },

  // Comment operations
  comments: {
    create: async (commentData) => {
      const comment = {
        id: nanoid(),
        ...commentData,
        createdAt: new Date(),
      };
      comments.set(comment.id, comment);
      return comment;
    },

    findBySongId: async (songId) => {
      return Array.from(comments.values())
        .filter((comment) => comment.songId === songId)
        .sort((a, b) => b.createdAt - a.createdAt);
    },

    delete: async (id) => {
      return comments.delete(id);
    },
  },

  // Session operations
  sessions: {
    create: async (sessionData) => {
      const session = {
        id: nanoid(),
        ...sessionData,
      };
      sessions.set(session.id, session);
      return session;
    },

    findById: async (id) => {
      const session = sessions.get(id);
      if (!session || session.expiresAt < new Date()) {
        sessions.delete(id);
        return null;
      }
      return session;
    },

    delete: async (id) => {
      return sessions.delete(id);
    },

    cleanup: async () => {
      const now = new Date();
      for (const [id, session] of sessions.entries()) {
        if (session.expiresAt < now) {
          sessions.delete(id);
        }
      }
    },
  },
};

// Cleanup expired sessions every hour
setInterval(() => {
  db.sessions.cleanup();
}, 60 * 60 * 1000);
