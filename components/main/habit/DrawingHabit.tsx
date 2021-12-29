import * as React from "react";
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

interface DrawingHabitType {
  e?: {
    node?: any;
    __typename?: string;
  };
}

const DrawingHabit = ({ e }: DrawingHabitType) => {
  const [open, setOpen] = React.useState(false);
  const [habitCheck, setHabitCheck] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const test = (checkE: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    checkE.stopPropagation();
    if (habitCheck == false) {
      setHabitCheck(true);
    }
  };
  console.log(e);
  return (
    <>
      {e && (
        <div className="drawDiv">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={e.node.habitTitle} />
              {/* 취미제목 */}
              <button
                className="draw_checkBTN"
                onClick={(checkE) => test(checkE)}
              >
                {habitCheck ? (
                  <BatteryChargingFullIcon />
                ) : (
                  <BatteryCharging20Icon />
                )}
                {/* 체크여부에 따라 다른 아이콘을 노출 시킬것임 */}
              </button>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={e.node.habitText} />
                  {/* 텍스트부분 */}
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
      )}
    </>
  );
};

export default DrawingHabit;

/* 
오늘 할일이 있다면 그려줄 컴포넌트
*/
