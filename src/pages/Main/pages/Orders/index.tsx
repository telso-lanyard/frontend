import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../assets";
import { colors } from "../../../../utils/data";
import { price, priceFormatters } from "../../../../utils/data";

function Orders({ ...props }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.cart.length <= 0) navigate("/store");
  }, []);

  return (
    <div id="orders_wrapper">
      <div>
        Your bag total is{" "}
        {priceFormatters.naira.format(price * props.cart.length)}.
      </div>
      <div>Free delivery & free returns.</div>
      <Link to="checkout">Check out</Link>
      <div />
      <div>
        {props.cart.map(
          (el: { type: string; color: string; count: number }, i: number) => (
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
              </div>
              <div>
                THE LANYARD {el.type.charAt(0).toUpperCase() + el.type.slice(1)}{" "}
                {Object.keys(colors).find(
                  (k) => colors[k as keyof typeof colors] === el.color
                )}
              </div>
              <div>
                <div>
                  <div>{el.count}</div>
                  <div>
                    <img src={assets.arrow_down_grey} alt="" />
                  </div>
                </div>
                <div>{priceFormatters.naira.format(price)}</div>
              </div>
              <div
                onClick={() =>
                  props.setCart((prev: [typeof el]) =>
                    prev.filter((item) => item !== el)
                  )
                }
              >
                Remove
              </div>
            </div>
          )
        )}
      </div>
      <div />
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>Ships in 3-7 Business days.</div>
      </div>
      <div />
      <div>
        <div>
          <div>Subtotal:</div>
          <div>{priceFormatters.naira.format(price * props.cart.length)}</div>
        </div>
        <div>
          <div>Shipping:</div>
          <div>FREE</div>
        </div>
        <div>
          <div>Estimated tax for: Nigeria:</div>
          <div>₦ -</div>
        </div>
      </div>
      <div />
      <div>
        <div>Total</div>
        <div>{priceFormatters.naira.format(price * props.cart.length)}</div>
      </div>
      <div>Check Out</div>
    </div>
  );
}

export default Orders;
