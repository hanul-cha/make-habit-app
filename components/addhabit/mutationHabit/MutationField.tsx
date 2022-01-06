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
    mutation MyMutation($userId: String!, $habitTitle: String!, $habitText: String!, $habitWeek: Int!) {
        createMyhabit(
        input: { myhabit: { userId: $userId, habitTitle: $habitTitle, habitText: $habitText, habitWeek:$habitWeek } }
      ) {
        clientMutationId
      }
    }
  `;

const MutationField = ({ userName, setFailAlert }: MutationFieldType) => {
  const [habitTitle, sethabitTitle] = useState<String>("");
  const [habitText, sethabitText] = useState<String>("");
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [setHabit, { data, loading }] = useMutation(SET_HABIT, {
    onError: (error) => {
      console.log(error);
    },
  });

  const runMutationHabitBtn = () => {
    if (habitTitle !== "" && habitText !== "" && age !== "") {
        
      console.log(userName, habitTitle, habitText, Number(age));
      setHabit({
        variables: {
          userId: userName,
          habitTitle: habitTitle,
          habitText: habitText,
          habitWeek: Number(age)
        },
      });
    } else {
      setFailAlert(true);
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
