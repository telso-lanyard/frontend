import gsap from "gsap";
import { useRef, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
// import { colors } from "../../../../../../../../utils/data";
import Input from "../../../../../../../../components/Input";

function CheckAvailability({ ...props }) {
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!main.current) return;

    const tl = gsap.timeline();

    tl.to(main.current, {
      y: props.options == "availability" ? 0 : "100%",
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
      id="orders_check_availability_wrapper"
      role="dialog"
      aria-labelledby="availability-options"
      aria-modal="true"
    >
      <div aria-hidden="true" onClick={() => props.setOptions(undefined)} />
      <section ref={main}>
        <button
          aria-label="Close availability options"
          onClick={() => props.setOptions(undefined)}
        >
          <img src={assets.circle_plus} alt="" />
        </button>
        <h1>THE LANYARD Availability</h1>
        {/* <p>
          For THE LANYARD{" "}
          {props.type &&
            props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
          {Object.keys(colors).find(
            (k) => colors[k as keyof typeof colors] === props.color
          )}
        </p> */}
        <Input type="text" name="Zip Code" placeholder="City or Zip Code" />
        {/* <button>View Options</button> */}
        <label>
          <Input type="checkbox" />
          <p>Save my location for future visits</p>
        </label>
        <section>
          <button>
            <p>Check availability of another THE LANYARD</p>{" "}
            <img src={assets.arrow_down_red} alt="" />
          </button>
        </section>
        <section>
            
        </section>
        <div>
          <button onClick={() => props.setOptions(undefined)}>Continue</button>
        </div>
      </section>
    </div>
  );
}

export default CheckAvailability;
