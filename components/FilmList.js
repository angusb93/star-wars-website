import React from "react";
import useSWR from "swr";
import axios from "axios";
import Film from "./Film";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const MovieList = () => {
  const { data, error } = useSWR("https://swapi.dev/api/films/", fetcher);
  console.log(data);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  //iterate over the data and return a list of films
  const films = data.results.map((film) => {
    return <Film key={film.episode_id} film={film} />;
  });

  return <div>{films}</div>;
};

export default MovieList;
// results[0].title
// results[0].episode_id
