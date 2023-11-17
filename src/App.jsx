import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import FeedPage from './pages/feed/FeedPage';
import { AuthProvider } from './context/authContext';
import { ROUTES } from './constants/routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FEED} element={<FeedPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;