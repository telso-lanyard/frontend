import gsap from "gsap";
import { toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
import style_map from "../../../../../../../../utils/style_map";
import { price, priceFormatters } from "../../../../../../../../utils/data";

import Type from "./components/Type";
import Color from "./components/Color";
import Checkout from "./components/Checkout";
import DeliveryOptions from "../DeliveryOptions";
import CheckAvailability from "../CheckAvailability";

function Desktop({ ...props }) {
  const imageEl = useRef<HTMLImageElement>(null);

  const [scrolled, setScrolled] = useState(0);
  const [inColorSection, setInColorSection] = useState(false);
  const [options, setOptions] = useState<
    "delivery" | "availability" | undefined
  >(undefined);

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
      tl.to(el, { opacity: 0.85, duration: 0.2 })
        .call(() => {
          if (props.type) {
            el.src =
              props.type === "elevation"
                ? assets.lanyard_store_bg_elevation_wide
                : assets.lanyard_store_bg_progression_wide;
          } else {
            el.src = assets.lanyard_store_bg_wide;
          }
        })
        .to(el, { opacity: 1, duration: 0.3, ease: "expo.out" });
    } else {
      tl.to(el, { opacity: 0.85, duration: 0.2 })
        .call(() => {
          if (props.type) {
            el.src =
              props.type === "elevation"
                ? assets.lanyard_store_lanyards_elevation_wide
                : assets.lanyard_store_lanyards_progression_wide;
          } else {
            el.src = assets.lanyard_store_lanyards_elevation_wide;
          }
        })
        .to(el, { opacity: 1, duration: 0.3, ease: "expo.out" });
    }

    return () => {
      tl.kill();
    };
  }, [inColorSection, props.type]);

  return (
    <>
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
        <Checkout
          type={props.type}
          color={props.color}
          setCart={props.setCart}
          setProfile={props.setProfile}
          addToCart={props.addToCart}
        />
        <section
          className="delivery-options"
          aria-labelledby="delivery-options"
        >
          <article>
            <img src={assets.truck} alt="Truck icon" />
            <div>
              <p>
                <strong>Ships:</strong>
                <br />
                <span>1–2 weeks</span> <br /> Free Shipping
              </p>
              <button
                onClick={() => {
                  if (!props.type && !props.color)
                    return toast.info("Please select a type and color");
                  if (!props.type) return toast.info("Please select a type");
                  if (!props.color) return toast.info("Please select a color");

                  setOptions("delivery");
                }}
              >
                Get delivery dates <img src={assets.circle_plus} alt="" />
              </button>
            </div>
          </article>
          <article>
            <img src={assets.bag} alt="Shopping bag icon" />
            <div>
              <p>
                <strong>Pickup:</strong>
                <br />
                Check store availability
              </p>
              <button
                onClick={() => {
                  if (!props.type && !props.color)
                    return toast.info("Please select a type and color");
                  if (!props.type) return toast.info("Please select a type");
                  if (!props.color) return toast.info("Please select a color");

                  setOptions("availability");
                }}
              >
                Check availability <img src={assets.circle_plus} alt="" />
              </button>
            </div>
          </article>
        </section>
      </div>
      {options == "delivery" && (
        <DeliveryOptions
          type={props.type}
          color={props.color}
          options={options}
          setOptions={setOptions}
        />
      )}
      {options == "availability" && (
        <CheckAvailability
          type={props.type}
          color={props.color}
          options={options}
          setOptions={setOptions}
        />
      )}
    </>
  );
}

export default Desktop;
