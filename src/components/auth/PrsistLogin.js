import React, { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import NavBar from "../NavBar";

function PrsistLogin({ setLog, setSearch }) {
  const [persist, setPersist] = usePersist();
  const effectRan = useRef(false);
  const token = useSelector(selectCurrentToken);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content = <NavBar setLog={setLog} setSearch={setSearch} />;

  if (!persist) {
    content = <NavBar setLog={setLog} setSearch={setSearch} />;
  } else if (isLoading) {
    content = <NavBar setLog={setLog} setSearch={setSearch} />;
  } else if (isError) {
    content = <NavBar setLog={setLog} setSearch={setSearch} />;
    localStorage.removeItem("persist");
  } else if (isSuccess && trueSuccess) {
    content = <NavBar setLog={setLog} setSearch={setSearch} />;
  } else if (token && isUninitialized) {
    content = <NavBar setLog={setLog} setSearch={setSearch} />;
  }
  // let content = <Outlet />;

  // if (!persist) {
  //   content = <Outlet />;
  // } else if (isLoading) {
  //   content = <Outlet />;
  // } else if (isError) {
  //   content = <Outlet />;
  //   localStorage.removeItem("persist");
  // } else if (isSuccess && trueSuccess) {
  //   content = <Outlet />;
  // } else if (token && isUninitialized) {
  //   content = <Outlet />;
  // }

  return content;
}

export default PrsistLogin;
