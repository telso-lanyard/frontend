import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

// @ts-ignore
import "@fontsource-variable/oswald";

import Main from "./pages/Main";
import Admin from "./pages/Admin";

function App() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [pathname]);

  const [pageWidth, setpageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setpageWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <>
      <Routes>
        <Route index path="/*" element={<Main pageWidth={pageWidth} />} />
        <Route path="admin/*" element={<Admin pageWidth={pageWidth} />} />
      </Routes>
      <ToastContainer draggable />
    </>
  );
}

export default App;
