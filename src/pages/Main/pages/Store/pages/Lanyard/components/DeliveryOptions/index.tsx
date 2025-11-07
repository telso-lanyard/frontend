import gsap from "gsap";
import { useRef, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
import { colors } from "../../../../../../../../utils/data";
import Input from "../../../../../../../../components/Input";

function DeliveryOptions({ ...props }) {
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!main.current) return;

    const tl = gsap.timeline();

    tl.to(main.current, {
      y: props.options == "delivery" ? 0 : "100%",
      delay: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, [props.options]);

  return (
    <div
      id="orders_delivery_options_wrapper"
      role="dialog"
      aria-labelledby="delivery-options"
      aria-modal="true"
    >
      <div aria-hidden="true" onClick={() => props.setOptions(undefined)} />
      <section ref={main}>
        <button
          aria-label="Close delivery options"
          onClick={() => props.setOptions(undefined)}
        >
          <img src={assets.circle_plus} alt="" />
        </button>
        <h1>Delivery Options</h1>
        <p>
          For THE LANYARD{" "}
          {props.type &&
            props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
          {Object.keys(colors).find(
            (k) => colors[k as keyof typeof colors] === props.color
          )}
        </p>
        <Input type="text" name="Zip Code" placeholder="Zip Code" />
        <button>View Options</button>
        <label>
          <Input type="checkbox" />
          <p>Save my location for future visits</p>
        </label>
        <p>Enter your location.</p>
        <p>
          We approximate your location from your internet IP address by matching
          it to a geographic region or from the location entered during your
          previous visit to TELSO.
        </p>
      </section>
    </div>
  );
}

export default DeliveryOptions;
