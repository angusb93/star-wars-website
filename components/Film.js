import React from "react";
import styles from "../styles/FilmStyles.module.scss";
import Star from "./Star";
import Link from "next/link";

export default function Film(props) {
  return (
    <div className={styles.filmCard}>
      <div className={styles.filmTitle}>
        {props.film.title}
        <Link href={`/film/${parseInt(props.film.episode_id)}`}>
          <a className={styles.link} />
        </Link>
      </div>
      <div className={styles.filmStars}>
        <Star filled={props.favorited} onClick={props.onClick} />
      </div>
    </div>
  );
}
