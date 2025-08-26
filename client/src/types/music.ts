export interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackTimeMillis: number;
  primaryGenreName: string;
  releaseDate: string;
  country: string;
  currency: string;
  trackPrice: number;
}

export interface iTunesSearchResponse {
  resultCount: number;
  results: Track[];
}

export interface FavoriteTrack extends Track {
  addedAt: string;
}
