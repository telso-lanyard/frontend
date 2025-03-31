import { Routes, Route } from "react-router-dom";

import Sidebar from "./pages/components/Sidebar";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import NotFound from "../../../../components/404";
import style_map from "../../../../utils/style_map";

function Main({ ...props }) {
  return (
    <div
      style={{
        height: "91.75vh",
        ...style_map.flex(["center", "space-between"]),
      }}
    >
      {props.pageWidth > 850 && <Sidebar nav_links={props.nav_links} />}
      <Routes>
        <Route
          index
          element={
            <Items
              userID={props.userID}
              userToken={props.userToken}
              pageWidth={props.pageWidth}
            />
          }
        />
        <Route
          path="orders/*"
          element={<Orders userID={props.userID} userToken={props.userToken} />}
        />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
    </div>
  );
}

export default Main;
