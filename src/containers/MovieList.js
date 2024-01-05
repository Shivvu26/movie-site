import React, { useState, useEffect, useMemo } from 'react';
import MovieItem from '../components/MovieItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList } from '../redux/action';
import InfiniteScroll from "react-infinite-scroll-component";


const MovieList = () => {
  const dispatch = useDispatch();
  const [currentYear, setCurrentYear] = useState(2012);
  const [currentPage, setCurrentPage] = useState(1);

  const movies = useSelector(state => state?.movies);
  const genreList = useSelector(state => state.genre);
  const genreWiseMovies = useSelector(state => state?.genreWiseMovies);

  useEffect(() => {
    dispatch(getMovieList(currentYear, currentPage));
  }, [dispatch, currentYear, currentPage]);

  const fetchMoreMovies = () => {
    setTimeout(() => {
      dispatch(getMovieList(currentYear + 1, currentPage));
      setCurrentYear(currentYear + 1);
    });
  };

  return (
    <>

      {genreWiseMovies?.length > 0 ? (
        <InfiniteScroll
          dataLength={genreWiseMovies.length}
          next={fetchMoreMovies}
          hasMore={currentYear <= 2023 ? true : false}
          loader={<h4 style={{ color: 'white' }}>Loading...</h4>}
        >
          {genreWiseMovies.map((item, index) => (
            <div key={index}>
              <h1 className="heading-year">{Object.keys(item)[0]}</h1>
              <div className="movie-list">
                {item[Object.keys(item)[0]].map((movie, id) => (
                  <MovieItem key={id} {...movie} />
                ))}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={currentYear <= 2023 ? true : false}
        // loader={<h4 style={{ color: 'white' }}>Loading...</h4>}
        >
          {movies && movies.map((item, index) =>
          (<div key={index}>
            <h1 className="heading-year">{Object.keys(item)[0]}</h1>
            <div className="movie-list">
              {item[Object.keys(item)[0]].map((movie, id) => (
                <MovieItem key={id} {...movie} />
              ))}
            </div>
          </div>)
          )}
        </InfiniteScroll>
      )
      }
    </>
  );
};

export default MovieList;
