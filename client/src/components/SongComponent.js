import React, { useContext, useState } from 'react'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import {motion} from 'framer-motion'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { addSongItemToPlaylist } from '../api/api'



const PlaylistName = ({name, songItem, playlistId, userId})=>{

  const [playlistID, setPlaylistID] = useState('');

  const addToPlaylist = (playlistId)=>{
    setPlaylistID(playlistId);

    let songData = {
      playlistId: playlistID,
      userId: userId,
      ...songItem
    }
    if(playlistID.length !==0){
      addSongItemToPlaylist(songData).then((res)=>{});
      console.log(songData)
    }
  }

  return(
    <div className=' hover:bg-slate-600' onClick={()=>addToPlaylist(playlistId)}>
      <h2>{name}</h2>
    </div>
  )
}


const SongComponent = ({name, imageURL, artist, index, songItem}) => {
  const {state, dispatch} = useContext(StateContext);
  const {songIndex, isSongPlaying, playList} = state;
  let userId = state?.user?.user._id;

  const handleToPlayer = () =>{
    if(!isSongPlaying){
      dispatch({type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true});
    }
    if(songIndex !== index){
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: index});
    }
  }
  const [activeMenu, setActiveMenu] = useState(false);
  const [playlistId, setPlaylistId] = useState('');

  const handleMenu = (e)=>{
    e.preventDefault();
    activeMenu? setActiveMenu(false) : setActiveMenu(true)
  }
  


  return (
    <div  className='h-56 w-48 m-4 rounded-lg bg-slate-800 relative' 
          onClick={handleToPlayer}
          onContextMenu={(e)=>handleMenu(e)} 
          onBlur={(e)=>setActiveMenu(false)}
          >


        <div className='h-[80%] w-full rounded-md p-1'>
            <img src={imageURL} className=' h-full w-full rounded-md' />
        </div>


{/* -----------------------PLAY LIST ---------------------------- */}
        <div className={`absolute ${activeMenu? "h-28": "h-0"} transition-all ease-in duration-200 w-full overflow-hidden bg-red-500 rounded-md`} >
          <h2 className='bg-slate-500'>Add To Playlist</h2>
          {playList.map((elm)=>{
            return(
              <div  key={elm._id} >
                <PlaylistName name={elm.name} playlistId = {elm._id} songItem={songItem} userId={userId}  />
              </div>
            )
          })}
        </div>
{/* -----------------------PLAY LIST ---------------------------- */}



        <h2>{`${name.length > 23 ? name.slice(0, 23)+"..." : name} `}</h2>
        <h2 className='text-sm text-slate-400'>{artist}</h2>
        <motion.div whileHover={{scale: 1.1}} className='relative h-fit w-fit border-2 border-black bottom-[6rem] bg-black rounded-full left-[73%]'>
            <BsFillPlayCircleFill className=' h-10 w-10 text-red-500  rounded-full' />
        </motion.div>

    </div>
  )
}

export default SongComponent