import React, { useContext, useEffect } from 'react'
import { fetchAllSongs } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import SongComponent from './SongComponent';
import './style.css'
const Home = () => {

  
  const {state, dispatch} = useContext(StateContext);
  const {allSongs} = state;

  useEffect(() => {
    fetchAllSongs().then((res)=>{
      dispatch({type: actionType.SET_ALL_SONGS, allSongs: res.data});
    })
  }, []);

  console.log(allSongs);
  return (
    <div className='w-full home flex ' >
        <div className='h-[100%] w-[20%] bg-green-700'>
        </div>
        <div className='h-full w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {
            allSongs?.map((elm)=>{
              return <SongComponent name={elm.name} imageURL={elm.imageURL} artist={elm.artist} />
            })
          }
        </div>
    </div>
  )
}

export default Home