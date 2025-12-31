import "./style.scss";
import {
  price,
  priceFormatters,
} from "../../../../../../../../../../utils/data";
import * as assets from "../../../../../../../../../../assets";
import { colors } from "../../../../../../../../../../utils/data";

function Checkout({ ...props }) {
  return (
    <div id="store_lanyard_desktop_checkout_wrapper">
      <div>
        <div>
          <div>
            <div>Your new World.</div>
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
            THE LANYARD{" "}
            {props.type &&
              props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
            {Object.keys(colors).find(
              (k) => colors[k as keyof typeof colors] === props.color
            )}
          </div>
          <div>{priceFormatters.naira.format(price)}</div>
          <div />
          <div style={{ letterSpacing: "-.75px" }}>Need a moment?</div>
          <div>
            Keep all your selections by saving this device to Your Saves, then
            come back anytime and pick up right where you left off.
          </div>
          <div onClick={() => props.addToCart({ profile: true })}>
            <div>
              <img src={assets.bookmark} alt="" />
            </div>
            <div>Save for later</div>
          </div>
        </div>
        <div>
          <div onClick={() => props.addToCart({ route: "/orders" })}>
            Add to Bag
          </div>
          <div onClick={() => props.addToCart({ route: "/checkout" })}>
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
