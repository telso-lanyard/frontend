import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import "./style.scss";
import Type from "./components/Type";
import * as assets from "../../../../../../../../assets";
import style_map from "../../../../../../../../utils/style_map";

function Desktop({ ...props }) {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const imageEl = useRef<HTMLImageElement>(null);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const el = wrapperEl.current;
    if (!el) return;

    const handleScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = wrapperEl.current;
    if (!el) return;

    // const progress =
    //   (scrollTop /
    //     (el.scrollHeight - el.clientHeight)) *
    //   100;

    // const progress = (contentScrollTop / window.innerHeight) * 100;

    // console.log(progress);
  }, [scrollTop]);

  useEffect(() => {
    const el = imageEl.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { opacity: 0.95, duration: 0.2 })
      .call(() => {
        if (props.type) {
          props.type == "elevation"
            ? (el.src = assets.lanyard_store_bg_elevation)
            : (el.src = assets.lanyard_store_bg_progression);
        }
      })
      .to(el, { opacity: 1, duration: 0.3, ease: "expo.out" });

    return () => {
      tl.kill();
    };
  }, [props.type]);

  return (
    <div ref={wrapperEl} id="store_lanyard_desktop_wrapper">
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>New</div>
        <div>Buy THE LANYARD</div>
        <div>From ₦7499</div>
      </div>
      <div style={style_map.flex(["flex-start", "space-between"])}>
        <div style={style_map.flex(["center", "center"])}>
          <img ref={imageEl} src={assets.lanyard_store_bg_wide} alt="" />
        </div>
        <div>
          <Type type={props.type} setType={props.setType} />
          <Type type={props.type} setType={props.setType} />
        </div>
      </div>
    </div>
  );
}

export default Desktop;
