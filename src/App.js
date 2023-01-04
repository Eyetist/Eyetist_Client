import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import BeginPage from './components/begin/startPage';
import LoginPage from './components/loginjoin/loginPage'
import JoinPage from './components/loginjoin/joinPage'


function App() {
  return (
    <BrowserRouter>
      <span className="App">
        <Routes>
          <Route path="/" element={ <JoinPage /> } />
        </Routes>
      </span>
    </BrowserRouter>
  );
}
export default App;