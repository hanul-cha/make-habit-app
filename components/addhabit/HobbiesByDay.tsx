import React from "react";

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
  /* console.log(hobbiesByDayList); */

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const trueHeight = e.currentTarget.nextElementSibling?.firstElementChild?.clientHeight;
    if (e.currentTarget.nextElementSibling?.clientHeight == 0) {
      //졉혀있다면
      e.currentTarget.nextElementSibling?.animate(
        [{ height: `${trueHeight}px` }],
        {
          duration: 50,
          fill: "forwards",
        }
      );
    } else {
      e.currentTarget.nextElementSibling?.animate([{ height: 0 }], {
        //펼처져 있다면
        duration: 50,
        fill: "forwards",
      });
    }
    //animate속성에 픽셀을 지정할땐 특정한 값을 입력해줘야한다. auto안됨 그래서 inner컨테이너를 만들어 높이를 변수에
    //저장하고 그 높이로 지정해주었음
  }; //클릭하면 밑으로 리스트를 보여줄것임

  return (
    <div className="HobbiesByDay">
      <h2>요일별 취미</h2>
      <div className="HobbiesByDayMainCon">
        <>
          {hobbiesByDayList.map((day, i) => {
            console.log(day.list);
            return (
              <div className="HobbiesByDayList" key={i}>
                <div className="clickArea" onClick={(e) => handleClick(e)}>
                  <h2>{day.day}</h2>
                  <h3>취미 개수 : {day.list?.length}개</h3>
                </div>
                <div className="habbieByDayCustomList">
                  <div className="customListInner">
                    {day.list?.length !== 0 ? (
                      <div className="haveHobbie">
                        {day.list?.map((hobbies, i) => {
                          return <div key={i}>{hobbies.habitTitle}</div>;
                        })}
                      </div>
                    ) : (
                      <div className="tryAddBabit">
                        해당 요일엔 등록된 취미가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default HobbiesByDay;
