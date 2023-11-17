/* eslint-disable react/no-unknown-property */
import FeedComponent from '../../components/feed-component/Feed'
import NewPost from '../../components/newPost-component/NewPost';
import Profile from '../../components/profile-component/Profile';
import Footer from  '../../components/footer-component/Footer'
import './feedPage.css';


const RegisterPage = () => {
    return(
        <div className='container_Page'>
        <FeedComponent feedContent={<NewPost />} profileContent={<Profile />} />
        <Footer />
        </div>
    )
}

export default RegisterPage;