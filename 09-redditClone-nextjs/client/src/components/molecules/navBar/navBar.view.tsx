import Link from "next/link";
import ButtonsView from "../../atoms/buttons/buttons.view";
import InputsView from "../../atoms/inputs/inputs.view";

const NavBarView = ({ ...props }) => {
  return (
    <>
      <div className={"fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-5 bg-white"}>
        <span className={"text-2xl font-semibold text-gray-400"}>
          <Link href={"/"}>Community</Link>
        </span>

        <div className={"max-w-full px-x"}>
          <div className={"relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white"}>
            <InputsView type={"text"} placeholder={"search..."} name={"search"} error={""} />
          </div>
        </div>

        <div className={"flex"}>
          {!props.loading &&
            (props.authenticated ? (
              <ButtonsView {...props.logout} />
            ) : (
              <>
                <Link href={"/login"} className={"w-20 p-2 mr-2 text-center text-blue-500 border-blue-500 rounded"}>
                  로그인
                </Link>
                <Link href={"/register"} className={"w-20 p-2 text-center text-white bg-gray-400 rounded"}>
                  회원가입
                </Link>
              </>
            ))}
        </div>
      </div>
    </>
  );
};
export default NavBarView;
