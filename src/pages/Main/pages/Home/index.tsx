import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "./components/Hero";
import Items from "./components/Items";
import Landing from "./components/Landing";
import Summary from "./components/Summary";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";

function Home({ ...props }) {
  const [navStyle, setNavStyle] = useState({
    background: "black",
  });
  const [cart, setCart] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/" && window.scrollY < 200) {
        setNavStyle({ background: "transparent" });
      } else {
        setNavStyle({ background: "black" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <Nav style={navStyle} cart={cart} />
      <Hero />
      <Landing />
      <Items pageWidth={props.pageWidth} setCart={setCart} />
      <Summary pageWidth={props.pageWidth} cart={cart} />
      <Footer />
    </>
  );
}

export default Home;
