import './Search.scss';
import axios from 'axios';

import { fetchResults, setUsers } from '../../redux/slice/resultsSlice';
import { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { setSearchValue } from '../../redux/slice/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { async } from 'q';

export default function Search() {
  const [reposit, setReposit] = useState([]);
  console.log(reposit, 'reposit');
  const dispatch = useDispatch();

  const { searchValue, page } = useSelector((state) => state.filters);
  const {
    results: { items },
    users,
  } = useSelector((state) => state.results);
  console.log(items, 'items');
  //const { repos_url } = items;
  //console.log(repos_url, 'repos_url');
  //setReposit(repos_url);

  console.log(reposit, 'reposit');

  const getResults = async () => {
    //популярные
    const popular = 'q=tom+repos:%3E42+followers:%3E1000';
    //колличество результатов на странице
    const percPage = 'per_page=10';
    //колличество страниц
    const pages = '';
    const order = '';

    //запрос на бек
    //https://rickandmortyapi.com/api/character/?page=2

    //ХОТИМ ДОЖТАТЬСЯ ОТВЕТА
    //дай данные и сохрани первый запрос

    dispatch(
      fetchResults({
        popular,
        percPage,
        searchValue,
      }),
    ).then(async (res) => {
      dispatch(setUsers(res.payload.items));
      const user = 'AlisaCosmos';
      console.log(res, 'res');
      await axios.get(`https://api.github.com/users/${user}/repos`);

      return res;
    });

    //console.log(user, 'user await');
    //ПОСЛЕ ОТВЕТА ПОЛУЧИТЬ РЕПОЗИТОРИИ
    //user.then((res) => {
    //  console.log(res, 'res await');
    //});

    //const usereposit = await axios
    //  .get(`${user.repos_url}`)
    //.then((respons) => {
    //  console.log(respons, 'respons axios');
    // if (respons) {
    //setRepositories(respons.data);
    //console.log(respons, 'respons comp resultsitem axios');
    //  }
    // })
    //.catch((err) => {
    //console.log(err);
    // });
    // console.log(usereposit, 'usereposit await');
  };

  const handelSearch = async (e) => {
    e.preventDefault();
    //запрос на бек

    const step = await getResults();
    console.log(step, 'step');
  };
  //
  const onChangeInput = (event) => {
    dispatch(setSearchValue(event.target.value));
  };
  //
  const onClickClear = () => {
    dispatch(setSearchValue(''));
  };

  //const getResults = async () => {
  //колличество результатов на странице
  //const percPage = 'per_page=10';
  //колличество страниц
  //const pages = '';
  //const order = '';

  //запрос на бек
  //https://rickandmortyapi.com/api/character/?page=2

  //дай данные и сохрани
  //  dispatch(
  //   fetchResults({
  //     percPage,
  //    searchValue,
  //  }),
  // );

  //await axios
  //  .get(`https://api.github.com/search/users?${percPage}&q=${searchValue}`)
  //  .then((respons) => {
  //     (respons, 'respons axios');
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
  // };
  // useEffect(() => {
  //   getResults();
  //  }, [searchValue]);

  return (
    <div className="search">
      <form onSubmit={handelSearch}>
        <SearchOutlinedIcon className="search__icon" />
        <input
          className="search__input"
          placeholder="Введите имя пользователя"
          value={searchValue}
          onChange={onChangeInput}
        />
        {searchValue && (
          <CloseOutlinedIcon className="search__icon__close" onClick={onClickClear} />
        )}
      </form>
    </div>
  );
}
