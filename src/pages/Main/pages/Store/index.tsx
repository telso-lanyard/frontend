import { Routes, Route, Navigate } from "react-router-dom";

import Case from "./pages/Case";
import Lanyard from "./pages/Lanyard";
import NotFound from "../../../../components/404";

function Store({ ...props }) {
  return (
    <Routes>
      <Route index element={<Navigate to="lanyard" />} />
      <Route path="case" element={<Case />} />
      <Route
        path="lanyard"
        element={
          <Lanyard
            setCart={props.setCart}
            setProfile={props.setProfile}
            pageWidth={props.pageWidth}
          />
        }
      />
      <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
    </Routes>
  );
}

export default Store;
