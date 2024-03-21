import { window as NWindow, app as NApp, events } from "@neutralinojs/lib";
import { useState } from "react";

const TopR = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [focused, setFocused] = useState(true);

  const toggleFullScreen = async () => {
    const isMaximized = await NWindow.isMaximized();
    if (isMaximized) {
      await NWindow.unmaximize();
      setFullScreen(false);
    } else {
      await NWindow.maximize();
      setFullScreen(true);
    }
  };

  events.on("windowFocus", () => {
    setFocused(true);
  });
  events.on("windowBlur", () => {
    setFocused(false);
  });

  return (
    <div className="fixed top-0 right-0 flex z-10">
      <button
        onClick={NWindow.minimize}
        className="px-4 py-1 hover:bg-[#272727] group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          focusable="false"
          viewBox="0 0 12 12"
        >
          <path
            className={`stroke-white opacity-50 group-hover:opacity-100 ${
              focused ? "opacity-100" : "opacity-50"
            }`}
            strokeLinecap="round"
            d="M3 6.5h6"
          />
        </svg>
      </button>
      <button
        onClick={toggleFullScreen}
        className="px-3 py-1 hover:bg-[#272727] group"
      >
        {fullScreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="20"
            height="20"
            viewBox="0 0 256 256"
          >
            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path
                className={`fill-white opacity-50 group-hover:opacity-100 ${
                  focused ? "opacity-100" : "opacity-50"
                }`}
                d="M 56.27 67.5 H 24.5 c -1.104 0 -2 -0.896 -2 -2 V 33.73 c 0 -1.104 0.896 -2 2 -2 h 31.77 c 1.104 0 2 0.896 2 2 V 65.5 C 58.27 66.604 57.374 67.5 56.27 67.5 z M 26.5 63.5 h 27.77 V 35.73 H 26.5 V 63.5 z"
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                className={`fill-white opacity-50 group-hover:opacity-100 ${
                  focused ? "opacity-100" : "opacity-50"
                }`}
                d="M 65.5 58.27 c -1.104 0 -2 -0.896 -2 -2 V 26.5 H 33.73 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 H 65.5 c 1.104 0 2 0.896 2 2 v 31.77 C 67.5 57.374 66.604 58.27 65.5 58.27 z"
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
            </g>
          </svg>
        ) : (
          <svg
            version="1.1"
            id="Capa_1"
            width="10"
            height="10"
            viewBox="0 0 611.965 611.965"
            className={`fill-white opacity-50 mx-1.5 group-hover:opacity-100 ${
              focused ? "opacity-100" : "opacity-50"
            }`}
          >
            <g>
              <path d="M544.446,611.965H67.519C30.29,611.965,0,581.675,0,544.446V67.519C0,30.29,30.29,0,67.519,0h476.928   c37.229,0,67.519,30.29,67.519,67.519v476.928C612,581.675,581.71,611.965,544.446,611.965z M67.519,35.221   c-17.787,0-32.297,14.476-32.297,32.297v476.928c0,17.821,14.511,32.298,32.297,32.298h476.928   c17.821,0,32.298-14.477,32.298-32.298V67.519c0.035-17.822-14.477-32.297-32.298-32.297H67.519z" />
            </g>
          </svg>
        )}
      </button>
      <button
        onClick={() => {
          NApp.exit();
        }}
        className="px-4 py-1 group hover:bg-red-600 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          version="1.1"
          width={15}
          className={`aspect-square fill-white opacity-30 group-hover:opacity-100 ${
            focused ? "opacity-100" : "opacity-50"
          }`}
        >
          <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
        </svg>
      </button>
    </div>
  );
};

export default TopR;
