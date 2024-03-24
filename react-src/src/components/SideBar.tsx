import { useEffect, useState } from "react";
import { listDirectory, useTabState } from "../state/tab";
import { filesystem } from "@neutralinojs/lib";

const Chevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-4 h-4 mr-2 stroke-[#a0a0a0] fill-[#a0a0a0] hover:fill-black hover:stroke-black"
    >
      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
    </svg>
  );
};

const FolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 64 60.001"
      className="min-w-4 max-w-4 min-h-4 flex items-center mr-1"
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

const FileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="min-w-4 max-w-4"
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

const Folder = ({
  path,
  type,
  name,
}: {
  path: string;
  type: "DIRECTORY" | string;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const [list, setlist] = useState<filesystem.DirectoryEntry[] | null>(null);

  const { tabAction } = useTabState();

  useEffect(() => {
    if (open) {
      listDirectory(path).then((data) => {
        setlist(data);
      });
    }
  }, [open]);

  return (
    <div>
      <div onClick={()=>{setOpen((o)=>!o)}} className="w-full bg-white min-h-7 max-h-7 flex items-center px-2 bg-opacity-0 hover:bg-opacity-40 text-white text-sm">
        {type == "DIRECTORY" && <Chevron />}
        <div onClick={(e)=>{e.stopPropagation(); tabAction.navigateToPath(path, name) }} className="flex cursor-pointer">
          {type === "DIRECTORY" ? <FolderIcon /> : <FileIcon />}
          {name.slice(0, 12)}
          {name.length > 12 && "..."}
        </div>
      </div>
      <div>
        {open &&
          list &&
          list.map((item, index) => {
            return (
              <div className="pl-2" key={index}>
                <Folder path={item.path} name={item.entry} type={item.type} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const SideBar = () => {
  const [path, setPast] = useState<string | null>(null);

  const { tabAction } = useTabState();

  useEffect(() => {
    tabAction.getRootFolder().then((rootFolder) => {
      setPast(rootFolder);
    });
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll hide-scroll">
      {path && <Folder path={path} name={path} type="DIRECTORY" />}
    </div>
  );
};

export default SideBar;
