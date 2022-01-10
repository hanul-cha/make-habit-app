import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useQuery, gql, useMutation } from "@apollo/client";
import UseMutationHabitCheck from "./UseMutationHabitCheck";

interface DrawingHabitType {
  e?: {
    node?: any;
    __typename?: string;
  };
  userId: string | undefined;
}

interface DrawNodeType {
  node?: {
    checkDate?: number;
    __typename?: string;
  };
  __typename?: string;
}

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

const SET_HABITCHECK = gql`
  mutation MyMutation(
    $userId: String!
    $habitId: Int!
    $checkDate: Int!
  ) {
    createHabitcheck(
      input: {
        habitcheck: {
          checkDate: $checkDate
          habitId: $habitId
          userId: $userId
        }
      }
    ) {
      clientMutationId
    }
  }
`;

const DrawingHabit = ({ e, userId }: DrawingHabitType) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state
  const [habitCheck, setHabitCheck] = React.useState(false); //체크여부를 판단하는 state

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = 20220101 /* Number(year + month + day); */ //오늘날짜 현제는 테스트날자임

  const habitId:number|undefined = e?.node?.habitId; //해당컴포넌트에서 사용할 취미의 아이디

  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      habitId,
    },
  }); //취미의 아이디를 넣어 뽑은 체크여부리스트f를 가져오는 아폴로쿼리

  const [runHabitCheck, runHabitCheckData] = useMutation(SET_HABITCHECK, {
    onError: (error) => {
      console.log(error);
    },
  }); //취미체크를 추가할 뮤테이션 runHabitCheckData에는 데이터와 로딩이 들어가 있음

  React.useEffect(() => {
    if (!loading) {
      if (data.allHabitchecks.edges.length !== 0) {
        data.allHabitchecks.edges.map((node: DrawNodeType) => {
          if (node.node?.checkDate == today) {
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

  const checkData = {
    habitId,
    today,
    userId
  }
  console.log(checkData)

  const sendCheck = UseMutationHabitCheck(checkData)
  console.log(sendCheck)

  const handleClick = () => {
    setOpen(!open);
  }; //클릭하면 밑으로 리스트를 보여줄것임

  const runCheck = (
    checkE: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    checkE.stopPropagation();

    if (habitCheck == false) {
      //체크된게 없다면
      if (!loading) {
        const habitConfirm = confirm("정말 했나요??");
        if (habitConfirm) {
          /* console.log(today, habitId, userId); */
          runHabitCheck({
            variables: {
              userId,
              checkDate: today,
              habitId
            }
          })
          setHabitCheck(true);
        }
        //알럿을 올려두고 오케이하면 뮤테이션 실행후 체크 추가
        //여기 뮤테이션은 habitcheck뮤테이션이 들어와야한다
      }
    } else {
      //체크된게 있다면
      const habitCheckConfirm = confirm(
        "이미 체크하신 습관입니다. 해제 하시겠습니까?"
      );
      /* const checkData = {
        habitId,
        today,
        userId
      } */
      if (habitCheckConfirm) {
        /* const sendCheck = UseMutationHabitCheck(checkData)
        console.log(sendCheck) */
        setHabitCheck(false);
      }
    }
  };
  /* 
  체크된게 있다면 마운트되었을때 이미 habitCheck를 true로 바꿔줄테니 
  graphql로딩이 끝나기만 기다렸다가(체크값 반영이 완료되면) 
  체크값만 보고 실행하면된다!
  */
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
              <ListItemText
                className="drawListTitle"
                primary={e.node.habitTitle}
              />
              {/* 취미제목 */}
              <button
                className="draw_checkBTN"
                onClick={(checkE) => runCheck(checkE)}
              >
                {habitCheck ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
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

이 컴포넌트의 뮤테이트 아직 미완성
*/
