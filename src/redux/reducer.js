const initialState = {
    genre: [],
    movies: [],
    ids: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_GENRE_LIST":
            return {
                ...state,
                genre: action.payload
            };
        case "GET_MOVIE_LIST":
            const { year, payload } = action;
            let res;
            if (!state.movies.length) {
                res = {
                    ...state,
                    movies: [
                        ...state.movies,
                        {
                            [year]: payload
                        }
                    ],
                };
            } else {
                let keys = [];
                state.movies.forEach(obj => {
                    Object.keys(obj).forEach(key => {
                        keys.push(key);
                    });
                });
                if (!keys.includes(year.toString())) {
                    res = {
                        ...state,
                        movies: [
                            ...state.movies,
                            {
                                [year]: payload
                            }
                        ]
                    };
                } else {
                    res = {
                        ...state,
                        movies: [...state.movies]
                    }
                }
            }
            return res;
        case "GET_GENRE_WISE_MOVIE_LIST":
            const { id, name } = action;
            let genres = Array.from(state?.ids || []);

            const index = genres.indexOf(id);
            if (index !== -1) genres.splice(index, 1);
            else genres.push(id);

            state = {
                ...state,
                ids: genres
            };

            let result = state.movies.flatMap(yearData => {
                const filteredData = yearData[Object.keys(yearData)].filter(movie => {
                    for (const id of genres) {
                        if (movie.genre_ids.includes(id)) {
                            return true;
                        }
                    }
                    return false;
                });

                if(filteredData.length > 0) {
                    return {
                        [Object.keys(yearData)[0]]: filteredData
                    };
                } else return [];
            })
            return {
                ...state,
                genreWiseMovies: result
            };
        default:
            return state;
    }
}

export default rootReducer;