import { AuthProvider } from "./context/authContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ROUTES } from './constants/routes';
import LoginPage from './pages/login/LoginPage';
// import FeedPage from './pages/feed/FeedPage';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
          {/* <Route exact path={ROUTES.FEED} element={<FeedPage />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
