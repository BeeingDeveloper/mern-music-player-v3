import React, { useContext } from 'react'
import { fetchAllArtists } from '../api/api';
import CardElement from '../components/CardElement';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'



const DashboardArtist = () => {

  const {state, dispatch} = useContext(StateContext);
  const {allArtists} = state;
  
  fetchAllArtists().then((res)=>{
    dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: res.data});
  })

  return (
    <div className=' w-[90%] m-auto grid grid-cols-3 lg:grid-cols-5'>
      {
        allArtists?.map((elm)=>{
          return(
            <CardElement name={elm.name} imageURL={elm.imageURL} id={elm._id} type={"artist"} />
          )
        })
      }
    </div>
  )
}

export default DashboardArtist