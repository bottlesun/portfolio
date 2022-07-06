import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";

type ReturnType<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>(initialData: T): ReturnType<T> => { // 매개변수 return 값에 타입 추론  T 는 전역
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, [])
  return [value, handler, setValue];
};

export default useInput;