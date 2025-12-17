import { Routes, Route } from "react-router-dom";

import Main from "./Main";
import Edit from "./Edit";

function Archive() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/:id" element={<Edit />} />
    </Routes>
  );
}

export default Archive;
