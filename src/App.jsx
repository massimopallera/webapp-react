import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import FilmDetails from "./pages/FilmDetails"
import {GlobalContextProvider} from "./contexts/GlobalContext"


import './App.css'
function App() {
  
  
  
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />}></Route>
            <Route path='/:id' element={<FilmDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
