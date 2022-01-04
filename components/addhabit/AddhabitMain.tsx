import React, { useEffect, useState } from 'react'
import axios from "axios";
import PleaseLogin from '../main/PleaseLogin';

const AddhabitMain = () => {
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        axios.get("/api/isLogin").then((res) => {
            if (res.status === 200 && res.data.id) {
                setUserInfo(res.data.id);
            }
          });
    })


    return (
        <>
            {userInfo !== undefined? (
                ""
            ):(
                <PleaseLogin />              
            )}
        </>
    )
}

export default AddhabitMain
