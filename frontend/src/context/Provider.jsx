import { useState } from 'react';

import AppContext from './AppContext';

function Provider({ children }) {

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState([]);
  const [logado, setLogado] = useState('')

  const value = {
    users,
    setUsers,
    token,
    setToken,
    logado,
    setLogado
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
