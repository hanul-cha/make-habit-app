import React from 'react'
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

interface DrawingLastWeekTypeProps{
    myHabitList :{
        habitId? :number
        habitText? :string
        __typename? :string
    }
    habitCheckList :{
        checkDate? :number
        myhabitByHabitId? :{
            habitId:number
            __typename? :string
        }
        __typename? :string
    }
} 

const DrawingLastWeek = ({myHabitList, habitCheckList}:DrawingLastWeekTypeProps) => {
    const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state


    const handleClick = () => {
        setOpen(!open);
      }; //클릭하면 밑으로 리스트를 보여줄것임

    console.log(myHabitList, habitCheckList)
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
    )
}

export default DrawingLastWeek
