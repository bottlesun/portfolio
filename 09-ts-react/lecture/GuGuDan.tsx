import * as React from "react";
import {useState,useRef} from "react";

// <> === React.Fragment
const GuGuDan = () => {
    const [first , setFirst] = useState(Math.ceil(Math.random()*9))
    const [second , setSecond] = useState(Math.ceil(Math.random()*9))
    const [value , setValue] = useState('')
    const [result,setResult] = useState('')
    const inputEl = useRef<HTMLInputElement>(null); // useRef는 제네릭을 써줘야 타입 추론이 된다.

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => { // : React.FormEvent 를 써줘야 한다.
        // event 를 분리 하여 사용 할 경우 매개변수를 정의 해줘야 한다.
        e.preventDefault();
        const input = inputEl.current;
        if(parseInt(value) === first * second) {
            setResult('정답');
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            if(input){ // input 이 실제로 존재할때만
                input.focus();
            }

        } else {
            setResult('땡');
            setValue('');
            if(input){
                input.focus();
            }
        }
    }

    return(
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
            <div>{result}</div>
        </>
    )
}

export default GuGuDan;