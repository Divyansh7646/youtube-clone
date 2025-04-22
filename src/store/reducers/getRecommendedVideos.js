import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const corsProxy = (url) => `https://cors-proxy-dgw5.onrender.com/proxy/${encodeURIComponent(url)}`;

export const getRecommendedVideos = createAsyncThunk(
  "youtube/App/getRecommendedVideos",
  async (videoId, { getState }) => {
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();

    const requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&maxResults=20&type=video`;
    
    const response = await axios.get(corsProxy(requestUrl));
    const items = response.data.items;
    
    const parsedData = await parseRecommendedData(items);
    return { parsedData };
  }
);
