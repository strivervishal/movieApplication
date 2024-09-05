import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../utils/axios";
import Card from "./Card";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const Movie = () => {
  //   const [duration, setduration] = useState("day");
  const [movie, setmovie] = useState([]);
  const [category, setcategory] = useState("movie");
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  document.title = "movie | " + category.toUpperCase();
  const getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/now_playing?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
      // console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // create refresh handler for refresh pages

  const refreshHandler = () => {
    if (movie.length === 0) {
      getmovie();
    } else {
      setpage(1); // buckets empty
      setmovie([]); //put trending data
      getmovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  // console.log(trending);

  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between px-[3%] ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Movie <small>({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Now Playing"
            options={["Popular", "topRated", "Upcoming"]}
            change={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* infinte scroll  */}

      <InfiniteScroll
        dataLength={movie.length} //This is important field to render the next data
        next={getmovie}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Card data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;
