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
import { useQuery, gql } from "@apollo/client";

interface DrawingHabitType {
  e?: {
    node?: any;
    __typename?: string;
  };
  userId: string | undefined;
}

const DrawingHabit = ({ e, userId }: DrawingHabitType) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state
  const [habitCheck, setHabitCheck] = React.useState(false); //체크여부를 판단하는 state

  const GET_USER_INFO = gql`
    query MyQuery($habitId: Int!) {
      allHabitchecks(condition: { habitId: $habitId }) {
        edges {
          node {
            checkDate
          }
        }
      }
    }
  `;

  /* 
  """ query MyQuery($userId: String!, $habitId: Int!) {
      userByUserId(userId: $userId) {
        habitchecksByUserId(condition: { habitId: $habitId }) {
          edges {
            node {
              checkDate
              habitId
            }
          }
        }
      }
    } """
  */

  const habitId = e?.node?.habitId;
  /* console.log(habitId); */

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      habitId,
    },
  });

  React.useEffect(() => {
    if (!loading) {
      console.log(data);
      //데이터가 있으면서 오늘날자랑 맞았을때 state를 변화 시켜야함
    }
  });

  const handleClick = () => {
    setOpen(!open);
  }; //클릭하면 밑으로 리스트를 보여줄것임

  const test = (checkE: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    checkE.stopPropagation();
    if (habitCheck == false) {
      setHabitCheck(true);
    }
  };
  /* console.log(e); */
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
