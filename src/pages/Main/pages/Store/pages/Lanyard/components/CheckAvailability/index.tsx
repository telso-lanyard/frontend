import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
import {
  colors,
  price,
  priceFormatters,
} from "../../../../../../../../utils/data";
import Input from "../../../../../../../../components/Input";

function CheckAvailability({ ...props }) {
  const main = useRef<HTMLDivElement>(null);
  const [sectionState, setsectionState] = useState(false);

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
        <Input
          type="text"
          name="Zip Code"
          placeholder="City or Zip Code"
          value={props.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setLocation(e.target.value)
          }
        />
        <label>
          <Input type="checkbox" />
          <p>Save my location for future visits</p>
        </label>
        <section>
          <button onClick={() => setsectionState(!sectionState)}>
            <p>Check availability of another THE LANYARD</p>{" "}
            <img
              src={assets.arrow_down_red}
              alt=""
              style={{ transform: `rotate(${sectionState ? 180 : 0}deg)` }}
            />
          </button>
          {sectionState && (
            <section>
              <div>
                <button
                  style={{
                    border: `1px solid #${
                      props.type == "progression" ? "D41F27" : "B3B3B3"
                    }`,
                  }}
                  onClick={() => props.setType("progression")}
                >
                  Progression
                </button>
                <button
                  style={{
                    border: `1px solid #${
                      props.type == "elevation" ? "D41F27" : "B3B3B3"
                    }`,
                  }}
                  onClick={() => props.setType("elevation")}
                >
                  Elevation
                </button>
              </div>
              <p>Finish</p>
              <div>
                {Object.values(colors).map((color, i) => (
                  <button
                    key={i}
                    style={{
                      background: `#${color}`,
                      border: `2px solid ${
                        props.color == color ? "#D41F27" : "#F4F4F4"
                      }`,
                    }}
                    onClick={() => props.setColor(color)}
                  />
                ))}
              </div>
            </section>
          )}
        </section>
        <section>
          <div>
            <img
              src={
                assets[
                  `lanyard_store_lanyards_${props.type}_${props.color}` as keyof typeof assets
                ]
              }
              alt=""
            />
            <div>
              <div>
                THE LANYARD{" "}
                {props.type &&
                  props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
                {Object.keys(colors).find(
                  (k) => colors[k as keyof typeof colors] === props.color
                )}
              </div>
              <div>{priceFormatters.naira.format(price)}</div>
            </div>
          </div>
          <p>
            <strong>Pick it up at a TELSO Retail Store</strong>
          </p>
          <p>
            Search by city or zip code to see availability at nearby stores.
          </p>
          <p>Or get it delivered</p>
          <p>
            <strong>Ships: 1-2 Weeks</strong>
          </p>
        </section>
        <div>
          <button onClick={() => props.setOptions(undefined)}>Continue</button>
        </div>
      </section>
    </div>
  );
}

export default CheckAvailability;
