import Link from "next/link";
import React from "react";
import ButtonsView from "../../atoms/buttons/buttons.view";
import InputGroupView from "../../molecules/inputGroup.view";

const LoginView = ({...props}) => {
  return (
    <div className={'bg-white'}>
      <section className={'flex flex-col items-center justify-center h-screen p-6'}>
        <fieldset className={'w-10/12 mx-auto md:w-96'}>
          <h1 className={' text-[20px] font-black font-medium text-gray-600 mb-[3px]'}>로그인</h1>
          <hr className={'mt-5 mb-5 w-full h-[1px] bg-gray-400 border-0'}/>
          <form>
            <InputGroupView {...props.inputValue.username} />
            <InputGroupView {...props.inputValue.password} />
            <ButtonsView {...props.buttonsValue.login}/>
          </form>

          <small className={'mt-3 block'}>
            아직 아이디가 없나요?
            <Link href={'/register'} className={"ml-1 text-gray-500 uppercase hover:text-gray-800"}>회원가입</Link>
          </small>

        </fieldset>
      </section>
    </div>
  )
}

export default LoginView
