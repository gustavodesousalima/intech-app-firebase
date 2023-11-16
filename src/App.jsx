import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import FeedPage from './pages/feed/FeedPage';
import { AuthProvider } from './context/authContext';
import { ROUTES } from './constants/routes'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FEED} element={<FeedPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
