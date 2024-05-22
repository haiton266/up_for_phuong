import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
    const [userData,setUserData] =useState({});
    const [isCartChange, setIsCartChange] = useState(false);
    return (
    <AppContext.Provider value={{ isCartChange, setIsCartChange}}>
      {children}
    </AppContext.Provider>
  );
};
