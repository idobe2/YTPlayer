import axios from "axios";

const API_KEY = "AIzaSyBd7B-riFJLEy1zAJAWsy1LMyMaA4E3OL8";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

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
    console.log("Fetched videos from YouTube API");
    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
    }));
  } catch (error) {
    console.error("Error fetching videos from YouTube API:", error);
    throw error;
  }
};

export const fetchVideosFromQuery = async (
  query: string,
  maxResults: number = 5
) => {
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
    console.log("Fetched videos from YouTube API");
    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
    }));
  } catch (error) {
    console.error("Error fetching videos from YouTube API:", error);
    throw error;
  }
};
