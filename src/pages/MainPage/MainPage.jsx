import { useState, useEffect } from 'react';
import PaginationControlled from '../../components/Pagination/Pagination';
import SearchShow from '../../components/ResultsShow/ResultsShow';
import './MainPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import Sort from '../../components/Sort/Sort';
import { fetchUsers, setUsers } from '../../redux/slice/usersSlice';
import axios from 'axios';

export default function MainPage() {
  const dispatch = useDispatch();
  const { status, users } = useSelector((state) => state.users);
  const { searchValue } = useSelector((state) => state.filters);
  const [sortType, setSortType] = useState(0);

  // get Users first render
  const gerUsers = () => {
    //популярные
    const popular = 'q=+repos:%3E42+followers:%3E1000';
    //колличество результатов на странице
    const percPage = 'per_page=10';
    //колличество страниц
    const pages = '';
    const order = '';
    dispatch(
      fetchUsers({
        popular,
        percPage,
        searchValue,
      }),
    ).then((res) => {
      console.log(res, '1 ответ получен"');
      return res;
    });
    console.log('Должен вывестись после получения ответа');
  };

  useEffect(() => {
    gerUsers();
  }, []);

  //обработка цикла параллельно
  useEffect(() => {
    (async () => {
      const promises = [];
      for (const user of users) {
        promises.push(axios.get(`https://api.github.com/users/${user.login}/repos`));
      }

      //ждем когда все промисы выполнятся
      await Promise.all(promises);
    })();
  }, [users]);

  return (
    <div className="mainPage container__row">
      {/*
      {status === 'error' ? (
        <div className="mainPage__error_info">
          <div className="error_info__title">Произошла ошибка &#128532;</div>
          <div className="error_info__text">
            К сожалению не удалось получить данные. Попробуйте повторить попытку позже.
          </div>
        </div>
      ) : (
        <div>*/}
      <Sort value={sortType} onCangeSort={(i) => setSortType(i)} />
      <SearchShow />
      <PaginationControlled />
      {/*</div>
      )}*/}
    </div>
  );
}
