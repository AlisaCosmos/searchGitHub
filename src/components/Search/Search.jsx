import './Search.scss';
import axios from 'axios';

import { fetchUsers, setUsers, getRepositories } from '../../redux/slice/usersSlice';
import { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { setSearchValue } from '../../redux/slice/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { async } from 'q';

export default function Search() {
  const dispatch = useDispatch();

  const { searchValue } = useSelector((state) => state.filters);
  const { repositories } = useSelector((state) => state.users);

  const getResults = async () => {
    //популярные
    const popular = 'q=tom+repos:%3E42+followers:%3E1000';
    //колличество результатов на странице
    const percPage = 'per_page=10';
    //колличество страниц
    const pages = '';
    const order = '';

    //ХОТИМ ДОЖТАТЬСЯ ОТВЕТА
    //дай данные и сохрани первый запрос

    const { payload: users } = await dispatch(
      fetchUsers({
        popular,
        percPage,
        searchValue,
      }),
    );

    console.log(users, 'users serch');

    const promises = [];
    console.log(promises, 'promises');
    for (const user of users) {
      promises.push(axios.get(`https://api.github.com/users/${user.login}/repos`));
      console.log(promises, 'promises inner');
    }
    await Promise.all(promises).then((data) => {
      console.log(data, 'data');
      return data;
    });

    //dispatch(getRepositories(responses));
    //console.log(repositories, 'repositories');
  };

  // get Users onClikc button
  const handelSearch = async (e) => {
    e.preventDefault();
    //запрос на бек
    await getResults();
  };
  //
  const onChangeInput = (event) => {
    dispatch(setSearchValue(event.target.value));
  };
  //
  const onClickClear = () => {
    dispatch(setSearchValue(''));
  };

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
