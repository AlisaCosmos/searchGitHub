import axios from 'axios';
import './ResultsItem.scss';
import { useEffect, useState } from 'react';

export default function ResultsItem({ data: { login, avatar_url, repos_url } }) {
  const [repositories, setRepositories] = useState([]);
  //console.log(repositories, 'repositories');

  const getReposutoris = async () => {
    //(repos_url, 'repos_url');
    await axios
      .get(`${repos_url}`)
      .then((respons) => {
        //console.log(respons, 'respons axios');
        if (respons) {
          setRepositories(respons.data);
          //console.log(respons, 'respons comp resultsitem axios');
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getReposutoris();
  }, []);

  //console.log(login, 'login');
  return (
    <div className="resultsItem">
      <div className="resultsItem__inner">
        <div className="resultsItem__col">
          <div className="resultsItem__img">
            <img src={`${avatar_url}`} alt={`img user ${login}`} />
          </div>
          <h3 className="resultsItem__title">{login} </h3>
        </div>
        <div className="resultsItem__col">
          <h3 className="resultsItem__title">Repositories</h3>
          <ul>
            {repositories?.map((list, i) => {
              return (
                <li key={i}>
                  <div>{list.name}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
