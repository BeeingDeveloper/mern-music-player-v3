import React, { useContext, useEffect } from 'react'
import { fetchAllSongs } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'

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
    <div className='m-2' >
      {
        allSongs?.map((elm)=>{
          return (
            <h2>{elm.name}</h2>
          )
        })
      }      
    </div>
  )
}

export default Home