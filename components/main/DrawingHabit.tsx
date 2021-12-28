import React from "react";

interface DrawingHabitType {
  e?: {
    node?: any;
    __typename?: string;
  };
}

const DrawingHabit = ({ e }: DrawingHabitType) => {
  return (
    <>
      {e && (
        <div>
          <h3>{e.node.habitTitle}</h3>
          <p>{e.node.habitText}</p>
        </div>
      )}
    </>
  );
};

export default DrawingHabit;

/* 
오늘 할일이 있다면 그려줄 컴포넌트
*/
