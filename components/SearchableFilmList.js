import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FilmList from "../components/FilmList";
const SearchableFilmList = ({ filmData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilmList filmData={filmData} searchTerm={searchTerm} />
    </div>
  );
};

export default SearchableFilmList;
