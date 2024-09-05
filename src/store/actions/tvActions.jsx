export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getstate) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    // for whole detail use a object

    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((movies) => movies.type == "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    // send kro ge load tv ko tabhi to dekho ge na
    dispatch(loadtv(ultimateDetails));
    console.log(ultimateDetails);
  } catch (error) {
    console.log(error);
  }
};
