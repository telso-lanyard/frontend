import gsap from "gsap";
import { useRef, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";
import style_map from "../../../../../../../../../../utils/style_map";
import {
  price,
  priceFormatters,
} from "../../../../../../../../../../utils/data";

function Type({ ...props }) {
  const imageEl = useRef<HTMLImageElement>(null);

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
      .to(el, { opacity: 1, duration: 0.1, ease: "expo.out" });

    return () => {
      tl.kill();
    };
  }, [props.type]);

  return (
    <div
      id="store_lanyard_mobile_type_wrapper"
      style={style_map.flex(["center", "space-between", "column"])}
    >
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>New</div>
        <div>Buy THE LANYARD</div>
        <div>From {priceFormatters.naira.format(price)}</div>
      </div>
      <div style={style_map.flex(["center", "center"])}>
        <img ref={imageEl} src={assets.lanyard_store_bg} alt="" />
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
