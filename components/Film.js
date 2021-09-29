import React from "react";
import styles from "../styles/FilmStyles.module.scss";
import Star from "./Star";

export default function Film(props) {
  //   const [rating, setRating] = useState();
  return (
    <div className={styles.filmCard}>
      <div className={styles.filmTitle}>{props.film.title}</div>
      <div className={styles.filmStars}>
        <Star filled={props.favorited} onClick={props.onClick} />
      </div>
    </div>
  );
}
