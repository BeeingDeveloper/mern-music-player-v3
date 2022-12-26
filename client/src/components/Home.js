import React, { useContext, useEffect, useState } from 'react'
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import SongComponent from './SongComponent';
import './style.css'
import {BsPlusSquareFill} from 'react-icons/bs'
import { createNewPlaylist, fetchAllPlaylist, fetchAllSongs } from '../api/api';
import {HiHome} from 'react-icons/hi'
import { motion } from 'framer-motion';

const PlaylistSongItem =({songItem})=>{


  return(
    <>
      {
        songItem.map((elm, i)=>{
          return (
            <>
              <div className='py-2 w-full overflow-x-hidden' key={i}>
                {elm.name.length >20?`${elm.name.slice(0, 24)} . . .` : `${elm.name}`}
              </div>
            </>
          )
        })
      }
    </>
  )
}




const Home = () => {
  
  const {state, dispatch} = useContext(StateContext);
  const {allSongs, user, playList} = state;

  useEffect(() => {
    fetchAllSongs().then((res)=>{
      dispatch({type: actionType.SET_ALL_SONGS, allSongs: res.data});
    });

    fetchAllPlaylist().then((res)=>{
      dispatch({type: actionType.SET_ALL_PLAYLIST, playList: res.data});
    });

  }, []);
  
  let id = user?.user._id;
  const [playlistName, setPlaylistName] = useState("");
  const [activePlaylist, setActivePlaylist] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  const setPlaylist = (elm)=>{
      setActivePlaylist(true);
      setCurrentPlaylist(elm);
      console.log(elm)
  }

  const createPlaylist =(playlistName, id)=>{
    let data = {
      name: playlistName,
      userId: id
    }
    createNewPlaylist(data).then((res)=>{
      fetchAllPlaylist().then((res)=>{
        dispatch({type: actionType.SET_ALL_PLAYLIST, playList: res.data});
      });
    });
  }


  return (
    <div className='w-full home flex ' >
        <div className='h-[100%] w-[20%] bg-slate-800'>

{/* ---------------------------------------- LEFT SECTION --------------------------------------- */}
          <div className='h-auto w-[90%] m-auto rounded-md flex flex-col gap-2 ' >
            <div className='flex'>
              <input className='h-10 my-auto rounded-md outline-none w-full bg-slate-600 p-2 ' placeholder='Create Playlist' value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)}  />
              <div className='text-[2.1rem] my-auto p-2 ml-5'>
                <BsPlusSquareFill onClick={()=>createPlaylist(playlistName, id)} />
              </div>
            </div>
            <button className='flex gap-5 text-red-500 bg-slate-900 p-2  mb-2 rounded-lg px-4 border-2 border-red-500 ' onClick={()=>setActivePlaylist(false)} >
              <HiHome className='text-2xl' />
              <h2 className='my-auto text-xl'>Home</h2>
            </button>
          </div>


          <div className='flex flex-col h-auto m-auto rounded-md bg-slate-900 w-[90%] text-left'>
            <>
            {
              playList?.map((elm, i)=>{
                return (
                  <>
                    <motion.h2 whileHover={{scale: 1.05}} key={i} className='pl-4 py-2 h-auto text-red-500' onClick={()=>setPlaylist(elm)} >{elm.name}</motion.h2>
                    <hr />
                    {/* <div className='h-auto overflow-hidden pl-4'>{<PlaylistSongItem songItem={elm.songItem} />}</div> */}
                  </>
                )
              })
            }
            </>
          </div>
        </div>





{/* ---------------------------------------- RIGHT SECTION --------------------------------------- */}
        <div className='h-full w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {
            activePlaylist ? (
              <>
              {
                currentPlaylist?.songItem?.map((elm)=>{
                  return(
                    <h2>{elm.name}</h2>
                  )
                })
              }
              </>
            ) : (
              <>
                {
                  allSongs?.map((elm, index)=>{
                    return <SongComponent name={elm.name} imageURL={elm.imageURL} artist={elm.artist} key={index} index={index} songItem={elm._id} />
                  })
                }
              </>
            )

          }
        </div>
    </div>
  )
}

export default Home;