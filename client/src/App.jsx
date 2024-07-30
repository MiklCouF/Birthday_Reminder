import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import "./styles/app.css";
import "./styles/global.css";

function App() {
    const [month, setMonth] = useState(""); 
    console.log('%c⧭', 'color: #ffffff', month);
  return (
  <>
  <Header setMonth={setMonth} />
  <Outlet context={{ month, setMonth }} />
</>
);
}

export default App;

// import Header from "./components/Header";
// import Body from "./pages/Body";
// import "./styles/global.css";

// function App() {
//   const [changePage, setchangePage] = useState("page1");

//   return (
//     <>
//       <Header setchangePage={setchangePage} setMonth={setMonth} />
//       <Body changePage={changePage} month={month} />
//     </>
//   );
// }
// export default App;
