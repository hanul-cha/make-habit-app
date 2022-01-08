import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface nodeType {
  habitId: number;
  habitWeek: number;
  habitTitle: string;
  __typename: string;
}

interface HobbiesByDayType {
  node: nodeType[];
}

const HobbiesByDay = ({ node }: HobbiesByDayType) => {
  console.log(node);

  const [open, setOpen] = React.useState(false); //클릭여부를 저장하는 state

  const runfilter = (day: number) => {
    if (node !== undefined) {
      return node.filter((i) => i.habitWeek == day);
    }
  }; //요일이 가진 번호와 취미 리스트에 요일번호와 맞는 리스트만 걸러주는 함수

  const hobbiesByDayList = [
    {
      day: "일요일",
      list: runfilter(0),
    },
    {
      day: "월요일",
      list: runfilter(1),
    },
    {
      day: "화요일",
      list: runfilter(2),
    },
    {
      day: "수요일",
      list: runfilter(3),
    },
    {
      day: "목요일",
      list: runfilter(4),
    },
    {
      day: "금요일",
      list: runfilter(5),
    },
    {
      day: "토요일",
      list: runfilter(6),
    },
  ]; //요일별로 들어온 요일인덱스와 runfilter함수에서 리턴한 조건에 맞는 리스트가 들어있음
  console.log(hobbiesByDayList);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const trueHeight = e.currentTarget.nextElementSibling?.firstElementChild?.clientHeight
    e.currentTarget.nextElementSibling?.animate([{ height: `${trueHeight}px` }], {
      duration: 50,
      fill: "forwards",
    });
    //animate속성에 픽셀을 지정할땐 특정한 값을 입력해줘야한다. auto안됨 그래서 inner컨테이너를 만들어 높이를 변수에
    //저장하고 그 높이로 
  }; //클릭하면 밑으로 리스트를 보여줄것임

  /* 
  habitList의 list길이를 사용하면 요일별 취미개수를 얻을수 있다 
  현재 문제는 위에 헨들클릭함수가 map으로 생성된 모든 하위태그에서 작동하기때문에 내가 직접 만들어야 할듯함...
  */

  return (
    <div className="HobbiesByDay">
      <h2>요일별 취미</h2>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <>
          {hobbiesByDayList.map((day, i) => {
            console.log(day);
            return (
              <div key={i}>
                <ListItemButton onClick={(e) => handleClick(e)}>
                  <ListItemText className="" primary={day.day} />
                  {/* 취미제목 */}
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <div className="habbieByDayCustomList">
                  <div className="customListInner">
                    <h3>내용</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </List>
    </div>
  );
};

export default HobbiesByDay;
