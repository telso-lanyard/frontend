import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Store from "./pages/Store";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Archive from "./pages/Archive";
import Discover from "./pages/Discover";
import Checkout from "./pages/Checkout";
import { price } from "../../utils/data";
import NotFound from "../../components/404";
import Profile from "../../components/Profile";

function Main({ ...props }) {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [location, setLocation] = useState<string>(() => {
    const saved = localStorage.getItem("location");
    return saved ? JSON.parse(saved) : "";
  });
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

    setTotal(
      cart.reduce(
        (acc: number, el: (typeof cart)[0]) => acc + el.count * price,
        0
      )
    );
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
        <Route
          path="store/*"
          element={
            <Store
              setCart={setCart}
              location={location}
              setLocation={setLocation}
              setProfile={setProfile}
              pageWidth={props.pageWidth}
            />
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route
          path="archive"
          element={<Archive pageWidth={props.pageWidth} />}
        />
        <Route path="discover/*" element={<Discover />} />
        <Route
          path="orders/*"
          element={<Orders cart={cart} setCart={setCart} total={total} />}
        />
        <Route
          path="checkout/*"
          element={
            <Checkout
              cart={cart}
              total={total}
              location={location}
              setLocation={setLocation}
            />
          }
        />
        <Route path="/*" element={<NotFound pageWidth={props.pageWidth} />} />
      </Routes>
      <Profile
        cart={cart}
        total={total}
        profile={profile}
        setProfile={setProfile}
      />
    </>
  );
}

export default Main;
