import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header-component/Header';
import './feed.css';

const Feed = ({ feedContent, profileContent, chatContent }) => {
  const [activeTab, setActiveTab] = useState('feed');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="feed-container">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <div className='container_content'>
        {activeTab === 'feed' && (
          <div className="feed-content">
            {feedContent}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-content">
            {profileContent}
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="explore-content">
            {chatContent}
          </div>
        )}
      </div>
    </div>
  );
};

Feed.propTypes = {
  feedContent: PropTypes.node,
  profileContent: PropTypes.node,
  chatContent: PropTypes.node,
};

export default Feed;
