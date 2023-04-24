import { createContext , useContext, useReducer } from "react";

export const ToggleClassContext = createContext();

export const ToggleClassContextProvider = ({children}) => {
   
    const INITIAL_STATE = {
       className:"open",
    }

    const toggleReducer = (state,action) => {
        switch(action.type){
            case "CHANGE_CLASS":
                return{
                    className: state.className==="open" ? "close" : "open"
                }
            default:
                return state;
        }
    }

    const [state,dispatchToggle] = useReducer(toggleReducer,INITIAL_STATE);

    return(
        <ToggleClassContext.Provider value={{data:state, dispatchToggle}}>
            {children}
        </ToggleClassContext.Provider>
    );
};