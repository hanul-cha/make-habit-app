import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useQuery, gql, useMutation, useReactiveVar } from "@apollo/client";
import UseMutationHabitCheck from "./UseMutationHabitCheck";
import { useRouter } from "next/router";
import { setMainLoadding } from "../../../src/store/apply";
import UseGraphqlGetCheckData from "../../customhooks/UseGraphqlGetCheckData";
import GetHabitCheckData from "./GetHabitCheckData";

interface DrawingHabitType {
  e?: {
    node?: any;
    __typename?: string;
  };
  userId: string | undefined;
  setToDayLoading: (a: boolean) => void;
}
//해당 컴포넌트에 들어온 myhabit데이터의 pk값을 대입해 habitcheck의 fk값과 대조해 데이터를 가져온다

interface nodeType {
  node: {
    __typename: string;
    checkDate: number;
  };
}

const SET_HABITCHECK = gql`
  mutation MyMutation($userId: String!, $habitId: Int!, $checkDate: Int!) {
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

const DrawingHabit = ({ e, userId, setToDayLoading }: DrawingHabitType) => {
  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state
  const [habitCheck, setHabitCheck] = React.useState(false); //체크여부를 판단하는 state
  const [drawingQueryData, setdrawingQueryData] = React.useState<nodeType[]>();
  const [resetQueryData, setresetQueryData] = React.useState(false);

  const route = useRouter();

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = /* 20220101; */ Number(year + month + day); //오늘날짜 현재는 테스트날자임

  const habitId: number | undefined = e?.node?.habitId; //해당컴포넌트에서 사용할 취미의 아이디

  const { loading, data } = UseGraphqlGetCheckData(habitId); //취미의 아이디를 넣어 뽑은 체크여부리스트를 가져오는 아폴로쿼리

  const [runHabitCheck, runHabitCheckData] = useMutation(SET_HABITCHECK, {
    onError: (error) => {
      console.log(error);
    },
  }); //취미체크를 추가할 뮤테이션 runHabitCheckData에는 데이터와 로딩이 들어가 있음

  React.useEffect(() => {
    /* console.log(runHabitCheckData.data)
    console.log(runDeleteCheckReturnData?.data) */

    if (runHabitCheckData.data) {
      /* setresetQueryData(true); */
      runHabitCheckData.reset()
      route.push('/')
    }
    if (runDeleteCheckReturnData?.data) {
      /* setresetQueryData(true); */
      runDeleteCheckReturnData.reset()
      route.push('/')
    }

    if (!loading) {
      setdrawingQueryData(data.allHabitchecks.edges);

      if (drawingQueryData && drawingQueryData?.length !== 0) {
        for (let i = 0; i < drawingQueryData.length; i++) {
          if (drawingQueryData[i].node.checkDate == today) {
            setHabitCheck(true);
            break;
          } else {
            setHabitCheck(false);
          }
        }
      } else {
        setHabitCheck(false);
      }

      setToDayLoading(true);
      /* console.log(drawingQueryData); */
    }
  }); //이로직은 처음 실행되고나서 쿼리로딩이 끝나면 조건에 맞는 데이터가 있다면 체크 표시를 해주는 로직임

  React.useEffect(() => {
    return () => {
      setToDayLoading(false);
      setresetQueryData(false);
    };
  }, []); //클린업

  const checkData = {
    habitId,
    today,
    userId,
  };

  const sendCheck = UseMutationHabitCheck(checkData); //쿼리, 뮤테이션이 있는 커스텀훅
  const runDeleteCheck = sendCheck?.runDeleteCheck; //뮤테이션의 액션함수
  const runDeleteCheckDataSet = sendCheck?.dataSet;
  const runDeleteCheckReturnData = sendCheck?.returnData;

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
          runHabitCheck({
            variables: {
              userId,
              checkDate: today,
              habitId,
            },
          });
          /* route.push("/"); */
          /* setresetQueryData(true) */
        }
      }
    } else {
      //체크된게 있다면
      if (!loading) {
        const habitCheckConfirm = confirm(
          "이미 체크하신 습관입니다. 해제 하시겠습니까?"
        );
        if (habitCheckConfirm) {
          if (runDeleteCheck) {
            runDeleteCheck({
              variables: {
                checkId: runDeleteCheckDataSet,
              },
            });
            /* route.push("/"); */
            /* setresetQueryData(true) */
          }
        }
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

      {resetQueryData && habitId && (
        <GetHabitCheckData
          setdrawingQueryData={setdrawingQueryData}
          setresetQueryData={setresetQueryData}
          habitId={habitId}
        />
      )}
    </>
  );
};

export default DrawingHabit;

/* 
state에 값들을 넣어줄것임 쿼리데이터를 넣어서 관리할것임
처음 마운트되고 얻은 데이터를 state에 넣고 이후 체크버튼을 누르게 되면
해당 뮤테이션 실행함수를 호출해 쿼리를 날리고 데이터를 받아 다시 state에
할당하면 그 state에 대한 값으로 뮤테이션을 보낼수 있을것으로 기대됨
*/
