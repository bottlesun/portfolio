import {ChangeEvent, Dispatch, useCallback, useState} from "react";

type ReturnType<T> = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  inputs: T;
  setInputs: Dispatch<any>
}

export default function useInput<T>(initialData: T) {
  const [inputs, setInputs] = useState(initialData);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs])

  return {onChange, inputs }
}
