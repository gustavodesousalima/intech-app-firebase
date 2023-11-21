import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import FeedComponent from '../../components/feed-component/Feed';
import NewPost from '../../components/newPost-component/NewPost';
import Profile from '../../components/profile-component/Profile';
import Chat from '../../components/chat-component/Chat';
import Footer from '../../components/footer-component/Footer';
import './feedPage.css';

const FeedPage = () => {
    const [user] = useAuthState(auth);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (user === null) {

            navigateTo('/');
        }
    }, [user, navigateTo]);

    return (
        <div className='container_Page'>
            <FeedComponent feedContent={<NewPost />} profileContent={<Profile />} chatContent={<Chat />} />
            <Footer />
        </div>
    );
};

export default FeedPage;
