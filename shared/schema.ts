import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

// Song schema
export const songSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  duration: z.number(),
  url: z.string(),
  coverImage: z.string().optional(),
  userId: z.string(),
  createdAt: z.date(),
});

export type Song = z.infer<typeof songSchema>;

// Playlist schema
export const playlistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  isPublic: z.boolean().default(true),
  createdAt: z.date(),
});

export type Playlist = z.infer<typeof playlistSchema>;

// PlaylistSong schema (junction table)
export const playlistSongSchema = z.object({
  id: z.string(),
  playlistId: z.string(),
  songId: z.string(),
  addedAt: z.date(),
});

export type PlaylistSong = z.infer<typeof playlistSongSchema>;

// Like schema
export const likeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  songId: z.string(),
  createdAt: z.date(),
});

export type Like = z.infer<typeof likeSchema>;

// Comment schema
export const commentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  songId: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export type Comment = z.infer<typeof commentSchema>;

// Follow schema
export const followSchema = z.object({
  id: z.string(),
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.date(),
});

export type Follow = z.infer<typeof followSchema>;

// Notification schema
export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["like", "comment", "follow", "playlist_add"]),
  message: z.string(),
  isRead: z.boolean().default(false),
  relatedId: z.string().optional(), // songId, commentId, etc.
  createdAt: z.date(),
});

export type Notification = z.infer<typeof notificationSchema>;

// Session schema
export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
});

export type Session = z.infer<typeof sessionSchema>;

// Export all schemas for validation
export const schemas = {
  user: userSchema,
  song: songSchema,
  playlist: playlistSchema,
  playlistSong: playlistSongSchema,
  like: likeSchema,
  comment: commentSchema,
  follow: followSchema,
  notification: notificationSchema,
  session: sessionSchema,
};
