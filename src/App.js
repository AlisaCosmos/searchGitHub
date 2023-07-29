import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header container">
        <Header />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
