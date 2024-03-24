import { useEffect, useState } from "react";
import { listDirectory, useTabState } from "../state/tab";
import { filesystem } from "@neutralinojs/lib";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../@/shadcn-components/ui/context-menu";

export const FolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 64 60.001"
      className="w-full mb-2"
    >
      <g id="Folder">
        <g>
          <path
            fill="#f3b208"
            d="M60,4.001H24C24,1.792,22.209,0,20,0H4 C1.791,0,0,1.792,0,4.001V8v6.001v2c0,2.209,1.791,4,4,4h56c2.209,0,4-1.791,4-4V8C64,5.791,62.209,4.001,60,4.001z"
          />
        </g>
      </g>
      <g id="Folder_1_">
        <g>
          <path
            fill="#ffd45d"
            d="M60,12.001H4c-2.209,0-4,1.791-4,4v40c0,2.209,1.791,4,4,4h56c2.209,0,4-1.791,4-4v-40    C64,13.792,62.209,12.001,60,12.001z"
          />
        </g>
      </g>
    </svg>
  );
};
export const FileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-full"
    >
      <path d="M41,36H7v6c0,1.657,1.343,3,3,3h28c1.657,0,3-1.343,3-3V36z" />
      <path
        fill="#fff"
        d="M38,42H10c-1.105,0-2-0.895-2-2V4h21l11,11v25C40,41.105,39.105,42,38,42z"
      />
      <path d="M38,43H10c-1.654,0-3-1.346-3-3V4c0-0.552,0.447-1,1-1h21c0.266,0,0.52,0.105,0.707,0.293l11,11 C40.895,14.48,41,14.735,41,15v25C41,41.654,39.654,43,38,43z M9,5v35c0,0.551,0.448,1,1,1h28c0.552,0,1-0.449,1-1V15.414L28.586,5 H9z" />
      <path d="M40,16H29c-0.553,0-1-0.448-1-1V4c0-0.552,0.447-1,1-1s1,0.448,1,1v10h10c0.553,0,1,0.448,1,1S40.553,16,40,16z" />
    </svg>
  );
};

const Body = () => {
  const { tabState, tabAction } = useTabState();
  const [contents, setContents] = useState<filesystem.DirectoryEntry[] | null>(
    null
  );

  useEffect(() => {
    if (tabState.Tabs.length > 0) {
      listDirectory(tabState.Tabs[tabState.focusedTab].location).then(
        (data) => {
          setContents(data);
        }
      );
    }
  }, [tabState]);

  return (
    <div className="w-full h-full text-xs flex flex-wrap overflow-y-scroll hide-scroll">
      {!!contents &&
        contents.map((item, index) => {
          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger>
                <div
                  style={{ fontSize: "10px", lineHeight: "1rem" }}
                  key={index}
                  tabIndex={0}
                  onDoubleClick={() => {
                    if (item.type === "DIRECTORY") {
                      tabAction.navigateToPath(item.path, item.entry);
                    }
                    else{
                      tabAction.openFile(item.path);
                    }
                  }}
                  className="p-2 h-[88px] w-[72px] bg-white bg-opacity-0 hover:bg-opacity-20 hover:cursor-pointer focus:bg-opacity-40 focus:outline-none flex flex-col items-center justify-center"
                >
                  {item.type === "DIRECTORY" ? <FolderIcon /> : <FileIcon />}
                  <div className="overflow-hidden w-full text-center">
                    {item.entry.length > 11
                      ? item.entry.replace(" ", "\u00A0").replace("-", "\u00A0").slice(0, 10)
                      : item.entry}
                    {item.entry.length > 11 && "..."}
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
    </div>
  );
};

export default Body;
