import InputsView from "../../../atoms/inputs/inputs.view";
import InputGroupView from "../../../molecules/inputGroup.view";
import InputTitleView from "../../../molecules/inputTitle.view";

const SubCreateView = ({...props}) => {
  console.log(props.inputValue)

  return (
    <div className={'flex flex-col justify-center pt-16 bg-color-[#fff]'}>
      <div className={'w-10/12 mx-auto md:w-96'}>
        <h1 className={'mb-2 text-lg font-bold'}>커뮤니티 만들기</h1>
        <hr/>
        <form onSubmit={props.handleSubmit}>
          <div className={'my-6'}>
            <InputTitleView  {...props.inputValue.name.top}/>
            <InputGroupView {...props.inputValue.name.inputs}/>
          </div>

          <div className={'my-6'}>
            <InputTitleView  {...props.inputValue.title.top}/>
            <InputGroupView {...props.inputValue.title.inputs}/>
          </div>

          <div className={'my-6'}>
            <InputTitleView  {...props.inputValue.description.top}/>
            <InputGroupView {...props.inputValue.description.inputs}/>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SubCreateView
