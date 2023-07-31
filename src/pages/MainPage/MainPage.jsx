import { useState, useEffect } from 'react';
import PaginationControlled from '../../components/Pagination/Pagination';
import SearchShow from '../../components/ResultsShow/ResultsShow';
import './MainPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import Sort from '../../components/Sort/Sort';
import { fetchResults, setUsers } from '../../redux/slice/resultsSlice';

export default function MainPage() {
  const dispatch = useDispatch();
  const { results, status } = useSelector((state) => state.results);
  const { searchValue } = useSelector((state) => state.filters);
  const [sortType, setSortType] = useState(0);

  const gerUsers = () => {
    //популярные
    const popular = 'q=+repos:%3E42+followers:%3E1000';
    //колличество результатов на странице
    const percPage = 'per_page=10';
    //колличество страниц
    const pages = '';
    const order = '';
    dispatch(
      fetchResults({
        popular,
        percPage,
        searchValue,
      }),
    ).then((res) => {
      //dispatch(setUsers(res));
      console.log(res, '1 ответ получен"');
      return res;
    });
    console.log('Должен вывестись после получения ответа');
  };

  useEffect(() => {
    gerUsers();
  }, []);

  //const getResults = async () => {
  //колличество результатов на странице
  // const percPage = 'per_page=10';
  //колличество страниц
  //const pages = '';
  //const order = '';

  //запрос на бек
  //https://rickandmortyapi.com/api/character/?page=2

  //дай данные и сохрани
  //dispatch(
  //  fetchResults({
  //    percPage,
  //    searchValue,
  //  }),
  //);
  //};

  //useEffect(() => {
  // getResults();
  //}, [searchValue, sortType]);

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
