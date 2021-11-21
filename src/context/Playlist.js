import { createContext, useState } from "react"


export const PlaylistContext= createContext();

const Playlist = (props) => {
    
    const [playlistType, setPlaylistType] = useState("featured")
    return (
        <PlaylistContext.Provider value={{playlistType, setPlaylistType}} >
            {props.children}
        </PlaylistContext.Provider>
    )
}

export default Playlist
