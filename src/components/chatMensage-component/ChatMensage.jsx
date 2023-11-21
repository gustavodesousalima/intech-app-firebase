import{ useState, useEffect, useRef } from 'react';
import { db } from '../../services/firebase';
import { collection, doc, query, onSnapshot, addDoc, orderBy } from 'firebase/firestore';
import './chatMensage.css';

// eslint-disable-next-line react/prop-types
const ChatMensage = ({ chatId, usuarioLogadoId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages);
    }, (error) => {
      console.error('Erro ao buscar as mensagens:', error);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const messageData = {
        text: newMessage,
        senderId: usuarioLogadoId,
        timestamp: new Date(),
      };

      const chatRef = doc(db, 'chats', chatId);
      await addDoc(collection(chatRef, 'messages'), messageData);

      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
    }
  };

  return (
    <div className='container_Chat_Message'>
      <div className='container_Messages' ref={messagesEndRef}>
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === usuarioLogadoId ? 'messageUserLogged' : 'messageOtherUser'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className='container_NewMessage'>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatMensage;
