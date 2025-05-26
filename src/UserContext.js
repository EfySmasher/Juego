import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null); // Aquí guardamos cat1 o cat2

  return (
    <UserContext.Provider value={{ user, setUser, selectedCat, setSelectedCat }}>
      {children}
    </UserContext.Provider>
  );
};
