import AddData from "../components/AddData";
import Calendar from "../components/Calendar";
import CardLoginSubscribe from "../components/CardLoginSubscribe";
import MonthBirthday from "../components/MonthBirthday"


function Body({ changePage }) {
 
  return changePage === "page1" ? (
    <div className="Full-body">
      <AddData />
      <MonthBirthday />
      <Calendar />
    </div>
  ) : (
    <div className="Full-body">
      <CardLoginSubscribe />
    </div>
  );
}

export default Body;
