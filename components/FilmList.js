import { React, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Film from "./Film";

import styles from "../styles/FilmListStyles.module.scss";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const MovieList = () => {
  const { data, error } = useSWR("https://swapi.dev/api/films/", fetcher);

  const [favorited, setFavorited] = useState({ films: [] });

  const handleClick = (id) => {
    if (favorited.films.includes(id)) {
      setFavorited({ films: favorited.films.filter((film) => film !== id) });
    } else {
      setFavorited({
        films: [...favorited.films, id],
      });
    }
  };
  // console.log(data);
  console.log(favorited);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  //iterate over the data and return a list of films
  const films = data.results.map((film) => {
    return (
      <Film
        key={film.episode_id}
        film={film}
        favorited={favorited.films.includes(film.episode_id) ? true : false}
        onClick={() => handleClick(film.episode_id)}
      />
    );
  });

  return <div className={styles.filmContainer}>{films}</div>;
};

export default MovieList;
// results[0].title
// results[0].episode_id
