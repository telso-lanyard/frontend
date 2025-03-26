import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "../../components/Nav";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Details from "./pages/Details";
import NotFound from "../../components/404";

function Admin({ ...props }) {
  const [userID, setuserID] = useState("");
  const [userToken, setuserToken] = useState("");

  return (
    <>
      <Nav style={{ position: "sticky" }} />
      <Routes>
        <Route
          index
          element={<Auth setuserID={setuserID} setuserToken={setuserToken} />}
        />
        <Route
          path="orders"
          element={<Orders userID={userID} userToken={userToken} />}
        />
        <Route
          path="orders/*"
          element={<Details userID={userID} userToken={userToken} />}
        />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
    </>
  );
}

export default Admin;
