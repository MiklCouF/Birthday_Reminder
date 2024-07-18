import { useState } from "react";
import AddData from "../components/AddData";
import Calendar from "../components/Calendar";
import CardLoginSubscribe from "../components/CardLoginSubscribe";
import MonthBirthday from "../components/MonthBirthday"


function Body({ changePage, month }) {


  return changePage === "page1" ? (
    <div className="Full-body">
      <AddData />
      <MonthBirthday month={month} />
      <Calendar />
    </div>
  ) : (
    <div className="Full-body">
      <CardLoginSubscribe />
    </div>
  );
}

export default Body;
