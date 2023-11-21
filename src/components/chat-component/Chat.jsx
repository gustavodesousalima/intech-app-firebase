import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import SearchBar from '../searchBar-component/SearchBar';
import ChatList from '../chatList-component/ChatList';
import { db } from '../../services/firebase'; // Importe a instância do Firebase Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './chat.css'

const ChatContainer = () => {
  const [chats, setChats] = useState([]);
  const loggedUser = useAuth();

  const handleCreateChat = async (searchedUser) => {
    try {
      
      if (!loggedUser.user.uid || !searchedUser.uid || !loggedUser.user.displayName || !searchedUser.displayName || !loggedUser.user.email || !searchedUser.email) {
        
        console.error('Dados do usuário incompletos:', loggedUser, searchedUser);
        return;
      }
     
      setChats((prevChats) => [...prevChats, searchedUser]);
  
      
      const chatDocRef = await addDoc(collection(db, 'chats'), {
        participants: [loggedUser.user.uid, searchedUser.uid],
        participantsInfo: [
          { uid: loggedUser.user.uid, displayName: loggedUser.user.displayName, email: loggedUser.user.email },
          { uid: searchedUser.uid, displayName: searchedUser.displayName, email: searchedUser.email },
        ],
        createdAt: serverTimestamp(),
        
      });
  
      console.log('Chat criado com sucesso. ID:', chatDocRef.id);
    } catch (error) {
      console.error('Erro ao criar chat:', error);
    }
  };

  console.log(chats);
  console.log(loggedUser);

  return (
    <div className='container_Chat'>
     
      <SearchBar onCreateChat={handleCreateChat} />

      
      {loggedUser && (
        <div className='container_Chat'>
          <h3>Chats:</h3>
         
          <ChatList usuarioLogadoId={loggedUser.user.uid} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
