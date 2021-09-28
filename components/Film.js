import React from "react";
import styles from "../styles/FilmStyles.module.scss";
export default function Film(props) {
  return (
    <div className={styles.filmCard}>
      <div className={styles.filmTitle}>{props.film.title}</div>
    </div>
  );
}
