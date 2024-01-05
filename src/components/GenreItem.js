import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenreWiseMovie } from '../redux/action';

const GenreItem = (props) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  let { name, id } = props.data;

  return (
    <li onClick={() => {dispatch(getGenreWiseMovie(id));setIsSelected(!isSelected);}} className={`genre-filter ${isSelected && 'active'} `}>
      {name}
    </li>
  );
};

export default GenreItem;
