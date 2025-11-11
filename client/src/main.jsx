import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./views/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import MovieDetails from "./views/MovieDetails";
import EditMovie from "./views/EditMovie";
import NewMovie from "./views/NewMovie";
import NotFound from "./views/NotFound";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/new" element={<NewMovie />} />
      <Route path="/movies/edit/:id" element={<EditMovie />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
