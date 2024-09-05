import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../utils/axios";
import Card from "./Card";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const People = () => {
  //   const [duration, setduration] = useState("day");
  const [People, setPeople] = useState([]);
  const [category, setcategory] = useState("popular");
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  document.title = "People | " + category.toUpperCase();
  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
      console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // create refresh handler for refresh pages

  const refreshHandler = () => {
    if (People.length === 0) {
      getPeople();
    } else {
      setpage(1); // buckets empty
      setPeople([]); //put trending data
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  // console.log(trending);

  return People.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between px-[3%] ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          People <small>({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          {/* <Dropdown
            title="Tv Series List"
            options={["arivingtoday", "on the air", "popular", "top rated"]}
            change={(e) => setcategory(e.target.value)}
          /> */}
        </div>
      </div>

      {/* infinte scroll  */}

      <InfiniteScroll
        dataLength={People.length} //This is important field to render the next data
        next={getPeople}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Card data={People} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
