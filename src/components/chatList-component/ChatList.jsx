import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import ChatMensage from '../../components/chatMensage-component/ChatMensage'
import './chatList.css'

// eslint-disable-next-line react/prop-types
const ChatList = ({ usuarioLogadoId }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', usuarioLogadoId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedChats = [];
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        const otherParticipant = chatData.participantsInfo.find(participant => participant.uid !== usuarioLogadoId);

        const formattedChat = {
          id: doc.id,
          otherParticipantName: otherParticipant.displayName,

        };

        fetchedChats.push(formattedChat);
      });

      setChats(fetchedChats);
    }, (error) => {
      console.error('Erro ao buscar os chats:', error);
    });

    return () => unsubscribe();
  }, [usuarioLogadoId]);

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleElementClick = (clickedChatId) => {
    const participants = document.querySelectorAll('.participant');

    participants.forEach((participant) => {
      participant.classList.remove('clicked');
    });

    const clickedElement = document.querySelector(`.participant[data-chat-id="${clickedChatId}"]`);
    if (clickedElement) {
      clickedElement.classList.add('clicked');
    }

    handleChatClick(clickedChatId);
  };

  

  return (
    <div className='container_ChatList'>
      <div className='container_chatParticipants chat chatIsNotVisible '>
          <h3>Chats</h3>
          {chats.map((chat) => (
            <div className={`participant ${chat.id === selectedChatId ? 'clicked' : 'noClicked'}`} key={chat.id} onClick={() => { handleChatClick(chat.id); handleElementClick(chat.id) }} style={{ cursor: 'pointer' }}>
              <p>{chat.otherParticipantName}</p>
            </div>
          ))}
      
      </div>

      <div className='container_ChatMessage'>
        <h3 className='text_NotConversationSelection'>Nenhuma conversa selecionada</h3>
        {selectedChatId && (
          <>
            <ChatMensage chatId={selectedChatId} usuarioLogadoId={usuarioLogadoId} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatList;
