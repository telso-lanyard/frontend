import { toast } from "react-toastify";
import { useState } from "react";

import "./style.css";
import * as assets from "../../../../../../../../assets";
import Type from "./components/Type";
import Color from "./components/Color";
import Carousel from "./components/Carousel";
import Checkout from "./components/Checkout";
import DeliveryOptions from "../DeliveryOptions";
import CheckAvailability from "../CheckAvailability";

function Mobile({ ...props }) {
  const [options, setOptions] = useState<
    "delivery" | "availability" | undefined
  >(undefined);

  return (
    <>
      <div id="store_lanyard_mobile_wrapper">
        <Type type={props.type} setType={props.setType} />
        <Carousel type={props.type} pageWidth={props.pageWidth} />
        <Color
          type={props.type}
          color={props.color}
          setColor={props.setColor}
        />
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

export default Mobile;
