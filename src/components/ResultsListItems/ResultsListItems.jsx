import ResultsItem from '../ResultsItem/ResultsItem';
import './ResultsListItems.scss';

import { useSelector } from 'react-redux';

export default function ResultsListItems() {
  const { users } = useSelector((state) => state.users);

  return (
    <div className="resultsListItems">
      {users?.map((item, i) => {
        return <ResultsItem key={i} data={item} />;
      })}
    </div>
  );
}
