import React, { useContext } from 'react'
import { StateContext } from '../context/StateProvider'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { actionType } from '../context/reducer';


const PlayerBar = () => {
  
  const {state, dispatch} = useContext(StateContext);
  let {isSongPlaying, allSongs, songIndex} = state;

  let songObj = allSongs?.[songIndex];

  const onPlayNext = ()=>{
    if(songIndex > allSongs.length){
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: 0});
    }else{
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: songIndex+1})
    }
  }

  const onPlayPrevious =()=>{
    if(songIndex === 0){
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: 0});
    }else{
      dispatch({type: actionType.SET_SONG_INDEX, songIndex: songIndex - 1})
    }
  }

  return (
    <div className={`${isSongPlaying?"h-24":"h-0"} transition-all ease-in-out duration-200 w-screen bg-slate-800 text-slate-300 
    fixed bottom-0 z-50 items-center justify-center overflow-hidden`}>
        <div className='flex  items-center w-[98%] m-auto h-full '>
          <div className='flex gap-5 w-[20%]'>
            <img src={songObj?.imageURL} className='h-20 w-20 rounded-md' />  
            <div className=' text-left' >
              <h2>{songObj?.name.length>20?songObj?.name.slice(0, 20):songObj?.name}</h2>
              <h2>{songObj?.artist} ({songObj?.category})</h2>
            </div>           
          </div>

          <div className='w-full outline-none rounded-lg'>
            <AudioPlayer 
              src={songObj?.songURL}  
              autoPlay={true}
              showSkipControls={true}
              onClickNext={onPlayNext}
              onClickPrevious={onPlayPrevious}
               /> 
          </div>
        </div>
    </div>
  )
}

export default PlayerBar