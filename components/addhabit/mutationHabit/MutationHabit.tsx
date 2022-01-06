import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MutationField from "./MutationField";

interface MutationHabit {
  userName: string;
}

const MutationHabit = ({userName}: MutationHabit) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state

  const handleClick = () => {
    setOpen(!open);
  }; //클릭하면 밑으로 리스트를 보여줄것임
  return (
    <div className="mutationHabitWrapper">
      <List
        className="mutationHabit"
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className="mutationHabitTitle"
            primary="추가하기!!"
          />
          {/* 퍼센트를 보여줄 공간 */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="addHabitFormField">
            <MutationField userName={userName} />
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default MutationHabit;
