import {useCallback, useEffect,useReducer,useState} from "react"

import { API } from "../api"
import {fechReducer,initialState} from "../reducers/fecht"
import {FETCH_DATA } from "./../action/Fetch"

export const useDeleted =({endopoint})=>{
  
    
    const [state,dispatch]= useReducer(fechReducer,initialState)

    const sendDeletd = useCallback(async () => {
        try {
            console.log(`try deletd`);
          await API.delete(`${endopoint}`);
          dispatch({ type: FETCH_DATA.SET_DELETD});
          
        } catch (error) {
          console.log(`EROR ${error}`);
          dispatch({ type: FETCH_DATA.SET_ERROR });
        }
      }, [endopoint]);
  



    useEffect(()=>{
        sendDeletd()
    },[endopoint,sendDeletd])

    return state
}