// it can be used again and again in various components of the app
import { createContext,useEffect,useState } from "react";
import axios from "axios";
export const AuthContext= createContext();

// localStorage.getItem("user") here initial value of item (user) present in localStorage is stored in currentUser variable
// ||null this is used when user is not present on site
export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null);

async function  login(inputs){
    // code here
    const res=await axios.post("http://localhost:8800/api/auth/login",inputs,{
        withCredentials:true,//it is used as we are using cookie for security purpose
    });

    setCurrentUser(res.data);
}

useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentUser))
},[currentUser]);

return (
    <AuthContext.Provider value={{currentUser,login}}>
    {children}
    </AuthContext.Provider>
)

};