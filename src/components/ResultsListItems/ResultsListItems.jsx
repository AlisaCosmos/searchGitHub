import ResultsItem from '../ResultsItem/ResultsItem';
import './ResultsListItems.scss';

import { useSelector } from 'react-redux';

export default function ResultsListItems() {
  const {
    results: { items },
  } = useSelector((state) => state.results);

  //console.log(items, 'items comp search');

  return (
    <div className="resultsListItems">
      {items?.map((item, i) => {
        return <ResultsItem key={i} data={item} />;
      })}
    </div>
  );
}
