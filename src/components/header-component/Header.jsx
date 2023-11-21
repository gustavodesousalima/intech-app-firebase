import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCompass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';  
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/authContext';
import './header.css';

const Header = ({ activeTab, onTabChange }) => {
    const { user, signOut } = useAuth();

    const handleLogout = () => {
        signOut();
    };

    return (
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
                onClick={() => onTabChange('feed')}
            >
                <FontAwesomeIcon className='icons_menu' icon={faHome} />
            </button>

            <button
                className={activeTab === 'profile' ? 'active-tab' : ''}
                onClick={() => onTabChange('profile')}
            >
                <FontAwesomeIcon className='icons_menu' icon={faUser} />
            </button>

            <button
                className={activeTab === 'explore' ? 'active-tab' : ''}
                onClick={() => onTabChange('explore')}
            >
                <FontAwesomeIcon className='icons_menu' icon={faCompass} />
            </button>
        </div>
    );
};

Header.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};

export default Header;
