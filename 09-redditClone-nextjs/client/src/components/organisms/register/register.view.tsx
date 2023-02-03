import Link from "next/link";
import React from "react";
import ButtonsView from "../../atoms/buttons/buttons.view";
import InputGroupView from "../../molecules/inputGroup/inputGroup.view";

const RegisterView = ({...props}) => {

  return(
    <div className={'bg-white'}>
      <section className={'flex flex-col items-center justify-center h-screen p-6'}>
        <fieldset className={'w-10/12 mx-auto md:w-96'}>
          <section className={'flex justify-between items-center'}>
            <div>
              <h1 className={' text-[18px] font-black font-medium text-gray-600'}>회원가입</h1>
              <p className={'text-[12px] text-gray-500 mt-[3px] font-bold'}>회원님의 회원가입을 환영합니다!</p>
            </div>

            <Link href={'/'} className={'text-gray-600 hover:text-gray-400 text-[12px]'}>Home</Link>
          </section>
          <hr className={'mt-5 mb-5 w-full h-[1px] bg-gray-400 border-0'}/>
          <form>
            <InputGroupView {...props.inputValue.email} />
            <InputGroupView {...props.inputValue.username} />
            <InputGroupView {...props.inputValue.password} />
            <ButtonsView {...props.buttonsValue.register}/>
          </form>
        </fieldset>
      </section>
    </div>
  )
}
export default React.memo(RegisterView)
