import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";
import {
  price,
  priceFormatters,
} from "../../../../../../../../../../utils/data";
import { colors } from "../../../../../../../../../../utils/data";

function Checkout({ ...props }) {
  const navigate = useNavigate();

  function addToCart(route = "/") {
    if (!props.type && !props.color)
      return toast.info("Please select a type and color");
    if (!props.type) return toast.info("Please select a type");
    if (!props.color) return toast.info("Please select a color");

    props.setCart((prev: (typeof props.cart)[0]) => [
      ...prev,
      { type: props.type, color: props.color },
    ]);

    props.setProfile(true);

    setTimeout(() => {
      navigate(route);
    }, 2000);
  }
  return (
    <div id="store_lanyard_mobile_checkout_wrapper">
      <div>
        <div>
          <div>Your new world.</div>
          <div>Just the way you want it.</div>
        </div>
        <div>
          <img
            src={
              assets[
                `lanyard_store_lanyards_${props.type || "progression"}_${
                  props.color || "080808"
                }` as keyof typeof assets
              ]
            }
            alt=""
          />
        </div>
      </div>
      <div>
        <div>
          THE LANYARD {props.type}{" "}
          {Object.keys(colors).find(
            (k) => colors[k as keyof typeof colors] === props.color
          )}
        </div>
        <div>{priceFormatters.naira.format(price)}</div>
        <div onClick={() => addToCart("/orders")}>Add to Bag</div>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
}

export default Checkout;
