import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import FeedPage from './pages/feed/FeedPage';
import { AuthProvider } from './context/authContext';
import { ROUTES } from './constants/routes'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FEED} element={<FeedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
