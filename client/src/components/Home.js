import React, { useContext, useEffect, useState } from 'react'
import { createNewPlaylist, fetchAllSongs, fetchAllPlaylist } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import SongComponent from './SongComponent';
import './style.css'
import {BsPlusSquareFill} from 'react-icons/bs'

const Home = () => {

  
  const {state, dispatch} = useContext(StateContext);
  const {allSongs, user, playList} = state;
  let id = user?.user._id;

  useEffect(() => {
    fetchAllSongs().then((res)=>{
      dispatch({type: actionType.SET_ALL_SONGS, allSongs: res.data});
    });

    fetchAllPlaylist().then((res)=>{
      dispatch({type: actionType.SET_NEW_PLAYLIST, playList: res.data});
    });

  }, []);
  
  const [playlistName, setPlaylistName] = useState("");
  const createPlaylist = (playlistName, id)=>{
    let playlistData = {
      name: playlistName,
      userId: id
    }

    createNewPlaylist(playlistData).then((res)=>{
      fetchAllPlaylist().then((res)=>{
        dispatch({type: actionType.SET_NEW_PLAYLIST, playList: res.data});
      });
    });
  }



  return (
    <div className='w-full home flex ' >
        <div className='h-[100%] w-[20%] bg-slate-800'>
          <div className='h-14 w-[90%] m-auto rounded-md flex' >
            <input className='h-10 my-auto rounded-md outline-none w-full bg-slate-600 p-2 ' placeholder='Create Playlist' value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)}  />
            <div className='text-[2.1rem] my-auto p-2 ml-5'>
              <BsPlusSquareFill onClick={()=>createPlaylist(playlistName, id)} />
            </div>
          </div>

          <div className='flex flex-col h-auto m-auto rounded-md bg-slate-600 w-[90%]'>
            {
              playList? (<></>
                // playList.map((elm)=>{
                //   return (
                //     <>
                //       <h2>{elm.name}</h2>
                //       <div className='h-10 w-full'>
                //         {elm.listItem.map((song)=>{
                //           return <h2>{song.name}</h2>
                //         })}
                //       </div>
                //     </>
                //   )
                // })
              ):(
                <>
                <h2>NULL</h2>
                </>
              ) 
            }
          </div>
        </div>

        <div className='h-full w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {
            allSongs?.map((elm, index)=>{
              return <SongComponent name={elm.name} imageURL={elm.imageURL} artist={elm.artist} key={index} index={index} songItem={elm} />
            })
          }
        </div>
    </div>
  )
}

export default Home