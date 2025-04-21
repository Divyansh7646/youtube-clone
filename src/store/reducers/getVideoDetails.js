import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawToString } from "../../utils/convertRawToStrings";
import { timeSince } from "../../utils/timesince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "youtube/App/getVideoDetails",
  async (id) => {
    const {
      data: { items },
    } = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    const parsedData = await parseData(items[0]); // Fetching parsed data
    console.log(parsedData);
    return parsedData; // Returning the parsed data
  }
);

const parseData = async (item) => {
  const channelResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  const snippet = item.snippet;
  const id = item.id;
  const statistics = item.statistics;
  const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
  const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

  return {
    videoId: id,
    videoTitle: snippet.title,
    videoThumbnail: snippet.thumbnails.medium.url,
    videoSnippet: snippet.description,
    videoLikes: convertRawToString(statistics.likeCount),
    videoViews: convertRawToString(statistics.viewCount),
    videoAge: timeSince(new Date(snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
    },
  };
};
