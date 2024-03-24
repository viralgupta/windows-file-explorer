import { Toaster } from "sonner";
import SideBar from "./components/SideBar";
import Body from "./components/body";
import Footer from "./components/footer";
import Header from "./components/header";
import Search_Bar from "./components/search-bar";
import { TabStateProvider } from "./state/tab";

export function App() {
  return (
    <div className="w-screen h-screen">
      <Toaster duration={2000} theme="dark" />
      <TabStateProvider>
        <Header />
        <Search_Bar />
        <div className="w-full h-full bg-[#191919] flex">
          <div className="min-w-[180px] border-r h-full border-[#454545] p-1">
            <SideBar />
          </div>
          <div className="p-6 text-white ">
            <Body />
          </div>
        </div>
        <Footer />
      </TabStateProvider>
    </div>
  );
}
