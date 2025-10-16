import gsap from "gsap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import * as assets from "../../assets";
import style_map from "../../utils/style_map";

function Nav({ ...props }) {
  useEffect(() => {
    if (!props.loaded) return;

    const tl = gsap.timeline({
      onComplete: () => {
        props.setLoaded(true);
      },
    });

    tl.to("#nav_wrapper", {
      transform: "translateY(0)",
      ease: "expo.inOut",
      duration: 0.75,
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [props.loaded]);

  return (
    <div id="nav_wrapper" style={style_map.flex(["center", "space-between"])}>
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
