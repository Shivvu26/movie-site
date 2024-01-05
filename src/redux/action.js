import axios from "axios";
const API_KEY = '2dca580c2a14b55200e784d157207b4d';

export const getGenreList = () => {
    return dispatch => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": API_KEY
                }
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: "GET_GENRE_LIST",
                        payload: res.data.genres
                    })
                }
            })
            .catch((error) => console.error('Error fetching genres:', error));
    }
}

export const getMovieList = (year, page) => {
    return dispatch => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100&with_genres="28, 80"`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": API_KEY
                }
            }
        )
            .then((res) => {
                if (res.status === 200 && res.data.results.length > 0) {
                    dispatch({
                        type: "GET_MOVIE_LIST",
                        year: year,
                        payload: res.data.results
                    })
                } else return;
            })
            .catch((error) => console.error('Error fetching movies:', error));
    }
}

export const getGenreWiseMovie = (id) => {
    return dispatch => {
        dispatch({
            type: "GET_GENRE_WISE_MOVIE_LIST",
            id: id
        })
    }
}