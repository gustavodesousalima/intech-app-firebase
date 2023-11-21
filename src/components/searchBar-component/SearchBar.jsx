import { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';

const SearchBar = ({ onCreateChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const UsersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const [users] = useCollectionData(UsersQuery, { idField: 'uid' });

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        
        const user = users.find((user) => user.displayName.toLowerCase() === searchTerm.toLowerCase());

        
        
        if (user) {
          onCreateChat(user);
        }

      } catch (error) {
        console.error('Erro ao pesquisar no Firestore:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do usuário"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

SearchBar.propTypes = {
  
  onCreateChat: PropTypes.func.isRequired,
};

export default SearchBar;
