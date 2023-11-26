import { Link } from 'react-router-dom';
import { collection, query, orderBy, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from '../../services/firebase';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/authContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typerwriter from '../typewriter-component/Typerwriter';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import ImgLogo from '../../assets/intechlogo.png';
import './login.css';

const Login = () => {
  const { user, signIn } = useAuth();


  const postsQuery = query(
    collection(db, "users"),
    orderBy("createdAt", "desc")
  );
  const [users] = useCollectionData(postsQuery, { idField: "uid" });

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);


      const userExists = users.filter((user) => user.uid === result.user.uid);

      if (userExists.length === 0) {

        await addDoc(collection(db, "users"), {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          createdAt: new Date(),

        });
      }


      signIn(result.user);



    } catch (error) {
      console.error(error);


    }
  }

  return (
    <div className="container_Login">
      <img src={ImgLogo} width={450} height={130} />
      <Typerwriter strings={['Explore o Universo Tech com a Intech']} />
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
  )
};

export default Login;
