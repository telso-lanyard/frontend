import gsap from "gsap";
import { useRef, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";
import { colors } from "../../../../../../../../../../utils/data";

function Color({ ...props }) {
  const imageEl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imageEl.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { opacity: 0.95, duration: 0.2 })
      .call(() => {
        el.src =
          assets[
            `lanyard_store_lanyards_${
              props.type || "elevation"
            }` as keyof typeof assets
          ];
      })
      .to(el, { opacity: 1, duration: 0.1, ease: "expo.out" });

    return () => {
      tl.kill();
    };
  }, [props.type]);

  return (
    <div id="store_lanyard_mobile_color_wrapper">
      <div>
        Finish. <span>Pick your favourite.</span>
      </div>
      <div>
        <img ref={imageEl} alt="" />
      </div>
      <div>
        <div>Color - Black</div>
        <div>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                background: `#${color}`,
                border: `2px solid ${
                  props.color == color ? "#b3b3b3" : "#FFF"
                }`,
              }}
              onClick={() => props.setColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Color;
