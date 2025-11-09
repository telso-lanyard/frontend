import { Link } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../../../assets";
import { colors } from "../../../../../../utils/data";
import { deliveryDate } from "../../../../../../utils/data";

function Summary({ ...props }) {
  return (
    <div id="checkout_summary_wrapper">
      <h3>Ships in 3-7 business days.</h3>
      <section>
        {props.cart.map((el: (typeof props.cart)[0], i: number) => (
          <div key={i}>
            <div>
              <img
                src={
                  assets[
                    `lanyard_store_lanyards_${el.type || "progression"}_${
                      el.color || "080808"
                    }` as keyof typeof assets
                  ]
                }
                alt=""
              />
              <p>
                THE LANYARD{" "}
                {el.type && el.type.charAt(0).toUpperCase() + el.type.slice(1)}{" "}
                {Object.keys(colors).find(
                  (k) => colors[k as keyof typeof colors] === el.color
                )}
              </p>
            </div>
            <p>Your delivery method:</p>
            <div>
              <div>
                <p>
                  Delivers {deliveryDate(6)} - {deliveryDate(14)}
                </p>
                <p>Express Delivery</p>
              </div>
              <p>FREE</p>
            </div>
          </div>
        ))}
      </section>
      <div />
      <Link to="/checkout/address">Continue to Shipping Address</Link>
    </div>
  );
}

export default Summary;
