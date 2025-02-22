"use client";

import { createContext, useState } from "react";

export const MainLayoutContext = createContext();

const MainLayoutContextProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <MainLayoutContext.Provider
      value={{ sidebarCollapsed, setSidebarCollapsed }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};

export default MainLayoutContextProvider;
