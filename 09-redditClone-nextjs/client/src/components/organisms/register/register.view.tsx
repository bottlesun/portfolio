import React from "react";
import ButtonsView from "../../atoms/buttons/buttons.view";
import InputGroupView from "../../molecules/inputGroup/inputGroup.view";

const RegisterView = ({...props}) => {

  return(
    <article className={'bg-white'}>
      <section className={'flex flex-col items-center justify-center h-screen p-6'}>
        <fieldset className={'w-10/12 mx-auto md:w-96'}>
          <h1 className={' text-[15px] font-bold font-medium text-gray-600'}>회원가입</h1>
          <p className={'text-[12px] text-gray-500 mt-[3px]'}>회원님의 회원가입을 환영합니다!</p>
          <hr className={'mt-5 mb-5 w-full h-[1px] bg-gray-400 border-0'}/>
          <form onSubmit={props.handleSubmit}>
            <InputGroupView {...props.inputValue.email} />
            <InputGroupView {...props.inputValue.username} />
            <InputGroupView {...props.inputValue.password} />
            <ButtonsView {...props.buttonsValue.register}/>
          </form>
        </fieldset>
      </section>
    </article>
  )
}
export default RegisterView
