import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "../../components/Nav";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

function Admin({ ...props }) {
  const navigate = useNavigate();
  const [userID, setuserID] = useState();
  const [userToken, setuserToken] = useState("");

  useEffect(() => {
    if (!userID) navigate("/admin/auth");
  }, [userID]);

  const nav_links = [
    {
      name: "Items",
      icon: "calc",
      link: `${location.pathname.split("/").slice(0, 2).join("/")}/`,
    },
    {
      name: "Orders",
      icon: "desc",
      link: `${location.pathname.split("/").slice(0, 2).join("/")}/orders`,
    },
    {
      name: "Logout",
      icon: "logout",
      link: "/",
    },
  ];

  return (
    <>
      <Nav style={{ position: "sticky" }} nav_links={nav_links} pageWidth={props.pageWidth} />
      <Routes>
        <Route
          path="/*"
          element={
            <Main
              userID={userID}
              userToken={userToken}
              pageWidth={props.pageWidth}
              nav_links={nav_links}
            />
          }
        />
        <Route
          path="/auth"
          element={<Auth setuserID={setuserID} setuserToken={setuserToken} />}
        />
      </Routes>
    </>
  );
}

export default Admin;
