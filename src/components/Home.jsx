import React, { useEffect, useState } from "react";
import SideNav from "../partials/SideNav";
import TopNav from "../partials/TopNav";
import axios from "../utils/axios";
import Header from "../partials/Header";
import Horizontalcards from "../partials/Horizontalcards";
import Dropdown from "../partials/Dropdown";
import Loader from "../partials/Loader";

const Home = () => {
  document.title = "HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      //set data in searches
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) {
      console.log("error:", error);
    }
  };
  // trending data
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      //set data in searches
      settrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };
  // console.log(trending);
  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  // console.log(trending);
  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden ">
        <TopNav />
        <Header data={wallpaper} />
        <div className="p-6 flex justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            change={(e) => setcategory(e.target.value)}
          />
        </div>
        <Horizontalcards data={trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
