import { React, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Film from "./Film";

import styles from "../styles/FilmListStyles.module.scss";

const MovieList = ({ filmData, searchTerm }) => {
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
  if (!filmData) return "Loading...";

  // filters list based on searchTerm
  const filteredList = filmData.results.filter((film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log("FILTEREDlIST", filteredList);
  console.log("FILMDATA", filmData);

  //iterate over the data and return a list of films
  const films = filteredList.map((film) => {
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
