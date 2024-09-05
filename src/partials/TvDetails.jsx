import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv } from "../store/actions/tvActions";
import { removetv } from "../store/actions/tvActions";
import Loader from "../partials/Loader";
import Horizontalcards from "./Horizontalcards";
function TvDetails() {
  const { id } = useParams();
  // get coming url
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // save the tv details
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    // tv gye to khali kro redux se
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path ||
          info.details.poster_path ||
          info.details.profile_path
        })`,
        // backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundPosition: "top 10%",
        objectFit: "cover",
        imageOrientation: "vertical center",
      }}
      className="relative w-screen h-[160vh] px-[10%]  "
    >
      {/* part1 navigation section  */}
      <nav className="text-zinc-100 h-[10vh] mt-3  flex gap-12 items-center text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-white"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-line "></i>
        </a>
        <a
          target="_blank"
          // href={`https://en.wikipedia.org/wiki/${info.externalId.wikidata_id}`}
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          tmdb
        </a>
      </nav>

      {/* part 2 poster  */}
      <div className="w-full flex ">
        <img
          className="mt-4 shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[30vh] h-[45vh] object-cover object-center"
          src={
            info.details.backdrop_path || info.details.poster_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.details.backdrop_path || info.details.poster_path
                }`
              : "noimage.jpg"
          }
          alt="noimage.jpg"
        />

        <div className="content ml-[5%] ">
          <h1 className="text-zinc-100 text-4xl font-bold">
            {info.details.original_name ||
              info.details.name ||
              info.details.original_title ||
              info.details.title}
            <small className="text-zinc-300 text-[1.3rem] font-semibold">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex items-center gap-x-5 text-white">
            <span className=" flex justify-center items-center w-[6vh] h-[6vh] bg-yellow-600 rounded-full font-semibold">
              {(info.details.vote_average * 10).toFixed()}
              <sup className="text-white text-md">%</sup>
            </span>
            <h1 className="text-xl font-semibold leading-5 capitalize w-[50px]">
              User Score
            </h1>
            <h1 className="text-[1rem] ">{info.details.first_air_date}</h1>
            <h1 className="text-[1rem] ">
              {info.details.genres.map((g) => g.name).join(" , ")}
            </h1>
            <h1 className="text-[1rem] ">{info.details.runtime}min</h1>
          </div>

          <div className="text-white">
            <h1 className="mt-3 mb-4 italic">{info.details.tagline}</h1>
            <h1 className="text-xl font-semibold"> Overview</h1>
            <p className=" mb-4">{info.details.overview.slice(0, 250)}.</p>
            <h1 className="text-xl font-semibold">tv Translated</h1>
            <p className="text-justify mb-10">
              {info.translations.join(" , ")}.
            </p>

            <Link
              className=" px-7 py-3 rounded-md bg-[#6556CD]"
              to={`${pathname}/trailer`}
            >
              <i className="ri-play-fill"></i>
              Play Trailer
            </Link>
          </div>
        </div>
      </div>
      {/* part 3 available plateforms  */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center">
            <h1 className="text-white">Avilable on flatrate</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="rounded-md h-[5vh] w-[5vh] "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center ">
            <h1 className="text-white">Avilable on rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="rounded-md h-[5vh] w-[5vh] "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {/* {info.watchproviders &&
          info.watchproviders.buy &&
          info.watchproviders.buy.map((w) => (
            <img
              className="rounded-md h-[5vh] w-[5vh] "
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
            />
          ))} */}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 ">
            <h1 className="text-white ">Avilable on buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="rounded-md h-[5vh] w-[5vh] "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* part 4 recommendations */}
      <hr className="mt-10 mb-5 border-none bg-zinc-400 h-[2px]" />
      <h1 className="text-white text-2xl font-semibold">
        Recommendations & Similar Items
      </h1>
      <Horizontalcards
        className="mt-5"
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}

export default TvDetails;
