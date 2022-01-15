import { makeVar } from "@apollo/client"

export const applyVar = makeVar({mainLoading:false});

export const setMainLoadding = (load:boolean) => {
    applyVar({mainLoading:load})
}