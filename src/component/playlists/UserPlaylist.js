import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Playlist_Card from "../Playlist_Card";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/User";
import { PlaylistContext } from "../../context/Playlist";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const FEAUTURED_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists";


const UserPlaylist = () => {
    const history= useHistory();
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [data, setData] = useState({});
    const {setLoggedIn} = useContext(UserContext)
  const [myPlaylist, setmyPlaylist] = useState({})
  const [feauturedPlaylist, setfeauturedPlaylist] = useState({})
  const {playlistType, setPlaylistType} = useContext(PlaylistContext);
  
    useEffect(() => {
       axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setmyPlaylist(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        setLoggedIn(false);

        history.push("/");
    });
     axios
    .get(FEAUTURED_PLAYLISTS_ENDPOINT, {
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    .then((response) => {
      setData(response.data.playlists) // default
        
        setfeauturedPlaylist(response.data.playlists);
    })
    .catch((error) => {
        console.log(error.response);
        setLoggedIn(false);
        history.push("/");
      });
    }, [token]);


    useEffect(() => {
      console.log(playlistType);
      if(playlistType==="featured"){
        setData(feauturedPlaylist);
      }
      else{
        setData(myPlaylist);
      }
    }, [playlistType])

    
    return (
        <>
       
        <div className="flex justify-center align center h-max flex-wrap gap-5">
        {data.items ? data.items.map((item) => 

                <Playlist_Card className="text-white" name={item.name} image={item.images[0].url} description={item.description} link={item.external_urls.spotify}/>) 
                
                : null}
        </div>
        </>
    )
}

export default UserPlaylist
