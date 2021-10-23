import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <AppContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </AppContext.Provider>
  );
};
