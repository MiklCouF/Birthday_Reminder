import { useState } from "react";
import Header from "./components/Header";
import Body from "./pages/Body";
import "./styles/global.css";
import "./styles/App.css";

function App() {
  const [Connect, setConnect] = useState("page1");

  return (
    <>
      <Header setConnect={setConnect} />
      <Body Connect={Connect} />
    </>
  );
}

export default App;
