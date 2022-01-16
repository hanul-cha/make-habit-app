import React, { useEffect } from 'react'
import UseGraphqlGetCheckData from '../../customhooks/UseGraphqlGetCheckData'

interface nodeType {
    node: {
      __typename: string;
      checkDate: number;
    };
  }

interface GetHabitCheckDataType {
    setdrawingQueryData: (a:nodeType[]) => void
    setresetQueryData: (a: boolean) => void
    habitId: number
}



const GetHabitCheckData = ({habitId, setdrawingQueryData, setresetQueryData}:GetHabitCheckDataType) => {

    const {data, loading} = UseGraphqlGetCheckData(habitId)

    

    useEffect(() => {
        if(!loading) {
            console.log(data.allHabitchecks.edges)
            setresetQueryData(false)
        }
    })




    return <></>
}

export default GetHabitCheckData
