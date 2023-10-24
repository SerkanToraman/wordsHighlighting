import React, { useState } from "react";
import { logIn, logOut,toggleModerator } from "@/store/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

function LoginForm() {
  const [userName, setUserName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogIn = () => {
    dispatch(logIn(userName));
  };
  const onClickToggle = () => {
    dispatch(toggleModerator());
  };
  const onClickLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <input type="text" onChange={(e) => setUserName(e.target.value)}></input>
      <br />
      <button onClick={onClickLogIn}>Log in </button>
      <br />
      <button onClick={onClickLogOut}>Log out</button>
      <br />
      <button onClick={onClickToggle}>Toggle Moderator Status</button>
    </div>
  );
}

export default LoginForm;
