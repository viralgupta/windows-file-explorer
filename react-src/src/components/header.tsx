import { events } from "@neutralinojs/lib";
// import { window as NWindow } from "@neutralinojs/lib";
import Tabs from "./tabs";
import TopR from "./topr_icons";
import { useState } from "react";
// import { useEffet } from "react";

const Header = () => {
  const [focused, setFocused] = useState(true);
  // const [draggable, setDraggable] = useState(false);

  events.on("windowFocus", () => {
    setFocused(true);
  });
  events.on("windowBlur", () => {
    setFocused(false);
  });

  // const setDraggableRegion = () => {
  //   NWindow.setDraggableRegion("draggable").then(() => {
  //     console.log("draggable region set");
  //   });
  // };

  // const removeDraggable = () => {
  //   NWindow.unsetDraggableRegion("draggable").then(() => {
  //     console.log("draggable region removed");
  //   });
  // };


  // useEffect(() => {
  //   setDraggableRegion();
  // }, []);

  return (
    <div
      id="draggable"
      // onMouseEnter={setDraggableRegion}
      // onMouseLeave={removeDraggable}
      className={`h-10 ${
        !focused ? "bg-[#202020]" : "bg-[#000000]"
      } duration-500 bg-opacity-90`}
    >
      <TopR />
      <Tabs />
    </div>
  );
};

export default Header;
