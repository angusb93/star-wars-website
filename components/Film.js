import React from "react";
import "../styles/FilmStyles.module.scss";
export default function Film(props) {
  return <div>{props.film.title}</div>;
}
