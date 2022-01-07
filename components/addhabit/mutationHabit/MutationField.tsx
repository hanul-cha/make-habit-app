import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { gql, useMutation } from "@apollo/client";

interface MutationFieldType {
  userName: String;
  setFailAlert: (a: boolean) => void;
}

const SET_HABIT = gql`
  mutation MyMutation(
    $userId: String!
    $habitTitle: String!
    $habitText: String!
    $habitWeek: Int!
  ) {
    createMyhabit(
      input: {
        myhabit: {
          userId: $userId
          habitTitle: $habitTitle
          habitText: $habitText
          habitWeek: $habitWeek
        }
      }
    ) {
      clientMutationId
    }
  }
`;
//새로운 취미를 추가하는 뮤테이션 쿼리

const MutationField = ({ userName, setFailAlert }: MutationFieldType) => {
  const [habitTitle, sethabitTitle] = useState<String>("");
  const [habitText, sethabitText] = useState<String>("");
  const [age, setAge] = useState("");//요일 선택하면 담길 요일별인덱스번호

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };//habit 테이블 week속성을 INT로 받기로 되있어서 처음부터 number로 받으면 좋지만..
    //해당 ui컴포넌트는 string만을 받게 타입지정이 되어 있는듯하다 타입을 바꾸고 싶으면 
    //커스텀 컴포넌트api를 사용해야 될듯하다.

  const [setHabit, { data, loading }] = useMutation(SET_HABIT, {
    onError: (error) => {
      console.log(error);
    },
  });

  const runMutationHabitBtn = () => {
    if (habitTitle !== "" && habitText !== "" && age !== "") {//작성한게 있다면
      console.log(userName, habitTitle, habitText, Number(age));
      setHabit({
        variables: {
          userId: userName,
          habitTitle: habitTitle,
          habitText: habitText,
          habitWeek: Number(age),
        },
      });
    } else {
      setFailAlert(true);//위 조건을 만족못하면 알람을 켜줄것임
    }
  };
  return (
    <div className="MutationField">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">요일</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="요일"
            onChange={handleChange}
          >
            <MenuItem value={0}>일요일</MenuItem>
            <MenuItem value={1}>월요일</MenuItem>
            <MenuItem value={2}>화요일</MenuItem>
            <MenuItem value={3}>수요일</MenuItem>
            <MenuItem value={4}>목요일</MenuItem>
            <MenuItem value={5}>금요일</MenuItem>
            <MenuItem value={6}>토요일</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        className="addHabitTextField"
        id="outlined-basic"
        label="TITLE"
        variant="outlined"
        placeholder="title"
        name="title"
        onChange={(e) => sethabitTitle(e.target.value)}
      />

      <TextField
        className="addHabitTextField"
        id="outlined-basic"
        label="TEXT"
        variant="outlined"
        placeholder="text"
        name="text"
        onChange={(e) => sethabitText(e.target.value)}
      />

      <Button
        className="addHabit_btn"
        variant="outlined"
        fullWidth
        onClick={runMutationHabitBtn}
      >
        추가하기
      </Button>
    </div>
  );
};

export default MutationField;
