import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../utils/axios";
import Card from "./Card";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const tv = () => {
  //   const [duration, setduration] = useState("day");
  const [tv, setTvshows] = useState([]);
  const [category, setcategory] = useState("arivingtoday");
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  document.title = "tv | " + category.toUpperCase();
  const getTvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/airing_today?page=${page}`);
      if (data.results.length > 0) {
        setTvshows((prev) => [...prev, ...data.results]);
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
    if (tv.length === 0) {
      getTvshows();
    } else {
      setpage(1); // buckets empty
      setTvshows([]); //put trending data
      getTvshows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  // console.log(trending);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between px-[3%] ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Tv Shows <small>({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Tv Series List"
            options={["arivingtoday", "on the air", "popular", "top rated"]}
            change={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* infinte scroll  */}

      <InfiniteScroll
        dataLength={tv.length} //This is important field to render the next data
        next={getTvshows}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Card data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default tv;
