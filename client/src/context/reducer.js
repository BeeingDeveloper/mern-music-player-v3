export const actionType = {
    SET_USER: "SET_USER",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_ARTISTS: "SET_ARTISTS",
    SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_SONG: "SET_SONG",
    SET_SONG_PLAYING: "SET_SONG_PLAYING",
    SET_MINI_PLAYER: "SET_MINI_PLAYER",
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
        
        default:
            return state;
    }
}