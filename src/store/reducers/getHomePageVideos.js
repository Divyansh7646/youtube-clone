import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const corsProxy = (url) => `http://localhost:8080/proxy/${encodeURIComponent(url)}`;

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/homePageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFormState, videos },
    } = getState();

    const baseURL = `https://www.googleapis.com/youtube/v3/search?maxResults=20&q=Will%20Tennyson&key=${API_KEY}&part=snippet&type=video`;
    const requestUrl = isNext
      ? `${baseURL}&pageToken=${nextPageTokenFormState}`
      : baseURL;

    const response = await axios.get(corsProxy(requestUrl));
    const items = response.data.items;

    const parsedData = await parseData(items);
    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken: response.data.nextPageToken,
    };
  }
);
