import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import FeedPage from './pages/feed/FeedPage';
import { ROUTES } from './constants/routes'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.FEED} element={<FeedPage />} />
    </Routes>
  );
}

export default App;