import { useState } from "react";
import AddData from "../components/AddData";
// import Calendar from "../components/Calendar";
import CardLoginSubscribe from "../components/CardLoginSubscribe";
import MonthBirthday from "../components/MonthBirthday"


function Body({ changePage, month }) {


  return changePage === "page1" ? (
    <body>
      <AddData />
      <MonthBirthday month={month} />
      {/* <Calendar /> */}
      </body>
  ) : (
    <body>
      <CardLoginSubscribe />
      </body>

  );
}

export default Body;
