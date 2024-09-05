export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getstate) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    // for whole detail use a object

    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t => t.english_name),
      videos: videos.data.results.find((movies) => movies.type == "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    // send kro ge load movie ko tabhi to dekho ge na
    dispatch(loadmovie(ultimateDetails));
    console.log(ultimateDetails);
  } catch (error) {
    console.log(error);
  }
};
