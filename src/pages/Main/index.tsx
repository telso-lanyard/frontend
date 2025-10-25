import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Story from "./pages/Story";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import Transaction from "./pages/Transaction";
import NotFound from "../../components/404";

function Main({ ...props }) {
  return (
    <Routes>
      <Route index element={<Home pageWidth={props.pageWidth} />} />
      <Route path="about" element={<About />} />
      <Route path="story" element={<Story pageWidth={props.pageWidth} />} />
      <Route path="store/*" element={<Store pageWidth={props.pageWidth} />} />
      <Route path="contact" element={<Contact />} />
      <Route path="discover/*" element={<Discover />} />
      <Route path="transaction/*" element={<Transaction />} />
      <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
    </Routes>
  );
}

export default Main;
