import React from "react";
import styles from "../styles/FilmStyles.module.scss";
import Star from "./Star";
import Link from "next/link";

export default function Film(props) {
  //   const [rating, setRating] = useState();
  // console.log(props.film.episode_id);
  return (
    <Link href={`/film/${encodeURIComponent(props.film.title)}`}>
      <div className={styles.filmCard}>
        <div className={styles.filmTitle}>{props.film.title}</div>
        <div className={styles.filmStars}>
          <Star filled={props.favorited} onClick={props.onClick} />
        </div>
      </div>
    </Link>
  );
}
