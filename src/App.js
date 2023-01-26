import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Information from './pages/Information';
import Setting from './pages/Setting';
import SettingEyeValue from './pages/SettingEyeValue';
import MainPage from './pages/Main';
import BeginPage from './pages/StartPage';
import LoginPage from './pages/LoginPage'
import JoinPage from './pages/JoinPage'
import EyeGallery from "./pages/EyeGallery";
import VideoPage from './pages/VideoPage';

function App() {
  return (
    <BrowserRouter>
      <span className="App">
        <Routes>
          <Route path="/" element={<Information />}/>
          <Route path="/setting" element={<Setting />}/>
          <Route path="/setting/eye" element={<SettingEyeValue />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/join" element={<JoinPage />}/>
          <Route path="/begin" element={<BeginPage />}/>
          <Route path="/paint" element={<MainPage />}/>
          <Route path="/gallery" element={<EyeGallery />}/>
          <Route path="/explain" element={<VideoPage />}/>
        </Routes>
      </span>
    </BrowserRouter>
  );
}
export default App;