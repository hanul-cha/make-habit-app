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
}

interface DrawNodeType {
  node?: {
    checkDate?: number;
    __typename?: string;
  };
  __typename?: string;
}

const DrawingHabit = ({ e }: DrawingHabitType) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state
  const [habitCheck, setHabitCheck] = React.useState(false); //체크여부를 판단하는 state


  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = Number(year + month + day);

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
  //해당 컴포넌트에 들어온 myhabit데이터의 pk값을 대입해 habitcheck의 fk값과 대조해 데이터를 가져온다

  const habitId = e?.node?.habitId;
  /* console.log(habitId); */

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      habitId,
    },
  });

  React.useEffect(() => {
    if (!loading) {
      if (data.allHabitchecks.edges.length !== 0) {
        data.allHabitchecks.edges.map((node: DrawNodeType) => {
          if (node.node?.checkDate == 20220101) {
            //오늘날자가 들어가야함 today이거
            setHabitCheck(true);
          } else {
            /* setHabitCheck(false); */
          }
        });
      }
    }
  });
  /* 
  이로직은 처음 실행되고나서 쿼리로딩이 끝나면
  조건에 맞는 데이터가 있다면 체크 표시를 해주는 로직임
  */

  const handleClick = () => {
    setOpen(!open);
  }; //클릭하면 밑으로 리스트를 보여줄것임

  const runCheck = (
    checkE: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    checkE.stopPropagation();

    if (habitCheck == false) {
      if (!loading) {
        console.log("저장된 체크리스트가 없습니다");
        //알럿을 올려두고 오케이하면 뮤테이션 실행후 체크 추가
        setHabitCheck(true);
      }
    } else {
      console.log(" 이미 체크 하셨습니다 체크 해제 하시겠습니까?");
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
              <ListItemText className="drawListTitle" primary={e.node.habitTitle} />
              {/* 취미제목 */}
              <button
                className="draw_checkBTN"
                onClick={(checkE) => runCheck(checkE)}
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

이 컴포넌트의 큐테이트 아직 미완성
*/
