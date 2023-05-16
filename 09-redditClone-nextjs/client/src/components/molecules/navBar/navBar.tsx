import axios from "axios";
import { FC } from "react";
import { useAuthDispatch, useAuthState } from "../../../context/auth";
import NavBarView from "./navBar.view";

const NavBar: FC = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const handelLogout = () => {
    console.log("로그아웃");
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const props = {
    loading,
    authenticated,
    logout: {
      text: "로그아웃",
      onClick: handelLogout
    }
  };
  return <NavBarView {...props} />;
};
export default NavBar;
