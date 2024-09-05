import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Notfound from "./Notfound";
const Trailer = () => {
  const navigate = useNavigate();

  // how to differenciate tv or movies
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytMovies = useSelector((state) => state[category].info.videos);
  console.log(pathname.includes("movie"), ytMovies);
  return (
    <div className="bg-[rgba(0,0,0,0.9)] z-[100] absolute w-screen h-screen top-0 left-0  flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute right-[3%] top-[8%] text-3xl font-semibold hover:text-[#6556CD] ri-close-line text-white"
      ></Link>
      {ytMovies ? (
        <ReactPlayer
          height={650}
          width={1250}
          url={`https://www.youtube.com/watch?v=${ytMovies.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
