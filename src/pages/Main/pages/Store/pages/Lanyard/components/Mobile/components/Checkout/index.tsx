import { Link } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";
import { priceFormatters } from "../../../../../../../../../../utils/data";
import { colors } from "../../../../../../../../../../utils/data";

function Checkout({ ...props }) {
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
        <div>{priceFormatters.naira.format(props.total)}</div>
        <div onClick={() => props.addToCart({ route: "/orders" })}>
          Add to Bag
        </div>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
}

export default Checkout;
