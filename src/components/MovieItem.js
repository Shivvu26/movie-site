import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GenreItem from "./GenreItem";

const MovieItem = (props) => {
  let { title, poster_path, overview, release_date, genre_ids } = props;

  const genreList = useSelector(state => state.genre);

  const getGenreNames = (genre_ids, genreList) => {
    return genre_ids.map(id => {
      const genre = genreList.find(genre => genre.id === id);
      return genre ? genre.name : null;
    }).filter(name => name !== null);
  };
  
  const genreNames = getGenreNames(genre_ids, genreList);

    return (
      <div className="movie-card">
        <img src = {`https://image.tmdb.org/t/p/original/${poster_path}`} />
        <span className="release-date">Released On {release_date} </span>
        <h3>{title}</h3>
        <p title={overview}>{overview}</p>
        
        {genreNames.map((genre, id)=> {
          return <button key={id}>{genre}</button>
        })}
        {/* <p>Cast: {cast}</p>
        <p>Director: {director}</p> */}
      </div>
    );
  };
  
  export default MovieItem;
  