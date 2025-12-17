import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import * as assets from "../../assets";

function Nav({ ...props }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (!props.loaded) return;
    if (props.profile) return;
    if (!navRef.current) return console.warn("#nav_wrapper ref not set");

    const tl = gsap.timeline();

    tl.to(navRef.current, {
      y: 0,
      ease: "expo.inOut",
      duration: 0.75,
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
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

  useEffect(() => {
    document.querySelectorAll("nav_wrapper").forEach((el) => {
      const burger = el.children[0];
      if (props.profile) {
        gsap.delayedCall(0.15, () => burger.classList.add("close_burger"));
      } else {
        burger.classList.remove("close_burger");
      }
    });
  }, [props.profile]);

  return (
    <nav
      className="nav_wrapper"
      ref={navRef}
      style={{
        background:
          props.style?.background ?? (scrollTop > 10 ? "transparent" : "white"),
        backdropFilter: scrollTop > 10 ? "blur(10px)" : "none",
        ...props.style,
      }}
    >
      <div
        onClick={() => props.setProfile(!props.profile)}
        style={{
          display: props.logo_only && "none",
        }}
        className={props.profile ? "close_burger" : ""}
      >
        <div />
        <div />
      </div>
      <Link to="/">
        <img src={assets.logo_red} alt="" />
      </Link>
      <Link
        to="/orders"
        style={{
          display: props.logo_only && "none",
        }}
      >
        <img src={assets.bag} alt="" />
      </Link>
    </nav>
  );
}

export default Nav;
