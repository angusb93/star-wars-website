import React from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MovieList = () => {
  const { data, error } = useSWR("https://swapi.dev/api/films/", fetcher);
  console.log(data);
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default MovieList;
