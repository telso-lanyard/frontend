import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import "./style.css";
import Item from "./components/Item";
import * as assets from "../../../../../../assets";
import Request from "../../../../../../utils/requests";
import style_map from "../../../../../../utils/style_map";

function Items({ ...props }) {
  const [items, setItems] = useState<
    {
      _id: string;
      name: string;
      variants: { name: string; price: number; qty: number }[];
    }[]
  >([]);
  const [variant, setVariant] = useState<{ name: string; price: number; qty: number; }>();

  const [item, setItem] = useState({ _id: "", name: "" });

  useEffect(() => {
    Request.get({
      url_mod: "items",
    })
      .then((res) => {
        setItems(res.data.documents);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        toast.error(error.response.data.message);
      });
  }, []);

  return (
    <>
      <div
        id="main_items_wrapper"
        style={
          props.pageWidth < 850
            ? style_map.flex(["center", "space-between"])
            : style_map.flex(["center", "flex-start", "column"])
        }
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={
              props.pageWidth < 850
                ? style_map.flex(["center", "flex-start", "column"])
                : style_map.flex(["center", "center"])
            }
          >
            {item.variants.map((variant, i: number) => (
              <div
                key={i}
                onClick={() => {
                  const { variants, ...specifiedItem } = item;
                  setItem(specifiedItem);
                  setVariant(variant);
                }}
              >
                <div style={style_map.flex(["center", "center"])}>
                  <img src={assets["product_img_0"]} alt="" />
                </div>
                <div style={style_map.flex(["center", "space-between"])}>
                  <div
                    style={style_map.flex([
                      "flex-start",
                      "flex-start",
                      "column",
                    ])}
                  >
                    <div>
                      {item.name.toUpperCase()} | {variant.name.toUpperCase()}
                    </div>
                    <div>
                      &#8358;{new Intl.NumberFormat().format(variant.price)}
                    </div>
                  </div>
                  <div style={style_map.flex(["center", "center"])}>
                    <img src={assets.add_to_cart} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {variant && (
        <Item
          item={item}
          variant={variant}
          setVariant={setVariant}
          setCart={props.setCart}
          pageWidth={props.pageWidth}
        />
      )}
    </>
  );
}

export default Items;
