import { events } from "@neutralinojs/lib";
import Tabs from "./tabs";
import TopR from "./topr_icons";
import { useState } from "react";

const Header = () => {
  const [focused, setFocused] = useState(true)
  
  events.on("windowFocus", () => {
    setFocused(true);
  });
  events.on("windowBlur", () => {
    setFocused(false);
  });
  return (
    <div className={`h-10 ${!focused ? "bg-[#202020]" : "bg-[#000000]"} duration-500 bg-opacity-90`}>
      <TopR />
      <Tabs />
    </div>
  );
};

export default Header;
