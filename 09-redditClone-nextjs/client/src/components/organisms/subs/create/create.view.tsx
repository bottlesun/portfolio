import InputsView from "../../../atoms/inputs/inputs.view";
import InputGroupView from "../../../molecules/inputGroup/inputGroup.view";

const SubCreateView = ({...props}) => {
  return (
    <div className={'flex flex-col justify-center pt-16 bg-color-[#fff]'}>
      <div className={'w-10/12 mx-auto md:w-96'}>
        <h1 className={'mb-2 text-lg font-medium'}>커뮤니티 만들기</h1>
        <hr/>
        <form onSubmit={props.handleSubmit}>
          <div className={'my-6'}>
            <p className={'font-medium'}>Name</p>
            <p className={'mb-2 text-xs text-gray-400'}>
              대문자를 포함한 커뮤니티 이름은 변경할 수 없습니다.
            </p>
            <InputGroupView {...props.inputValue.title}/>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SubCreateView
