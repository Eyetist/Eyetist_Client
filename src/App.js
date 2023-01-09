import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import BeginPage from './pages/StartPage';
import LoginPage from './pages/LoginPage'
import JoinPage from './pages/JoinPage'
import EyeGallery from "./pages/EyeGallery";
function App() {
  return (
    <BrowserRouter>
      <span className="App">
        <Routes>
          <Route path="/" element={<BeginPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/join" element={<JoinPage />}/>
          <Route path="/paint" element={<MainPage />}/>
          <Route path="/gallery" element={<EyeGallery />}/>
        </Routes>
      </span>
    </BrowserRouter>
  );
}
export default App;