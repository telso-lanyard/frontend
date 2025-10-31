import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";

function Carousel({ ...props }) {
  const [state, setState] = useState(1);
  const imageEl = useRef<HTMLImageElement>(null);
  const arrowElLeft = useRef<HTMLDivElement>(null);
  const arrowElRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageEl.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { opacity: 0.95, duration: 0.2 })
      .call(() => {
        el.src =
          assets[
            `lanyard_store_bg_${
              props.type || "elevation"
            }_2_${state}` as keyof typeof assets
          ];
      })
      .to(el, { opacity: 1, duration: 0.1, ease: "expo.out" });

    return () => {
      tl.kill();
    };
  }, [state, props.type]);

  useEffect(() => {
    if (!arrowElLeft || !arrowElRight) return;

    arrowElLeft.current!.style.transform = "rotate(-90deg) translateX(-.25px)";
    arrowElRight.current!.style.transform = "rotate(90deg) translateX(.25px)";

    if (arrowElLeft.current?.nextSibling instanceof HTMLElement) {
      const el = arrowElLeft.current.nextSibling;
      const rect = el.getBoundingClientRect();

      arrowElLeft.current.style.left = `${
        rect.left - arrowElLeft.current.getBoundingClientRect().width / 2
      }px`;
    }

    if (arrowElRight.current?.previousSibling instanceof HTMLElement) {
      const el = arrowElRight.current.previousSibling;
      const rect = el.getBoundingClientRect();

      arrowElRight.current.style.left = `${
        rect.left +
        rect.width -
        arrowElRight.current.getBoundingClientRect().width / 2
      }px`;
    }
  }, [props.pageWidth]);

  return (
    <div id="store_lanyard_mobile_carousel_wrapper">
      <div>
        {props.type == "progression"
          ? "Beyond form."
          : "Forward, with purpose."}
      </div>
      <div>
        <div>
          <img ref={imageEl} alt="" />
        </div>
        <div>
          <div ref={arrowElLeft} onClick={() => setState(1)}>
            <img
              src={
                assets[
                  `arrow_down_${
                    state == 1 ? "black" : "grey"
                  }` as keyof typeof assets
                ]
              }
              alt=""
            />
          </div>
          {Array(4)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                style={{ background: state == i + 1 ? "black" : "#B3B3B3" }}
                onClick={() => setState(i + 1)}
              />
            ))}
          <div ref={arrowElRight} onClick={() => setState(4)}>
            <img
              src={
                assets[
                  `arrow_down_${
                    state == 4 ? "black" : "grey"
                  }` as keyof typeof assets
                ]
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
