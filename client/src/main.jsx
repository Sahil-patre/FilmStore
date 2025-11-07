import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './views/Home'
import { BrowserRouter,Route,Routes } from 'react-router'
import MovieDetails from './views/MovieDetails'
import NotFound from './views/NotFound'



createRoot(document.getElementById('root')).render
(

  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/movies/:id' element={<MovieDetails/>} />
  <Route path='*' element={<NotFound/>} />
  </Routes>
  </BrowserRouter>

)
