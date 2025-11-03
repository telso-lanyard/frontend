import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
import style_map from "../../../../../../../../utils/style_map";
import { price, priceFormatters } from "../../../../../../../../utils/data";

import Type from "./components/Type";
import Color from "./components/Color";
import Checkout from "./components/Checkout";

function Desktop({ ...props }) {
  const imageEl = useRef<HTMLImageElement>(null);

  const [scrolled, setScrolled] = useState(0);
  const [inColorSection, setInColorSection] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setScrolled((window.scrollY / window.innerHeight) * 100);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled >= 75 && !inColorSection) {
      setInColorSection(true);
    } else if (scrolled < 75 && inColorSection) {
      setInColorSection(false);
    }
  }, [scrolled, inColorSection]);

  useEffect(() => {
    const el = imageEl.current;
    if (!el) return;

    const tl = gsap.timeline();

    if (!inColorSection) {
      tl.to(el, { opacity: 0.95, duration: 0.2 })
        .call(() => {
          el.src = assets.lanyard_store_bg_wide;
          if (props.type) {
            el.src =
              props.type === "elevation"
                ? assets.lanyard_store_bg_elevation_wide
                : assets.lanyard_store_bg_progression_wide;
          }
        })
        .to(el, { opacity: 1, duration: 0.3, ease: "expo.out" });
    } else {
      tl.to(el, { opacity: 0.95, duration: 0.2 })
        .call(() => {
          el.src = assets.lanyard_store_lanyards_elevation_wide;
          if (props.type) {
            el.src =
              props.type === "elevation"
                ? assets.lanyard_store_lanyards_elevation_wide
                : assets.lanyard_store_lanyards_progression_wide;
          }
        })
        .to(el, { opacity: 1, duration: 0.3, ease: "expo.out" });
    }

    return () => {
      tl.kill();
    };
  }, [inColorSection, props.type]);

  return (
    <div id="store_lanyard_desktop_wrapper">
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>New</div>
        <div>Buy THE LANYARD</div>
        <div>From {priceFormatters.naira.format(price)}</div>
      </div>
      <div style={style_map.flex(["flex-start", "space-between"])}>
        <div style={style_map.flex(["center", "center"])}>
          <img ref={imageEl} alt="" />
        </div>
        <div>
          <Type type={props.type} setType={props.setType} />
          <Color color={props.color} setColor={props.setColor} />
        </div>
      </div>
      <Checkout type={props.type} color={props.color} />
    </div>
  );
}

export default Desktop;
