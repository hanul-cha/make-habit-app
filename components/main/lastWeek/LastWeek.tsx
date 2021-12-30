import React from 'react'


interface LastWeekTypeProps {

}

const LastWeek = ({}:LastWeekTypeProps) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const today = Number(year + month + day)

    console.log(today)
    return (
        <div>
            
        </div>
    )
}

export default LastWeek
