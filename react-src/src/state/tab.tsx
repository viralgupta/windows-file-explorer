import React, { createContext, useContext, useState } from 'react';
import { app } from "@neutralinojs/lib";
import { useEffect } from "react";


interface TabState {
  focusedTab: number;
  Tabs: {
    type?: "root" | "folder";
    folder: string;
    location: string;
  }[];
}

interface TabActions {
  closeTab: (index: number) => void;
  addTab: () => void;
  setFocusedTab: (index: number) => void;
}

const TabStateContext = createContext<{
  tabState: TabState;
  tabAction: TabActions;
} | undefined>(undefined);

interface TabStateProviderProps {
  children: React.ReactNode;
}


export const TabStateProvider: React.FC<TabStateProviderProps> = ({ children }) => {
  const [tabState, setTabState] = useState<TabState>({
    focusedTab: 0,
    Tabs: [
      {
        type: "root",
        folder: "This PC",
        location: "/",
      },
      {
        type: "folder",
        folder: "C:",
        location: "C:/",
      },
      {
        type: "folder",
        folder: "D:",
        location: "D:/",
      },
    ]
  });

  const closeTab = (index: number) => {
    console.log("close tab", index)
    const newData = [...tabState.Tabs];
    newData.splice(index, 1);

    setTabState({
      focusedTab: tabState.focusedTab > 0 ? tabState.focusedTab - 1 : 0,
      Tabs: newData,
    });
    

    if (newData.length === 0) {
      app.exit();
    }
  };

  const addTab = () => {
    const newData = [...tabState.Tabs];
    newData.push({
      type: 'root',
      folder: 'This PC',
      location: '/',
    });

    setTabState({
      focusedTab: newData.length - 1,
      Tabs: newData,
    });
  };

  const setFocusedTab = (index: number) => {
    console.log("focused tab", index)
    setTabState({
      focusedTab: index,
      Tabs: tabState.Tabs,
    });
  }

  const stateAndActions = {
    tabState,
    tabAction: {
      closeTab,
      addTab,
      setFocusedTab
    }
  };

  useEffect(() => {
    console.log(tabState)
  }, [tabState])

  return (
    <TabStateContext.Provider value={stateAndActions}>
      {children}
    </TabStateContext.Provider>
  );
};

export const useTabState = () => {
  const context = useContext(TabStateContext);
  if (!context) {
    throw new Error('useTabState must be used within a TabStateProvider');
  }
  return context;
};
