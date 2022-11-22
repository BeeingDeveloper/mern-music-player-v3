import React, { useReducer } from 'react'
import { createContext } from 'react'
import {reducer} from './reducer'


export const StateContext = createContext();
const StateProvider = (props) => {


    const initialState = {
        user: null,
        allUsers: null,
        allSongs: null,
        allAlbums: null,
        allArtists: null,
        languages: [
              {name: "Bengali"}, 
              {name: "Hindi"}, 
              {name: "English"}, 
              {name: "Spanish"}, 
              {name: "Others"}
        ],
        searchTerm: "",
        category: [
              {name: "Rock"},
              {name: "Hip Hop"}, 
              {name: "Pop"}, 
              {name: "Jazz"}, 
              {name: "Classical"}, 
              {name: "Electronics"}, 
              {name: "Metal"}
        ],
        artists: null,
        artistFilter: null,
        albumFilter: null,
        songIndex: 0,
        isSongPlaying: false,
        miniPlayer: false,
    }


    const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{state, dispatch}}>
        {props.children}
    </StateContext.Provider>
  )
}

export default StateProvider