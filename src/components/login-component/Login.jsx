import { useAuth } from '../../context/authContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Typerwriter from '../typewriter-component/Typerwriter';
import { ROUTES } from '../../constants/routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import ImgLogo from '../../assets/intechlogo.png';
import './login.css';

const Login = () => {
  const { user, signIn } = useAuth();

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        signIn(result.user);
      })
      .catch((error) => {
        console.log(error);


        if (error.message && error.message.includes('net::ERR_INTERNET_DISCONNECTED')) {

          history.pushState = ROUTES.LOGIN;
        }
      });
  }

  return (
    <div className="container_Login">
      <img src={ImgLogo} width={450} height={130} />
      <Typerwriter strings={['Explore o Universo Tech com Intech']} />
      {user && user.photoURL ? (
        <div className='user'>
          <img src={user.photoURL} alt="Foto do usuário" />
          <p className='title_Name_User'>Bem-vindo!</p>
          <p>{user.displayName}</p>
          <Link className='button_Entry' to={ROUTES.FEED}>Entrar</Link>
        </div>
      ) : (
        <div className='container_Button'>
          <h3 className='title_Button'>Acesse sua conta</h3>
          <p className='text_Apresentation'>Seja bem-vindo à InTech, sua
            comunidade tech de excelência! Junte-se a nós para explorar o
            universo da tecnologia e conectar-se com mentes inovadoras.</p>
          <p type="button" className='button' onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} />
            <button className='link'>Entrar com Google</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
