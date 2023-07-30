import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';

function App() {
  return (
    <div className="App">
      <SmoothScroll />
      <header className="App-header ">
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
