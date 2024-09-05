import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../utils/axios";
import Card from "./Card";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const Trending = () => {
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  document.title = "Trending | " + category.toUpperCase();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
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
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1); // buckets empty
      settrending([]); //put trending data
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  // console.log(trending);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between px-[3%] ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            change={(e) => setcategory(e.target.value)}
          />
          <div className="w-5"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            change={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      {/* infinte scroll  */}

      <InfiniteScroll
        dataLength={trending.length} //This is important field to render the next data
        next={getTrending}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Card data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
