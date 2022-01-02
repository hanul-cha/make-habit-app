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
  habitText?: string;
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
    const lastWeekDate = new Date("2022-01-02");
    console.log(lastWeekDate.getDate());
    const getDay = lastWeekDate.getDay();
    const newDate = lastWeekDate.getDate() - getDay + (getDay == 0 ? -6 : 1) -7;
    
    const lastDate = new Date(lastWeekDate.setDate(newDate));
    const newYear = lastDate.getFullYear();
    const newMonth = ("0" + (1 + lastDate.getMonth())).slice(-2);
    const newDay = ("0" + lastDate.getDate()).slice(-2);
    const lastWeekDay = Number(newYear + newMonth + newDay);
    console.log(lastWeekDay);
    return lastWeekDay;
  }; //저번주 월요일날짜

  lastWeek();

  const myLastWeekList = habitCheckList.filter((node) => node.checkDate);

  return (
    <div className="lastWeek">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="아몰랑" />
          {/* 취미제목 */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>dkah</div>
        </Collapse>
      </List>
    </div>
  );
};

export default DrawingLastWeek;
