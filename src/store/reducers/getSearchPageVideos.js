import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseData } from "../../utils/parseData";


const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(

    "youtube/App/searchPageVideos",
    async (isNext, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFormState, videos,searchTerm },
        } = getState();

        const response = await axios.get(
         `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&maxResults=20${isNext ? `&pageToken=${nextPageTokenFormState}` : ''}`
)


        const items = response.data.items;
        console.log(items);

        const parsedData = await parseData(items)
        return { parsedData: [...videos, ...parsedData], nextPageToken: nextPageTokenFormState }
    }
);
