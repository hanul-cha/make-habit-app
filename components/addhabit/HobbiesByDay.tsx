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

  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      
    console.log(e.currentTarget.nextSibling)//일단은 이게 다음 컨텐츠를 선택하는 방법임 이걸로
                                            //내용이 들어있는 부분의 css(block을쓰든 hidden을쓰든)를 직접 컨트롤 해보쟈...
    setOpen(!open)
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
            console.log(day)
            return <div key={i}>
              <ListItemButton onClick={e => handleClick(e)}>
                <ListItemText className="" primary={day.day} />
                {/* 취미제목 */}
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="내용" />
                    {/* 텍스트부분 */}
                  </ListItemButton>
                </List>
              </Collapse>
            </div>;
          })}
        </>
      </List>
    </div>
  );
};

export default HobbiesByDay;
