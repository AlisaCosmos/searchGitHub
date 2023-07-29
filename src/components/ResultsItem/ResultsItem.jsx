import axios from 'axios';
import './ResultsItem.scss';
import { useEffect, useState } from 'react';

export default function ResultsItem({ data: { login, avatar_url, repos_url } }) {
  const [repositories, setRepositories] = useState([]);
  console.log(repositories, 'repositories');

  const getReposutoris = async () => {
    console.log(repos_url, 'repos_url');
    await axios
      .get(`${repos_url}`)
      .then((respons) => {
        console.log(respons, 'respons axios');
        if (respons) {
          setRepositories(respons.data);
          console.log(respons, 'respons comp resultsitem axios');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReposutoris();
  }, []);

  console.log(login, 'login');
  return (
    <div className="resultsItem">
      <h3 className="">{login} </h3>
      <div>
        <img src={`${avatar_url}`} alt={`img user ${login}`} />
      </div>

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
  );
}
