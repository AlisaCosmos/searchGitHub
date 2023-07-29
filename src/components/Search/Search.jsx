import './Search.scss';
import axios from 'axios';

import { fetchResults } from '../../redux/slice/resultsSlice';
import { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { setSearchValue } from '../../redux/slice/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Search() {
  const dispatch = useDispatch();

  const { searchValue, page } = useSelector((state) => state.filters);
  const { results } = useSelector((state) => state.results);
  console.log(searchValue);
  console.log(results, 'results');

  const handelSearch = (e) => {
    e.preventDefauit();
    //запрос на бек
    fetch(`https://api.github.com/search/users?q=${searchValue} `)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          //setResults(data);
        }
      })
      .catch((err) => {
        console.log(err, 'erorr');
      });
  };
  const onChangeInput = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
  };

  const getResults = async () => {
    //колличество результатов на странице
    const percPage = 'per_page=10';
    //колличество страниц
    const pages = '';
    const order = '';

    //запрос на бек
    //https://rickandmortyapi.com/api/character/?page=2

    //дай данные и сохрани
    dispatch(
      fetchResults({
        percPage,
        searchValue,
      }),
    ).then((data) => {
      console.log(data, 'data wtf');
    });

    //await axios
    //  .get(`https://api.github.com/search/users?${percPage}&q=${searchValue}`)
    //  .then((respons) => {
    //    console.log(respons, 'respons axios');
    //    if (respons) {
    //      const totalCount = respons.data.total_count;
    //      console.log(totalCount, 'totalCount axios');
    //      setResults(respons.data.items);
    //      console.log(results, 'results comp search axios');
    //    }
    //  }).catch(err=> {
    //  console.log(err);
    //});

    //fetch(`https://api.github.com/search/users?${percPage}&q=${searchValue}`)
    //  .then((res) => {
    //    return res.json();
    //  })
    //  .then((data) => {
    //    console.log(data, 'data');
    //    if (data) {
    //      const totalCount = data.total_count;
    //      console.log(totalCount, 'totalCount fetch');
    //      setResults(data.items);
    //      console.log(setResults, 'setResults comp search fetch');
    //    }
    //  })
    //  .catch((err) => {
    //    console.log(err, 'erorr');
    //  });
  };
  useEffect(() => {
    getResults();
  }, [searchValue]);

  return (
    <div className="search">
      <form onSubmit={handelSearch}>
        <SearchOutlinedIcon />
        <input
          className="search__input"
          placeholder="Введите имя пользователя"
          value={searchValue}
          onChange={onChangeInput}
        />
        {searchValue && <CloseOutlinedIcon onClick={onClickClear} />}
      </form>
    </div>
  );
}
