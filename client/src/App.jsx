import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./styles/app.css";
import "./styles/global.css";

function App() {
  return (
  <>
  <Header />
  <Outlet />
</>
);
}

export default App;

// import { useState } from "react";
// import Header from "./components/Header";
// import Body from "./pages/Body";
// import "./styles/global.css";

// function App() {
//   const [changePage, setchangePage] = useState("page1");
//   const [month, setMonth] = useState("");

//   return (
//     <>
//       <Header setchangePage={setchangePage} setMonth={setMonth} />
//       <Body changePage={changePage} month={month} />
//     </>
//   );
// }
// export default App;
