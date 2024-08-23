import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import "./styles/app.css";
import "./styles/global.css";

function App() {
  const [month, setMonth] = useState("");
  return (
    <>
      <Header setMonth={setMonth} />
      <Outlet context={{ month, setMonth }} />
    </>
  );
}

export default App;
