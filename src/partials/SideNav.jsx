import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-zinc-400 border-r-2 p-10 ">
      <h1 className="text-2xl text-white ">
        <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
        <span className=" ">SCSDB</span>
      </h1>
      <nav className="flex flex-col text-zinc-400  text-xl gap-2">
        <h1 className="text-white mt-10  text-xl ">New Feeds</h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 "
        >
          <i className="ri-fire-fill mr-2 "></i>Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 "
        >
          <i className="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 "
        >
          <i className="mr-2 ri-movie-2-fill"></i>Movies
        </Link>
        <Link
          to="/tvshows"
          className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 "
        >
          <i className="mr-2 ri-tv-fill"></i>Tv Shows
        </Link>
        <Link
          to="/people"
          className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 mb-1  "
        >
          <i className="ri-team-fill mr-2"></i>People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400  text-xl gap-2">
        <h1 className="text-white mt-8  text-xl tracking-tight ">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 ">
          <i className="ri-information-fill mr-2"></i>About
        </Link>
        <Link className="hover:bg-[#6556CD] rounded-lg hover:text-white duration-300 p-3 ">
          <i className="ri-phone-line mr-2"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
