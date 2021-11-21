import { useEffect,useContext } from "react"
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";

const CLIENT_ID = "44be0cfc875548ba8ef9f1f47a2217f2"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
// const REDIRECT_URL_AFTER_LOGIN = 'https://spotify-1301.netlify.app/callback';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/callback';
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};


const Signup = () => {
  const {loggedIn} = useContext(UserContext);
  const history = useHistory();
  console.log(loggedIn);
  if(loggedIn){
    history.push("/callback");
  }
  const handleSignIn=()=>{
   
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
      
    
  }
  
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
        <div className="w-screen h-screen bg-black flex flex-col gap-3 justify-center items-center">
          <div className="md:hidden"  >
            <img src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png" alt="logo"/>
          </div>
          <div className="w-2/3 md:w-1/2 h-1/3 md:h-1/2 bg-white rounded-xl flex flex-col justify-center items-center" >
            <img className="hidden md:block w-full" src="https://qph.fs.quoracdn.net/main-qimg-6831e2300170030d78de4a1254eaaccf" alt=""/>
            {/* <a href="http://localhost:8888/login" className="bg-green-400 p-4 text-white no-underline" >Login using spotify</a> */}
            <button onClick={handleSignIn} className="bg-green-400 p-4 text-white no-underline" >Login using spotify</button>

          </div>
           
        </div>
    )
}

export default Signup
