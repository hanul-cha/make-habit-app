import React, { useState } from "react";
import { TextField, Button, Alert, AlertTitle } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface MutationFieldType {
  userName: string;
}

const MutationField = ({ userName }: MutationFieldType) => {
  const [habitTitle, sethabitTitle] = useState("");
  const [habitText, sethabitText] = useState("");
  const [habitWeek, sethabitWeek] = useState<number>();
  const [age, setAge] = useState("");

  

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    sethabitWeek(Number(age))
  };

  const runMutationHabitBtn = () => {
    console.log(habitTitle, habitText, habitWeek)
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
        className="joinTextField"
        id="outlined-basic"
        label="id"
        variant="outlined"
        placeholder="user id"
        name="id"
        onChange={(e) => sethabitTitle(e.target.value)}
      />

      <TextField
        className="joinTextField"
        id="outlined-basic"
        label="name"
        variant="outlined"
        placeholder="user name"
        name="name"
        onChange={(e) => sethabitText(e.target.value)}
      />

      <Button
        className="join_btn"
        variant="outlined"
        onClick={runMutationHabitBtn}
      >
        추가하기
      </Button>
    </div>
  );
};

export default MutationField;
