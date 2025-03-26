import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import "./style.css";
import Item from "./components/Item";
import * as assets from "../../../../../../assets";
import Request from "../../../../../../utils/requests";
import style_map from "../../../../../../utils/style_map";

function Items({ ...props }) {
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);
  const [item, setItem] = useState<{ name: string; price: number }>();

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
        style={style_map.flex(["flex-start", "center"])}
      >
        {items.map((item, i) => (
          <div key={i} onClick={() => setItem(item)}>
            <div style={style_map.flex(["center", "center"])}>
              <img src={assets["product_img_0"]} alt="" />
            </div>
            <div style={style_map.flex(["center", "space-between"])}>
              <div
                style={style_map.flex(["flex-start", "flex-start", "column"])}
              >
                <div>{item.name.toUpperCase()}</div>
                <div>&#8358;{item.price}</div>
              </div>
              <div style={style_map.flex(["center", "center"])}>
                <img src={assets.add_to_cart} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {item && (
        <Item
          item={item}
          setItem={setItem}
          setCart={props.setCart}
          pageWidth={props.pageWidth}
        />
      )}
    </>
  );
}

export default Items;
