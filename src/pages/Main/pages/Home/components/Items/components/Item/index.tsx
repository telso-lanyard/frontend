import { useState, useEffect } from "react";

import "./style.css";
import * as assets from "../../../../../../../../assets";
import style_map from "../../../../../../../../utils/style_map";
import Input from "../../../../../../../../components/Input";

function Item({ ...props }) {
  const [data, setData] = useState({
    id: props.item._id,
    name: props.item.name,
    qty: 0,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div id="main_item_wrapper" style={style_map.flex(["center", "center"])}>
      <div
        style={
          props.pageWidth > 850
            ? style_map.flex(["flex-start", "space-between"])
            : style_map.flex(["center", "flex-start", "column"])
        }
      >
        <div style={style_map.flex(["center", "center"])}>
          <img src={assets.product_img_0} alt="" />
        </div>
        <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
              <div>{props.item.name.toUpperCase()}</div>
              <div>&#8358;{props.item.price}</div>
            </div>
            <div
              style={style_map.flex(["center", "center"])}
              onClick={() => props.setItem(undefined)}
            >
              <img src={assets.close} alt="" />
            </div>
          </div>
          <div style={{ display: "none" }}>
            <div>Select Variant</div>
            <div>
              {props.item.variants.map((variant: string, i: number) => (
                <div key={i}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Select Quantity</div>
            <div>
              <Input
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData((prev) => ({ ...prev, qty: Number(e.target.value) }))
                }
              />
            </div>
          </div>
          <div style={style_map.flex(["center", "flex-start"])}>
            <div
              style={style_map.flex(["center", "center"])}
              onClick={() => props.setCart((prev: any) => [...prev, data])}
            >
              <img src={assets.add_to_cart_white} alt="" />
            </div>
            <div>Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
