import React, { createContext, useContext, useEffect, useState } from "react";
import { app, computer, events, filesystem, os } from "@neutralinojs/lib";
import { toast } from "sonner";

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
  openFile: (path: string) => void;
  SearchFolder: (
    name: string,
    path: string
  ) => Promise<
    {
      path: string;
      name: string;
    }[]
  >;
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
    console.log(path, foldername);
    if (path.endsWith(":")) {
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
    filesystem
      .getWatchers()
      .then((watchers) => {
        watchers.forEach((watcher) => {
          filesystem.removeWatcher(watcher.id);
        });
      })
      .then(() => {
        filesystem.createWatcher(path);
      });
  };

  const openFile = async (path: string) => {
    try {
      if (path.endsWith(".pdf")) {
      } else {
        toast.error("Pdf files are only supported for now.");
        os.showNotification(
          "Not Supported!",
          "Pdf files are only supported for now."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SearchFolder: (
    name: string,
    path: string
  ) => Promise<
    {
      path: string;
      name: string;
    }[]
  > = (name: string, path: string) => {
    return new Promise((resolve, reject) => {
      let command: string = "";
      getRootFolder()
        .then((data) => {
          if (data == "/") {
            command = `find ${path.replace(" ", "\ ")} -type f -iname "${name}*"`;
          } else {
            command = `powershell.exe -Command "Get-ChildItem -Path '${path}' -Recurse | Where-Object { $_.Name -like '${name}*' }"`;
          }

          os.execCommand(command)
            .then((result) => {
              let finalresult: { path: string; name: string }[] = [];
              if (data == "D:/") {
                finalresult = parseDirectoryListingForWindows(
                  result.stdOut.toString()
                );
              } else {
                finalresult = parseDirectoryListingForUnix(
                  result.stdOut.toString()
                );
              }
              resolve(finalresult);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
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

  let debouncePromise: Promise<void> | null = null;

  events.on("watchFile", () => {
    if (debouncePromise !== null) {
      return;
    }

    debouncePromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        debouncePromise = null;
      }, 1000);
    });

    debouncePromise.then(() => {
      setTabState({
        focusedTab: tabState.focusedTab,
        Tabs: tabState.Tabs,
      });
    });
  });

  const stateAndActions = {
    tabState,
    tabAction: {
      closeTab,
      addTab,
      setFocusedTab,
      getRootFolder,
      navigateToPath,
      openFile,
      SearchFolder,
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

function parseDirectoryListingForWindows(directoryListing: string) {
  const lines = directoryListing
    .split("\n")
    .filter((line) => line.trim() !== "");

  const files: { path: string; name: string }[] = [];
  let currentDirectory = "";

  lines.forEach((line) => {
    const parts = line.trim().split(/\s{2,}/);

    if (parts.length === 1 && parts[0].startsWith("Directory:")) {
      currentDirectory = parts[0].replace("Directory:", "").trim();
    } else if (parts.length >= 4 && parts[3] !== "") {
      const filePath = `${currentDirectory}`;
      files.push({
        name: parts[3].includes(" ")
          ? parts[3].slice(parts[3].indexOf(" ")).trim()
          : parts[3].trim(),
        path: filePath.replace(/\\/g, "/") + "/"
      });
    }
  });

  return files;
}

function parseDirectoryListingForUnix(directoryListing: string) {
  const files: { path: string; name: string }[] = [];
  directoryListing.split("\n").forEach((line) => {
    files.push({
      name: line.slice(line.lastIndexOf("/") + 1),
      path: line.slice(0, line.lastIndexOf("/") + 1),
    });
  });
  return files;
}
