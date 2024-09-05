import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./partials/Trending";
import Popular from "./partials/Popular";
import Movie from "./partials/Movie";
import Tvshows from "./partials/Tvshows";
import People from "./partials/People";
import MovieDetails from "./partials/MovieDetails";
import TvDetails from "./partials/TvDetails";
import PersonDetails from "./partials/PersonDetails";
import Trailer from "./partials/Trailer";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        {/* chlid route  */}
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails />} />
      </Routes>
    </div>
  );
};

export default App;
