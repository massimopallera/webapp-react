import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const GlobalContext = createContext()


function GlobalContextProvider({ children }) {


    const [movies, setMovies] = useState([])

    useEffect(() => {

        //fetch data from API
        fetch('http://localhost:3000')
        .then(resp => resp.json())
        .then(data => setMovies(data.results))

    }, [])

    
    const values = {
        movies, 
        getImg : 'https://via.placeholder.com/600/92c952'

    };    

    return(
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )
}  


function useGlobalContext() {
    return useContext(GlobalContext);
}
  
  
export { GlobalContextProvider, useGlobalContext };