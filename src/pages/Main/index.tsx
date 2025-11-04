import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Story from "./pages/Story";
import Store from "./pages/Store";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import Checkout from "./pages/Checkout";
import NotFound from "../../components/404";
import Transaction from "./pages/Transaction";
import Profile from "../../components/Profile";

function Main({ ...props }) {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [cart, setCart] = useState<
    { type: string; color: string; count: number }[]
  >(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!loaded || profile) {
      if (!loaded) {
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);

        body.style.position = "fixed";
        body.style.top = "0";
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      }

      body.style.overflow = "hidden";
      html.style.overflow = "hidden";

      return () => {
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

  useEffect(() => {
    setProfile(false);
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        <Route
          path="orders/*"
          element={<Orders cart={cart} setCart={setCart} />}
        />
        <Route path="checkout/*" element={<Checkout cart={cart} />} />
        <Route path="transaction/*" element={<Transaction />} />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
      <Profile cart={cart} profile={profile} setProfile={setProfile} />
    </>
  );
}

export default Main;
