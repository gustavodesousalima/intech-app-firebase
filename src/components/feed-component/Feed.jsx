// components/feed/Feed.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCompass } from '@fortawesome/free-solid-svg-icons';
import NewPost from '../../components/newPost-component/NewPost';
import './feed.css';

const Feed = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="feed-container">
      <div className="feed-menu">
        <div className="header">
          {user && (
            <>
              <img className="user-photo" src={user.photoURL} alt="Foto do usuário" />
              <p className='text_name-user'>Bem-vindo, {user.displayName.split(' ')[0]}!</p>
              <Link className="logout-button" to={ROUTES.LOGIN} onClick={handleLogout}>
                Deslogar
              </Link>
            </>
          )}
        </div>
        <button
          className={activeTab === 'feed' ? 'active-tab' : ''}
          onClick={() => handleTabChange('feed')}
        >
          <FontAwesomeIcon icon={faHome} className='icons_menu' />
        </button>
        <button
          className={activeTab === 'profile' ? 'active-tab' : ''}
          onClick={() => handleTabChange('profile')}
        >
          <FontAwesomeIcon icon={faUser} className='icons_menu' />
        </button>
        <button
          className={activeTab === 'explore' ? 'active-tab' : ''}
          onClick={() => handleTabChange('explore')}
        >
          <FontAwesomeIcon icon={faCompass} className='icons_menu' />
        </button>
      </div>

      <div className='container_content'>
        {activeTab === 'feed' && (
          <div className="feed-content">
            <NewPost />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-content">
            {/* ... conteúdo do perfil ... */}
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="explore-content">
            {/* ... conteúdo de exploração ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
