import React, {createContext, useContext, useReducer} from "react";
import {User} from "../types/user";

type State = {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}

type Action = {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: false
});

const DispatchContext = createContext<any>(null);


//state value 값 구하기
const reducer = (state: State, {type, payload}: Action) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload
      };
    case  "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      throw new Error(`Unknown action type : ${type}`);
  }
}


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true
  });

  console.log('state', state);


  // dispatch value 구현
  const dispatch = (type:string,payload?:any) => {
    defaultDispatch({type,payload})
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

// 다른 곳에서도 value 를 사용 할 수 있게 export
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

