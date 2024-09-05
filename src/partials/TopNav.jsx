import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../src/utils/axios";

const TopNav = () => {
  const [query, setquery] = useState("");
  // shows all related contents
  const [searches, setsearches] = useState([]);
  // console.log(query);
  const getsearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      //set data in searches
      setsearches(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };
  // newly searched query
  useEffect(() => {
    getsearch();
  }, [query]);
  return (
    //    top navbar

    <div className="w-[80%] h-[10vh] relative text-zinc-200 flex mx-auto justify-start items-center">
      <i className="text-xl ri-search-line cursor-pointer"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] p-3 outline-none border-none mx-10 bg-transparent cursor-pointer"
        type="text"
        placeholder="search anything"
      />
      {/* fordisplay close icon  */}
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-xl cursor-pointer ri-close-fill"
        ></i>
      )}

      {/* field where search comes  */}

      <div className="z-[100] absolute top-[100%] left-[6%] w-[50%] max-h-[50vh] bg-zinc-200 overflow-auto">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="text-zinc-600 hover:text-black hover:bg-zinc-300 flex justify-start items-center w-full p-8 border-b-2 border-zinc-100 z-[100]"
          >
            <img
              className="w-[10vh] h-[10vh] mr-5 rounded object-cover object-center shadow"
              src={
                s.backdrop_path || s.poster_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.poster_path || s.profile_path
                    }`
                  : "noimage.jpg"
              }
              alt=""
            />
            <span className="">
              {s.original_name || s.name || s.original_title || s.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
