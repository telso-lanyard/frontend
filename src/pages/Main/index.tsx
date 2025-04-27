import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Transaction from "./pages/Transaction";
import NotFound from "../../components/404";

function Main({ ...props }) {
  return (
    <Routes>
      <Route index element={<Home pageWidth={props.pageWidth} />} />
      <Route path="story" element={<Story pageWidth={props.pageWidth} />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="transaction/*" element={<Transaction />} />
      <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
    </Routes>
  );
}

export default Main;
