import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "../../components/Nav";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

function Admin({ ...props }) {
  const navigate = useNavigate();
  const [userID, setuserID] = useState();
  const [userToken, setuserToken] = useState();

  useEffect(() => {
    if (!userID) navigate("/admin/auth");
  }, [userID, navigate]);

  useEffect(() => {
    if (userToken) sessionStorage.setItem("token", userToken);
  }, [userToken]);

  const nav_links = [
    // {
    //   name: "Items",
    //   icon: "calc",
    //   link: `${location.pathname.split("/").slice(0, 2).join("/")}/`,
    // },
    // {
    //   name: "Orders",
    //   icon: "desc",
    //   link: `${location.pathname.split("/").slice(0, 2).join("/")}/orders`,
    // },
    {
      name: "Archive",
      icon: "desc",
      link: `${location.pathname.split("/").slice(0, 2).join("/")}/archive`,
    },
    {
      name: "Logout",
      icon: "logout",
      link: "/",
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav
        style={{
          position: "sticky",
          transform: "none",
          borderTop: "none",
          borderBottom: "1px solid black",
        }}
        // logo_only={!userID}
        logo_only
        nav_links={nav_links}
        pageWidth={props.pageWidth}
      />
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
    </div>
  );
}

export default Admin;
