import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Story from "./pages/Story";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import Transaction from "./pages/Transaction";
import NotFound from "../../components/404";
import Profile from "../../components/Profile";

function Main({ ...props }) {
  const [profile, setProfile] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [cart, setCart] = useState<{ type: string; color: string }[]>([]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // let prevScrollY = 0;
    // let prevBodyStyles: Partial<CSSStyleDeclaration> = {};

    if (!loaded || profile) {
      // prevScrollY = window.scrollY || window.pageYOffset || 0;

      // prevBodyStyles = {
      //   position: body.style.position,
      //   top: body.style.top,
      //   left: body.style.left,
      //   right: body.style.right,
      //   width: body.style.width,
      //   overflow: body.style.overflow,
      //   paddingRight: body.style.paddingRight,
      // };

      const prevScrollBehavior = html.style.scrollBehavior;

      if (!loaded) {
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);

        body.style.position = "fixed";
        body.style.top = "0";
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      }

      // const scrollbarGap =
      //   window.innerWidth - document.documentElement.clientWidth;
      // if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      
      html.style.scrollBehavior = prevScrollBehavior;

      return () => {
        // body.style.position = prevBodyStyles.position || "";
        // body.style.top = prevBodyStyles.top || "";
        // body.style.left = prevBodyStyles.left || "";
        // body.style.right = prevBodyStyles.right || "";
        // body.style.width = prevBodyStyles.width || "";
        // body.style.overflow = prevBodyStyles.overflow || "";
        // body.style.paddingRight = prevBodyStyles.paddingRight || "";
        html.style.overflow = "";
      };
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      html.style.overflow = "";
    }
  }, [loaded, profile]);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Home
              loaded={loaded}
              profile={profile}
              setLoaded={setLoaded}
              setProfile={setProfile}
              pageWidth={props.pageWidth}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="story" element={<Story pageWidth={props.pageWidth} />} />
        <Route
          path="store/*"
          element={
            <Store
              setCart={setCart}
              setProfile={setProfile}
              pageWidth={props.pageWidth}
            />
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="discover/*" element={<Discover />} />
        <Route path="transaction/*" element={<Transaction />} />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
      <Profile cart={cart} profile={profile} setProfile={setProfile} />
    </>
  );
}

export default Main;
