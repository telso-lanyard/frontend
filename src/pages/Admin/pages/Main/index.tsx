import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./pages/components/Sidebar";
// import Items from "./pages/Items";
import Orders from "./pages/Orders";
import Archive from "./pages/Archive";
import NotFound from "../../../../components/404";
import style_map from "../../../../utils/style_map";

function Main({ ...props }) {
  return (
    <div
      style={{
        ...style_map.flex(["center", "space-between"]),
        flex: 1,
      }}
    >
      {props.pageWidth > 850 && <Sidebar nav_links={props.nav_links} />}
      <Routes>
        <Route
          index
          element={
            // <Items
            //   userID={props.userID}
            //   userToken={props.userToken}
            //   pageWidth={props.pageWidth}
            // />
            <Navigate to="archive" />
          }
        />
        <Route
          path="orders/*"
          element={<Orders userID={props.userID} userToken={props.userToken} />}
        />
        <Route path="archive/*" element={<Archive />} />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
    </div>
  );
}

export default Main;
