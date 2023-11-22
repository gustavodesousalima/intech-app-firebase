import { useState } from 'react';
import './buttonChatIsVisible.css'

const ChatButton = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const handleChatParticipant = () => {
    const containerChat = document.getElementsByClassName('chat')[0];

    if (!isChatVisible) {
      containerChat.classList.remove('chatIsVisible');
      containerChat.classList.add('chatIsNotVisible');
    } else {
      containerChat.classList.remove('chatIsNotVisible');
      containerChat.classList.add('chatIsVisible');
    }
    setIsChatVisible(!isChatVisible);
  };

  return (
    <button className='buttonIsVisible' onClick={handleChatParticipant}>
      <p>{isChatVisible ? 'Abrir chats' : 'Fechar chats'}</p>
    </button>
  );
};

export default ChatButton;