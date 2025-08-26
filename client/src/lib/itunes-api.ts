import { iTunesSearchResponse } from '@/types/music';

const ITUNES_BASE_URL = 'https://itunes.apple.com/search';

export async function searchMusic(query: string, limit: number = 20): Promise<iTunesSearchResponse> {
  if (!query.trim()) {
    return { resultCount: 0, results: [] };
  }

  try {
    const params = new URLSearchParams({
      term: query,
      media: 'music',
      entity: 'song',
      limit: limit.toString(),
      explicit: 'Yes',
    });

    const response = await fetch(`${ITUNES_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.status} ${response.statusText}`);
    }

    const data: iTunesSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching iTunes:', error);
    throw new Error('Failed to search for music. Please check your connection and try again.');
  }
}
