import { useState } from "react";
import Header from "./components/Header";
import Body from "./pages/Body";
import "./styles/global.css";
import "./styles/App.css";

function App() {
  const [changePage, setchangePage] = useState("page1");

  return (
    <>
      <Header setchangePage={setchangePage} />
      <Body changePage={changePage} />
    </>
  );
}

export default App;
