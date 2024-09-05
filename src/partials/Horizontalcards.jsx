import React from "react";
import { Link } from "react-router-dom";

const Horizontalcards = ({ data }) => {
  return (
    <div className="w-[100%] flex  overflow-y-hidden mb-3 p-5  ">
      {data.length > 0 ? data.map((d, i) => {
        // console.log(d);
        return (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-[40vh] mr-5 mb-5 bg-zinc-900 rounded overflow-hidden "
          >
            <img
              className="w-full h-[50%]  object-cover  object-center"
              src={
                d.backdrop_path || d.poster_path || d.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path || d.profile_path
                    }`
                  : "noimage.jpg"
              }
            />
            <div className=" text-white p-[5%] h-[50%] overflow-y-auto ">
              <h1 className=" text-white font-semibold  text-xl leading-6 ">
                {d.original_name || d.name || d.original_title || d.title}
              </h1>
              <p className="text-white  leading-[1.35rem] tracking-normal ">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        );
      }):<h1 className="text-3xl font-black text-center mt-5 text-white">Nothing to show</h1>}
    </div>
  );
};

export default Horizontalcards;
