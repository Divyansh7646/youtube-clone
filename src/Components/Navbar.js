import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsYoutube, BsBell } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa6';
import { RiVideoAddLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useApp';
import { clearVidoes, changeSearchTerm } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== '/search') {
      navigate("/search");
    } else {
      dispatch(clearVidoes());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className='flex justify-between items-center sticky top-0 z-50 bg-[#212121] opacity-95 px-14 h-14'>
      <div className='flex gap-8 items-center text-2xl'>
        <GiHamburgerMenu />
        <div className='flex gap-2 items-center'>
          <BsYoutube className='text-3xl text-red-600' />
          <span className='text-2xl'>YouTube</span>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}>
          <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl'>
            <input
              type='text'
              placeholder='Search'
              className='w-96 bg-zinc-900 focus:outline-none text-white'
              value={searchTerm}
              onChange={e => dispatch(changeSearchTerm(e.target.value))}
            />
            <button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl'>
              <AiOutlineSearch className='text-xl' />
            </button>
          </div>
        </form>
        <FaMicrophone className='text-xl bg-zinc-900 rounded-full p-2 h-10 w-10' />
      </div>

      <div className='flex gap-8 items-center text-xl'>
        <RiVideoAddLine />
        <div className='relative'>
          <BsBell />
          <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded px-1'>9+</span>
        </div>
        <img
          src='https://deadline.com/wp-content/uploads/2024/11/GettyImages-1160283736.jpg'
          alt='profile'
          className='h-9 w-9 rounded-full'
        />
      </div>
    </div>
  );
}
