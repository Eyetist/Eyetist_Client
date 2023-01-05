import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import BeginPage from './components/begin/StartPage';
import LoginPage from './components/loginjoin/LoginPage'
import JoinPage from './components/loginjoin/JoinPage'


function App() {
  return (
    <BrowserRouter>
      <span className="App">
        <Routes>
          <Route path="/" element={<BeginPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/join" element={<JoinPage />}/>
        </Routes>
      </span>
    </BrowserRouter>
  );
}
export default App;