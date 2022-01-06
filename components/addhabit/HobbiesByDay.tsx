import React from 'react'

interface HobbiesByDayType {
    node:{
       habitId:number
       habitWeek:number 
       __typename:string
    }
} 

const HobbiesByDay = ({node}:HobbiesByDayType) => {
    console.log(node)
    return (
        <div>
            <h2>요일별 취미</h2>
        </div>
    )
}

export default HobbiesByDay
