import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "../types/user";

export type State = {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
};

type Action = {
  type: string;
  payload: any;
};

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: false
});

const DispatchContext = createContext<any>(null);

//state value 값 구하기
const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload
      };
    case "LOGOUT":
      return {
        ...state, // state 는 기존의 state 를 가져옴 (authenticated, user, loading)
        authenticated: false, // authenticated 는 로그인 여부를 나타냄
        user: null // user 는 로그인한 유저의 정보를 나타냄
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      throw new Error(`Unknown action type : ${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    //useReducer 는 state 와 dispatch 를 반환
    user: null,
    authenticated: false,
    loading: true
  });

  // dispatch value 구현
  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  useEffect(() => {
    async function LoadUser() {
      try {
        // 로딩이 시작되면 authenticated를 true로 바꾸기
        const res = await axios.get("/auth/me");
        dispatch("LOGIN", res.data);
      } catch (error) {
        console.log(error);
      } finally {
        // 로딩이 끝나면 authenticated를 false로 바꾸기
        dispatch("STOP_LOADING");
      }
    }
    LoadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

// 다른 곳에서도 value 를 사용 할 수 있게 export
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
