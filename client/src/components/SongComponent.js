import React, { useContext } from 'react'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import {motion} from 'framer-motion'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const SongComponent = ({name, imageURL, artist, index}) => {

  const {state, dispatch} = useContext(StateContext);
  const {songIndex, isSongPlaying} = state;

  const handleToPlayer = () =>{
    if(!isSongPlaying){
      dispatch({type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true});
    }
    if(songIndex !== index){
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: index});
    }
  }
  

  return (
    <div className='h-56 w-48 m-4 rounded-lg bg-slate-800' onClick={handleToPlayer}>
        <div className='h-[80%] w-full rounded-md p-1'>
            <img src={imageURL} className=' h-full w-full rounded-md' />
        </div>
        <h2>{`${name.length > 23 ? name.slice(0, 23)+"..." : name} `}</h2>
        <h2 className='text-sm text-slate-400'>{artist}</h2>
        <motion.div whileHover={{scale: 1.1}} className='relative h-fit w-fit border-2 border-black bottom-[6rem] bg-black rounded-full left-[73%]'>
            <BsFillPlayCircleFill className=' h-10 w-10 text-red-500  rounded-full' />
        </motion.div>
    </div>
  )
}

export default SongComponent