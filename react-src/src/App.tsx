import Footer from "./components/footer";
import Header from "./components/header";
import Search_Bar from "./components/search-bar";
import { TabStateProvider } from "./state/tab";

export function App() {
  return (
    <div>
      <TabStateProvider>
        <Header />
        <Search_Bar />
        <Footer />
      </TabStateProvider>
    </div>
  );
}
