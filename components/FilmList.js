import { React, useState, useEffect } from "react";
import Film from "./Film";

import styles from "../styles/FilmListStyles.module.scss";

const MovieList = ({ filmData, searchTerm }) => {
  // const [favorited, setFavorited] = useState({ films: [] });

  // use state for getting favorited films from local storage

  const [favorited, setFavorited] = useState(() => {
    if (typeof window !== "undefined") {
      const localStorageFilms = JSON.parse(
        localStorage.getItem("favorited")
      ) || { films: [] };
      console.log("local storage films", localStorageFilms);
      return localStorageFilms;
    } else {
      return { films: [] };
    }
  });

  // update favorited from local storage when rendered to trigger re render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorited(JSON.parse(localStorage.getItem("favorited")));
    }
  }, []);

  //store films in local storage to be read later
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorited", JSON.stringify(favorited));
    }
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
