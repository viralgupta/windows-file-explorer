import { useTabState } from '../state/tab';


const FolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 64 60.001"
      className="w-5 mr-2"
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

export const PCIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 56"
      className="w-5 mr-2 fill-slate-800"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-1"
            d="M3,0H61a3,3,0,0,1,3,3V40a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V3A3,3,0,0,1,3,0Z"
          />
          <path
            className="cls-2"
            d="M0,40H64a0,0,0,0,1,0,0v5a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V40A0,0,0,0,1,0,40Z"
          />
          <rect
            className="cls-3"
            x="4"
            y="4"
            width="56"
            fill="#27b0d5"
            height="32"
          />
          <path
            className="cls-4"
            d="M32,56H19.16A1.16,1.16,0,0,1,18,54.84h0a1.16,1.16,0,0,1,.79-1.1l1-.32A10.8,10.8,0,0,0,26,48h6Z"
          />
          <path
            className="cls-4"
            d="M32,56H44.84A1.16,1.16,0,0,0,46,54.84h0a1.16,1.16,0,0,0-.79-1.1l-2-.67A10.8,10.8,0,0,1,38,49.3L37,48H32Z"
          />
          <circle className="cls-4" cx="32" cy="44" r="2" />
        </g>
      </g>
    </svg>
  );
};

const Tabs = () => {
  const { tabState, tabAction } = useTabState();

  const Tab = ({
    type,
    name,
    focused,
    pos,
    setFocus,
    closeTab,
  }: {
    type?: "root" | "folder";
    name: string;
    focused: boolean;
    pos: number;
    setFocus: (index: number) => void;
    closeTab: (index: number) => void;
  }) => {
    return (
      <div
        onClick={() => {
          setFocus(pos);
        }}
        className={`mr-0.5 cursor-default duration-300 ${
          !focused && "hover:bg-[#2c2c2c] hover:border-b-[3px] border-[#343434]"
        }
        ${
          focused ? "bg-[#2c2c2c]" : "bg-transparent"
        } w-56 rounded-t-md h-8 p-2 font-se ${
          focused && "font-semibold"
        } text-white text-xs flex`}
      >
        {type === "root" && <PCIcon />}
        {type === "folder" && <FolderIcon />}
        {name.replace(" ", "\u00A0").replace("-", "\u00A0")}
        <svg
          onClick={(e) => {
            e.stopPropagation();
            closeTab(pos);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className={`ml-auto z-20 aspect-square h-full p-0.5 fill-white opacity-30 group-hover:opacity-100 hover:bg-[#454545] rounded-sm ${
            focused ? "opacity-50" : "opacity-1000"
          }`}
        >
          <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
        </svg>
      </div>
    );
  };  

  return (
    <div className="h-full w-3/4 px-3 pt-2 flex">
      {tabState.Tabs.map((tab, index) => (
        <Tab
          closeTab={tabAction.closeTab}
          setFocus={tabAction.setFocusedTab}
          key={index}
          pos={index}
          focused={index == tabState.focusedTab ? true : false}
          name={tab.folder}
          type={tab.type == "root" ? "root" : "folder"}
        />
      ))}
      <div
        onClick={tabAction.addTab}
        className="flex items-center aspect-square"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          viewBox="0 0 512 512"
          className="h-5 fill-white hover:bg-[#2c2c2c] rounded-sm"
        >
          <path
            className="st0"
            d="M381,236H276V131c0-11-9-20-20-20s-20,9-20,20v105H131c-11,0-20,9-20,20s9,20,20,20h105v105c0,11,9,20,20,20  s20-9,20-20V276h105c11,0,20-9,20-20S392,236,381,236z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Tabs;
