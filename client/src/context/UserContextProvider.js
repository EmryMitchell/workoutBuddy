import React from "react";
import { createContext, useReducer } from "react";
import axios from "axios";


const UserContext = createContext()

const initialState = {user:null}

const reducer = (state,action)=>{
    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                user:action.payload
            }
        case "NULL_USER":
            return{
                ...state,
                user:null
            }
        case"LOGOUT_USER":
            console.log("logout")
            axios.get('http://localhost:8000/api/logout',{withCredentials:true})
            .then(()=>{
                action.payload('/')
            })
            .catch(()=>{
                action.payload('/')
            })
            return{
                ...state,
                user:null
            }
        default:
            return state
    }

}

const UserContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContextProvider,UserContext}