import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Fetch full video details
const fetchVideoDetails = async (videoId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet",
        id: videoId,
        key: API_KEY,
      },
    });
    const video = response.data.items[0];
    return {
      id: video.id,
      thumbnail: video.snippet.thumbnails.medium.url,
      title: video.snippet.title,
      description: video.snippet.description,
    };
  } catch (error) {
    console.error("Error fetching video details from YouTube API:", error);
    throw error;
  }
};

// Fetch videos from a channel
export const fetchVideosFromChannel = async (
  channelId: string,
  maxResults: number = 5
) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        channelId,
        maxResults,
        type: "video",
        key: API_KEY,
      },
    });

    const videoDetails = await Promise.all(
      response.data.items.map((item: any) => fetchVideoDetails(item.id.videoId))
    );

    console.log("Fetched videos from YouTube API");
    return videoDetails;
  } catch (error) {
    console.error("Error fetching videos from YouTube API:", error);
    throw error;
  }
};

// Fetch videos from a search query
export const fetchVideosFromQuery = async (query: string, maxResults: number = 5) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        maxResults,
        type: "video",
        key: API_KEY,
      },
    });
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error(`No videos found for query: ${query}`);
    }
    const videoDetails = await Promise.all(
      response.data.items.map((item: any) => fetchVideoDetails(item.id.videoId))
    );
    console.log("Fetched videos from YouTube API");
    return videoDetails
  } catch (error) {
    console.error("Error fetching videos from YouTube API:", error);
    throw error;
  }
};
