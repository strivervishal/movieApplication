import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  // console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path || data.profile_path
        })`,
        // backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundPosition: "top 10%",
        objectFit: "cover",
        imageOrientation: "vertical center",
      }}
      className="w-full h-[50vh] flex flex-col justify-start items-start p-[9%]  "
    >
      {/* movie name  */}
      <h1 className="w-[70%] text-white font-black text-4xl ">
        {data.original_name || data.name || data.original_title || data.title}
      </h1>

      {/* movie overview  */}
      <p className="w-[70%] text-white mt-3 mb-3 ">
        {data.overview.slice(0, 90)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>

      {/* movie name and  movie rating  */}
      <p className=" text-white">
        <i className="ri-megaphone-fill mr-3 text-yellow-500">
          {data.release_date || "No Information"}
        </i>
        <i className="ri-album-fill text-yellow-500 mr-3">
          {data.media_type.toUpperCase()}
        </i>
      </p>
      <Link className="p-3 text-white bg-[#6556cd] rounded-md mt-3">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
