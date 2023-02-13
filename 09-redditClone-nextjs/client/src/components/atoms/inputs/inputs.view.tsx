import React, {memo, useState} from 'react'
import cls from 'classnames';

export type InputGroupProps = {
  type?: string,
  error: string | undefined,
  placeholder?: string,
  value?: string,

  setValue?: (str: string) => void
  onChange?: () => void
  name: string
}

const InputsView = ({type, error, placeholder, value, onChange, name}: InputGroupProps) => {
  return (
    <input type={type}
           style={{minWidth: 300}}
           className={cls(`w-full p-2 transition duration-200 border border-gray-300 rounded bg-gray-50 focus:bg-white hover:bg-white text-[13px]`,
             {'border-red-500': error}
           )}
           name={name}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
    />
  )
};

export default InputsView
