import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

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

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = Number(year + month + day);
  //오늘날짜

  const lastWeek = (plus: number) => {
    const lastWeekDate = new Date("2022-01-01"); //테스트를 위한 날짜
    const getDay = lastWeekDate.getDay();
    const newDate =
      lastWeekDate.getDate() - getDay + (getDay == 0 ? -6 : 1) - 7 + plus;
    /* 
    로직풀이 : 오늘 날자에 요일인덱스에 오늘날자를 빼고 일요일일때를 빼고 전부 
    월요일인덱스(1)로 빼주면 이번주 월요일을 얻을수 있음 거기서 일주일을 빼면
    오늘날짜의 저번주 월요일을 얻을수 있다 plus의경우 일주일 간격을 보기위해 넣어주었음
    */
    const lastDate = new Date(lastWeekDate.setDate(newDate));
    const newYear = lastDate.getFullYear();
    const newMonth = ("0" + (1 + lastDate.getMonth())).slice(-2);
    const newDay = ("0" + lastDate.getDate()).slice(-2);
    const lastWeekDay = Number(newYear + newMonth + newDay);
    return lastWeekDay;
  }; //저번주 월요일날짜

  const myLastWeekList = habitCheckList.filter(
    (node) =>
      node.checkDate &&
      node.checkDate >= lastWeek(0) &&
      node.checkDate < lastWeek(7)
  ); //저번주 월요일부터 일요일까지의 기록들로 걸러주는 필터함수

  return (
    <div className="lastWeek">
      <h2>저번주 달성률</h2>
      <List
        className="lastWeekList"
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className="lastWeekSubTitle"
            primary={
              (myLastWeekList.length / myHabitList.length) * 100 +
              "%" +
              " 달성하셨어요!"
            }
          />
          {/* 퍼센트를 보여줄 공간 */}
          {open ? <ExpandLess /> : "자세히보기"}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>
            <div className="drawingLastWeekSlide">
              <h3>저번주에 해야했던 습관</h3>
              <div className="lastWeekTableHeader">
                <h4>제목</h4>
                <p>달성유무</p>
              </div>
              <div className="lastWeekUL">
                {myHabitList.map((list, i) => {
                  let weekListChecker = false;
                  myLastWeekList.map((nodes) => {
                    if (nodes.myhabitByHabitId?.habitId == list.habitId) {
                      weekListChecker = true;
                    }
                  });
                  /* 
                  기본적으론 false를 가지고 있는 변수에 map함수를 돌려 값이 맞는게 있다면 
                  true로 바꿔주었음 상위 map에서 다시 false로 이기 시작될것이기 때문에 이렇게 작동할수 있음
                   */
                  return (
                    <div className="lastWeekListLI" key={i}>
                      <h4>{list.habitTitle}</h4>
                      {weekListChecker ? (
                        <p>
                          <SentimentVerySatisfiedIcon />
                          <span>하셨군요!!</span>
                        </p>
                      ) : (
                        <p>
                          <SentimentSatisfiedIcon />
                          <span>다음엔 꼭!!</span>
                        </p>
                      )}
                    </div>
                  );
                })}
                {/* map끝 */}
              </div>
            </div>
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default DrawingLastWeek;

/* 
다른 요일로 테스트 해봐야함 (중요!)
*/

/* 
다른 컴포넌트와 다르게 최대한 useState를 안쓰려 노력했음
너무 많은 리렌더링은 개인적인 생각이지만 당연히 안좋을거같았다.
*/
