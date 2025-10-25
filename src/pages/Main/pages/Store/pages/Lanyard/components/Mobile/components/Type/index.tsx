import gsap from "gsap";
import { useRef, useEffect } from "react";

import "./style.css";
import style_map from "../../../../../../../../../../utils/style_map";

function Type({ ...props }) {
  const imageEl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imageEl.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { opacity: 0.95, duration: 0.2 })
      .call(() => {
        el.src = props.bg_img;
      })
      .to(el, { opacity: 1, duration: 0.1, ease: "expo.out" });

    return () => {
      tl.kill();
    };
  }, [props.bg_img]);

  return (
    <div
      id="store_lanyard_mobile_type_wrapper"
      style={style_map.flex(["center", "space-between", "column"])}
    >
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>New</div>
        <div>Buy THE LANYARD</div>
        <div>From ₦7499</div>
      </div>
      <div style={style_map.flex(["center", "center"])}>
        <img src={props.bg_img} ref={imageEl} alt="" />
      </div>
      <div style={style_map.flex(["center", "space-between"])}>
        {["progression", "elevation"].map((type, i) => (
          <div
            key={i}
            onClick={() => props.setType(type)}
            style={{
              border: `${props.type == type ? 2 : 1}px solid #b3b3b3`,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Type;
