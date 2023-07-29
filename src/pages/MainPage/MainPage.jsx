import { useState } from 'react';
import PaginationControlled from '../../components/Pagination/Pagination';
import SearchShow from '../../components/ResultsShow/ResultsShow';
import './MainPage.scss';
import { useSelector } from 'react-redux';
import Sort from '../../components/Sort/Sort';

export default function MainPage() {
  const { status } = useSelector((state) => state.results);
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
      <Sort />
      <SearchShow />
      <PaginationControlled />
      {/*</div>
      )}*/}
    </div>
  );
}
