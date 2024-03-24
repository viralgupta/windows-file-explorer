import React, { createContext, useContext, useEffect, useState } from "react";
import { app, computer, filesystem } from "@neutralinojs/lib";

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
  getRootFolder: () => Promise<"D:/" | "/">;
  navigateToPath: (path: string, foldername: string) => void;
}

const TabStateContext = createContext<
  | {
      tabState: TabState;
      tabAction: TabActions;
    }
  | undefined
>(undefined);

interface TabStateProviderProps {
  children: React.ReactNode;
}

export const TabStateProvider: React.FC<TabStateProviderProps> = ({
  children,
}) => {
  const [rootFolder, setRootFolder] = useState<"D:/" | "/" | null>(null);
  const [tabState, setTabState] = useState<TabState>({
    focusedTab: 0,
    Tabs: [],
  });

  const closeTab = (index: number) => {
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
    if (rootFolder == null) return;
    const newData = [...tabState.Tabs];
    newData.push({
      type: rootFolder == "/" ? "root" : "folder",
      folder: rootFolder,
      location: rootFolder,
    });

    setTabState({
      focusedTab: newData.length - 1,
      Tabs: newData,
    });
  };

  const setFocusedTab = (index: number) => {
    setTabState({
      focusedTab: index,
      Tabs: tabState.Tabs,
    });
  };

  const getRootFolder: () => Promise<"D:/" | "/"> = async () => {
    let rootFolder: "D:/" | "/" = "/";
    const data = await computer.getOSInfo();
    if (data.description.includes("Windows") || data.name.includes("Windows")) {
      rootFolder = "D:/";
    } else if (data.description.includes("Mac") || data.name.includes("Mac")) {
      rootFolder = "/";
    } else if (
      data.description.includes("Linux") ||
      data.name.includes("Linux")
    ) {
      rootFolder = "/";
    }
    return rootFolder;
  };

  const navigateToPath = (path: string, foldername: string) => {
    if(path.endsWith(":")){
      path = path + "/";
    }
    const newdata = [...tabState.Tabs];
    newdata[tabState.focusedTab] = {
      location: path,
      folder: foldername,
      type: "folder",
    };
    setTabState({
      focusedTab: tabState.focusedTab,
      Tabs: newdata,
    });
  };

  useEffect(() => {
    getRootFolder().then((data) => {
      setRootFolder(data);
    });
  }, []);

  useEffect(() => {
    addTab();
  }, [rootFolder]);

  const stateAndActions = {
    tabState,
    tabAction: {
      closeTab,
      addTab,
      setFocusedTab,
      getRootFolder,
      navigateToPath
    },
  };

  return (
    <TabStateContext.Provider value={stateAndActions}>
      {children}
    </TabStateContext.Provider>
  );
};

export const useTabState = () => {
  const context = useContext(TabStateContext);
  if (!context) {
    throw new Error("useTabState must be used within a TabStateProvider");
  }
  return context;
};

export const listDirectory: (
  path: string
) => Promise<filesystem.DirectoryEntry[]> = async (path: string) => {
  const data = await filesystem.readDirectory(path);
  return data;
};
