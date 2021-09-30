import { React, useState, useEffect } from "react";
import Film from "./Film";

import styles from "../styles/FilmListStyles.module.scss";

const MovieList = ({ filmData, searchTerm }) => {
  // const [favorited, setFavorited] = useState({ films: [] });
  // useState with function to check if there is local storage for films and use that if there is. also check if the file is running on the server
  const [favorited, setFavorited] = useState(() => {
    if (typeof window !== "undefined") {
      const localStorageFilms = JSON.parse(localStorage.getItem("films"));
      return localStorageFilms ? localStorageFilms : { films: [] };
    } else {
      return { films: [] };
    }
  });

  //store films in local storage to be read later
  useEffect(() => {
    localStorage.setItem("favorited", JSON.stringify(favorited));
  }, [favorited]);

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
