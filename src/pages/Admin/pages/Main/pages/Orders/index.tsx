import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Details from "./pages/Details";
import NotFound from "../../../../../../components/404";

function Orders({ ...props }) {
  return (
    <Routes>
      <Route index path="/*" element={<Main />} />
      <Route path="/details/*" element={<Details />} />
      <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
    </Routes>
  );
}

export default Orders;
