import React, { useEffect, useState } from "react";
import UseGraphql from "../customhooks/UseGraphql";

interface TodayHabitTypeProps {
    userId:string | undefined
}

const TodayHabit = ({userId}:TodayHabitTypeProps) => {

    console.log(userId)
    return (
        <div>
            
        </div>
    )
}

export default TodayHabit
