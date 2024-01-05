import { useEffect, useMemo } from 'react';
import GenreItem from '../components/GenreItem';
import { useDispatch, useSelector } from 'react-redux';
import { getGenreList } from '../redux/action';

const GenreList = () => {
    const dispatch = useDispatch();

    const genreList = useSelector(state => state.genre);

    const memoizedGenres = useMemo(() => genreList, [genreList]);

    useEffect(() => {
        dispatch(getGenreList());
    }, [dispatch])

    return (
        <nav>
            <ul>
                {memoizedGenres && memoizedGenres.map((item, index) => {
                    return <GenreItem data={item} key={index} />
                })}
            </ul>
        </nav>
    );
};

export default GenreList;
