import React from "react";
import { Link } from "react-router-dom";
const Card = ({ data, title }) => {
  // console.log(data);
  return (
    <div className=" flex flex-wrap w-full h-full px-[3%] bg-[#1F1E24] ">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative mt-3 mr-[5%] mb-[5%] w-[27vh] leading-3 "
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover object-center"
            src={
              c.backdrop_path || c.poster_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.poster_path || c.profile_path
                  }`
                : "noimage.jpg"
            }
            alt="noimage.jpg"
          />
          <h1 className="text-[1.35rem] text-zinc-300 mt-4 text-center leading-7  ">
            {c.original_name || c.name || c.original_title || c.title}
          </h1>
          {c.vote_average ? (
            <div className="absolute flex justify-center items-center right-[-6%] bottom-[30%] text-white w-[6vh] h-[6vh] bg-yellow-600 rounded-full font-semibold">
              {(c.vote_average * 10).toFixed()}
              <sup className="text-white text-md">%</sup>
            </div>
          ) : (
            <div className="absolute flex justify-center items-center right-[-6%] bottom-[30%] text-white w-[6vh] h-[6vh] bg-yellow-600 rounded-full font-semibold">
              30
              <sup className="text-white text-md">%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Card;
