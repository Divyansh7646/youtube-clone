import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../../store/reducers/getRecommendedVideos";
const initialState={
    videos:[],
    currentPlaying:null,
    searchTerm:"",
    searchResults:[],
    nextPageToken:null,
    recommendedVideo:[],


}
const youtubeSlice=createSlice({
    name:"YoutubeApp",
    initialState,
    reducers:{
        clearVidoes:(state)=>{
            state.videos=[];
            state.nextPageToken=null;

        },
        changeSearchTerm:(state,action)=>{
            state.searchTerm=action.payload;
        },
        clearSearchTerm:(state)=>{
            state.searchTerm="";
        },


    },
    extraReducers:(builder)=>{
        builder.addCase(getHomePageVideos.fulfilled,(state,action)=>{
            if(action.payload && action.payload.parsedData){
                state.videos=action.payload.parsedData
                state.nextPageToken=action.payload.nextPageToken
            }

        })
        builder.addCase(getSearchPageVideos.fulfilled,(state,action)=>{
            if(action.payload && action.payload.parsedData){
                state.videos=action.payload.parsedData
                state.nextPageToken=action.payload.nextPageToken
            }

        })
        builder.addCase(getRecommendedVideos.fulfilled,(state,action)=>{
            if(action.payload && action.payload.parsedData){
                state.recommendedVideo=action.payload
            }

        })
        builder.addCase(getVideoDetails.fulfilled,(state,action)=>{
            if(action.payload && action.payload){
                state.currentPlaying=action.payload
            }

        })
    },
   
       
    
})
export const {clearVidoes ,clearSearchTerm,changeSearchTerm}=youtubeSlice.actions
export default youtubeSlice.reducer;