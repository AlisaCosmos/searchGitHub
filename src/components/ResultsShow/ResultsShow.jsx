import './ResultsShow.scss';
import ResultsListItems from '../ResultsListItems/ResultsListItems';
import { useSelector } from 'react-redux';

export default function ResultsShow() {
  const { status } = useSelector((state) => state.results);

  return (
    <div className="resultsShow">
      <h2>Пользователи github</h2>
      {status === 'loading' ? <div>loading</div> : <ResultsListItems />}
    </div>
  );
}
