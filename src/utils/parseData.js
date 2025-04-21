import axios from 'axios';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawToString } from './convertRawToStrings';
import { timeSince } from './timesince';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const corsProxy = (url) => `http://localhost:8080/proxy/${encodeURIComponent(url)}`;

export const parseData = async (items) => {
    console.log(items);
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach((item) => {
            if (item.id.videoId) videoIds.push(item.id.videoId);
            if (item.snippet.channelId) channelIds.push(item.snippet.channelId);
        });

        // Fetch channel data
        const {
            data: { items: channelsData },
        } = await axios.get(corsProxy(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
        ));

        const parsedChannelData = channelsData.map((channel) => ({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url,
        }));

        // Fetch video data
        const {
            data: { items: videosData },
        } = await axios.get(corsProxy(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
        ));

        const parsedData = [];

        items.forEach((item) => {
            const videoId = item.id.videoId;
            const videoDetails = videosData.find(video => video.id === videoId);
            const channelDetails = parsedChannelData.find(channel => channel.id === item.snippet.channelId);

            if (videoDetails && channelDetails) {
                parsedData.push({
                    videoId: videoId,
                    videoTitle: item.snippet.title,
                    videoSnippet: item.snippet.description,
                    videoThumbnail: item.snippet.thumbnails.medium.url,
                    videoLink: `https://www.youtube.com/watch?v=${videoId}`,
                    videoDuration: parseVideoDuration(videoDetails.contentDetails.duration),
                    videoViews: convertRawToString(videoDetails.statistics.viewCount),
                    videoAge: timeSince(new Date(item.snippet.publishedAt)),
                    channelInfo: {
                        id: item.snippet.channelId,
                        image: channelDetails.image,
                        name: item.snippet.channelTitle,
                    }
                });
            }
        });

        return parsedData;
    } catch (err) {
        console.error("Error parsing data:", err);
        return [];
    }
};
