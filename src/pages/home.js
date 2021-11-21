import { useEffect } from "react";
import Navbar from "../component/Navbar";
import UserPlaylist from "../component/playlists/UserPlaylist";
import Playlist, { PlaylistContext } from "../context/Playlist";
import User from "../context/User";


const Home = () => {
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
          const [key, value] = currentValue.split("=");
          accumulater[key] = value;
          return accumulater;
        }, {});
      
        return paramsSplitUp;
      };

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
        }
      },[]);  
      
      
    return (
        <div className="bg-black w-full h-full min-h-screen">
          <User>
            <Playlist>
            <Navbar/>
            <UserPlaylist/>

            </Playlist>
          </User>
        </div>
    )
}

export default Home
