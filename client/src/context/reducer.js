export const actionType = {
    SET_USER: "SET_USER",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_SONG: "SET_SONG",
    SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
    SET_MINI_PLAYER: "SET_MINI_PLAYER",
    SET_SONG_INDEX: "SET_SONG_INDEX"
} 


export const reducer =(state, action)=>{
    switch(action.type){
        case actionType.SET_USER:
            return {...state, user: action.user };
        
        case actionType.SET_ALL_SONGS:
            return {...state, allSongs: action.allSongs};

        case actionType.SET_ALL_ALBUMNS:
            return {...state, allAlbums: action.allAlbums};

        case actionType.SET_ALL_USERS:
            return {...state, allUsers: action.allUsers}
        
        case actionType.SET_ALL_ARTISTS:
            return {...state, allArtists: action.allArtists };

        case actionType.SET_IS_SONG_PLAYING:
            return {...state, isSongPlaying: action.isSongPlaying};

        case actionType.SET_SONG_INDEX:
            return {...state, songIndex: action.songIndex};
            
        default:
            return state;
    }
}