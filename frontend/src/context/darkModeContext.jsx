// it can be used again and again in various components of the app
import { createContext,useEffect,useState } from "react";

export const DarkModeContext= createContext()

// localStorage.getItem("darkMode") here initial value of item (darkMode) present in localStorage is stored in darkMode variable
// ||false this is used when user visit the site for first time
export const DarkModeContextProvider=({children})=>{
    const [darkMode,setDarkMode]=useState(JSON.parse(localStorage.getItem("darkMode"))||false);

function toggle(){
    setDarkMode(!darkMode);
}

useEffect(()=>{
    localStorage.setItem("darkMode",darkMode)
},[darkMode])

return (
    <DarkModeContext.Provider value={{darkMode,toggle}}>{children}</DarkModeContext.Provider>
)

};