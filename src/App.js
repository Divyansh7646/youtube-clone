import React from "react"
import Home from "./pages/Home"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { GrResources } from "react-icons/gr"
import Watch from "./pages/Watch"
import Search from "./pages/Search"
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/search" element={<Search/>}></Route>
    <Route path="/watch/:id" element={<Watch />} />
   </Routes>

   </BrowserRouter>
  
   
  )
}