import LoginPage from './pages/login/LoginPage';
import { AuthProvider } from './context/authContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
