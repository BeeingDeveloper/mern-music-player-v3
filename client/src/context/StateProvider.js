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
        languageFilter: null,
        searchTerm: "",
        filterTerm:"all",
        artists: null,
        artistFilter: null,
        albumFilter: null,
        song: 0,
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