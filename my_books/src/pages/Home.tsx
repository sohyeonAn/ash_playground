import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/modules/auth";
import { RootState } from "../types";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  if (token === null) {
    navigate("/");
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={click}>logout</button>
    </div>
  );

  function click() {
    dispatch(logout());
  }
}
