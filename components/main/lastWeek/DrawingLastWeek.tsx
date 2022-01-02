import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import BatteryCharging20Icon from "@mui/icons-material/BatteryCharging20";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";

interface myHabitListType {
  habitId?: number;
  habitTitle?: string;
  __typename?: string;
}

interface habitCheckType {
  checkDate?: number;
  myhabitByHabitId?: {
    habitId: number;
    __typename?: string;
  };
  __typename?: string;
}

interface DrawingLastWeekTypeProps {
  myHabitList: myHabitListType[];
  habitCheckList: habitCheckType[];
}

const DrawingLastWeek = ({
  myHabitList,
  habitCheckList,
}: DrawingLastWeekTypeProps) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state

  const handleClick = () => {
    setOpen(!open);
  }; //클릭하면 밑으로 리스트를 보여줄것임

  console.log(myHabitList, habitCheckList);

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = Number(year + month + day);
  //오늘날짜

  const lastWeek = () => {
    const lastWeekDate = new Date("2022-01-01");
    const getDay = lastWeekDate.getDay();
    const newDate =
      lastWeekDate.getDate() - getDay + (getDay == 0 ? -6 : 1) - 7;
    const lastDate = new Date(lastWeekDate.setDate(newDate));
    const newYear = lastDate.getFullYear();
    const newMonth = ("0" + (1 + lastDate.getMonth())).slice(-2);
    const newDay = ("0" + lastDate.getDate()).slice(-2);
    const lastWeekDay = Number(newYear + newMonth + newDay);
    console.log(lastWeekDay);
    return lastWeekDay;
  }; //저번주 월요일날짜

  lastWeek();

  const myLastWeekList = habitCheckList.filter(
    (node) =>
      node.checkDate &&
      node.checkDate >= lastWeek() &&
      node.checkDate < lastWeek() + 7
  ); //저번주 월요일부터 일요일까지의 기록들

  console.log(myLastWeekList);

  return (
    <div className="lastWeek">
      <h2>저번주 달성률</h2>
      <List
        className="lastWeelList"
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primary={(myLastWeekList.length / myHabitList.length) * 100 + "%"}
          />
          {/* 퍼센트를 보여줄 공간 */}
          {open ? <ExpandLess /> : "자세히보기"}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>
            <div>
              <h3>저번주에 해야했던 습관</h3>
              {myHabitList.map((list, i) => {
                return (
                  <div key={i}>
                    <h4>{list.habitTitle}</h4>
                    {}
                  </div>
                );
              })}
            </div>
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default DrawingLastWeek;

/* 
list.habitId == weekList.myhabitByHabitId?.habitId이걸 이용한 for문을 전개하자
다른 요일로 테스트 해봐야함
*/