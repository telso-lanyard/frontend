import { useRef, useState, useEffect } from "react";

import "./style.scss";
import urls from "../../../../../utils/urls";
import * as assets from "../../../../../assets";
import { price, priceFormatters } from "../../../../../utils/data";

function Overlay({ ...props }) {
  const overlay = useRef<HTMLDivElement>(null);
  const close_btn = useRef<HTMLButtonElement>(null);
  const [overlayPos, setOverlayPos] = useState({ right: 0, top: 0 });
  const [close_btnPos, setClose_btnPos] = useState({ width: 0 });

  useEffect(() => {
    if (!overlay.current || !close_btn.current) return;

    const { top, left, width } = overlay.current.getBoundingClientRect();
    setOverlayPos({ right: left + width, top });

    setClose_btnPos({
      width: close_btn.current?.getBoundingClientRect().width,
    });
  }, [props.pageWidth]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div id="main_archive_overlay_wrapper">
      <div className="bg" onClick={() => props.setOverlay(undefined)} />
      <button
        style={{
          left: overlayPos.right - close_btnPos.width - 10,
          top: overlayPos.top + 5,
        }}
        ref={close_btn}
        className="close_btn"
        onClick={() => props.setOverlay(undefined)}
      >
        <img src={assets.close} alt="" />
      </button>
      <section ref={overlay}>
        <h1>{props.overlay.name}</h1>
        <div>
          <img src={`${urls.media}/${props.overlay.media}`} alt="" />
        </div>
        <div style={{ display: props.overlay.sold ? "none" : "flex" }}>
          <p>{props.overlay.type}</p>
          <p>{priceFormatters.naira.format(price)}</p>
        </div>
        <button style={{ display: props.overlay.sold ? "none" : "block" }}>
          ACQUIRE
        </button>
        {props.overlay.sold && (
          <p>
            RELEASED{" "}
            {new Date(props.overlay.created_at)
              .toLocaleString("en-US", { month: "short", year: "numeric" })
              .toUpperCase()}{" "}
            [ARCHIVED]
          </p>
        )}
      </section>
    </div>
  );
}

export default Overlay;
