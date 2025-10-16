import gsap from "gsap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import * as assets from "../../assets";
import style_map from "../../utils/style_map";

function Nav({ ...props }) {
  const [scrollTop, setScrollTop] = useState(0);

useEffect(() => {
  if (!props.loaded) return;

  const el = document.querySelector("#nav_wrapper");
  console.log("Nav element:", el);

  if (!el) {
    console.warn("❌ #nav_wrapper not found when loaded triggered");
    return;
  }

  const tl = gsap.timeline();
  tl.to(el, {
    y: 0,
    ease: "expo.inOut",
    duration: 0.75,
    delay: 0.5,
  });

  return () =>{ tl.kill();}
}, [props.loaded]);


  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="nav_wrapper"
      style={{
        ...style_map.flex(["center", "space-between"]),
        background: scrollTop > 10 ? "transparent" : "white",
        backdropFilter: scrollTop > 10 ? "blur(10px)" : "none",
      }}
    >
      <div style={style_map.flex(["center", "space-between", "column"])}>
        <div />
        <div />
      </div>
      <Link to="/" style={style_map.flex(["center", "center"])}>
        <img src={assets.logo_red} alt="" />
      </Link>
      <div style={style_map.flex(["center", "center"])}>
        <img src={assets.bag} alt="" />
      </div>
    </div>
  );
}

export default Nav;
