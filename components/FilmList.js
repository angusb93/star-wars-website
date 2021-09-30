import { React, useState, useEffect } from "react";
import Film from "./Film";
import FlipMove from "react-flip-move";
import styles from "../styles/FilmListStyles.module.scss";

const MovieList = ({ filmData, searchTerm }) => {
  const [favorited, setFavorited] = useState({ films: [] });

  // update favorited from local storage when rendered to trigger re render
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("favorited")) {
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

  // orders filteredList based on whether its favorited or not
  const orderedList = filteredList.sort((a, b) => {
    if (favorited.films.includes(a.episode_id)) {
      return -1;
    } else if (favorited.films.includes(b.episode_id)) {
      return 1;
    } else {
      return 0;
    }
  });
  //iterate over the data and return a list of films
  const films = orderedList.map((film) => {
    return (
      <Film
        key={film.episode_id}
        film={film}
        favorited={favorited.films.includes(film.episode_id) ? true : false}
        onClick={() => handleClick(film.episode_id)}
      />
    );
  });

  return (
    <div className={styles.filmContainer}>
      <FlipMove>{films}</FlipMove>
    </div>
  );
};

export default MovieList;
