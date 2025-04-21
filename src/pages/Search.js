import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import SideBar from '../Components/SideBar'
import { useAppDispatch ,useAppSelector} from '../hooks/useApp'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import Spinner from '../Components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../Components/Card'
import { useNavigate } from 'react-router-dom'
import SearchCard from '../Components/SearchCard'




const Home = () => {
    const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const videos=useAppSelector((state)=>state.youtubeApp.videos)
 const searchTerm=useAppDispatch((state)=>state.youtubeApp.searchTerm)

useEffect(()=>{
  dispatch(getHomePageVideos(false))
  console.log(videos);
  

},[dispatch])
  return (
    <div className='py-9 pl-8 flex flex-col gap-5 w-full'>
    <div style={{ height:"7.5vh"}}>
    <Navbar/>
    </div>
   <div  className="flex"style={{height:"92.5vh"}}>
   <SideBar/>
   {videos.length ? (
    <div>
    <InfiniteScroll dataLength={videos.length} next={()=>getHomePageVideos(true)} hasMore={videos.length>500}
    loader={<Spinner/>} height={650}>

      {videos.map((item)=>{
        return (    <div className='my-5
    '>
          <SearchCard data={item} key={item.videoId}/>
          </div>)
      })}
   


    </InfiniteScroll>
    </div>
        
        
           
       
      ) : (
        <Spinner/>
      )}
   
  
   </div>
   </div>
  )
}

export default Home
