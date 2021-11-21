import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
const ABOUT_ENDPOINT = "https://api.spotify.com/v1/me";
export const UserContext= createContext();

const User = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [user, setuser] = useState({})
    const history= useHistory();
    useEffect(async() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
       
           await axios
              .get(ABOUT_ENDPOINT, {
                headers: {
                  Authorization: "Bearer " + token,
                }
              })
              .then((response) => {
                console.log(response.data);
                setuser(response.data)
                setLoggedIn(true);
              })
              .catch((error) => {
                console.log(error.response);
                // history.push("/")
              });
            
    }, [token])
    console.log(loggedIn);
    return (
        <UserContext.Provider value={{loggedIn,setLoggedIn, user}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default User
