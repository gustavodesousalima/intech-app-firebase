import { useState } from 'react';
import './buttonChatIsVisible.css'

const ChatButton = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const handleChatParticipant = () => {
    const containerChat = document.getElementsByClassName('chat')[0];

    if (!isChatVisible) {
      containerChat.classList.remove('chatIsNotVisible');
      containerChat.classList.add('chatIsVisible');
    } else {
      containerChat.classList.remove('chatIsVisible');
      containerChat.classList.add('chatIsNotVisible');
    }
    setIsChatVisible(!isChatVisible);
  };

  return (
    <button className='buttonIsVisible' onClick={handleChatParticipant}>
      <p>{isChatVisible ? 'Fechar chats' : 'Abrir chats'}</p>
    </button>
  );
};

export default ChatButton;