import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../assets";
import style_map from "../../../../../../../../utils/style_map";
import Input from "../../../../../../../../components/Input";
import urls from "../../../../../../../../utils/urls";
import Request from "../../../../../../../../utils/requests";

function Item({ ...props }) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({
    _id: props.item._id,
    name: props.item.name,
    variant: props.variant,
  });

  useEffect(() => {
    data.variant.qty = 0;
    document.body.style.overflow = "hidden";

    Request.get({
      url_mod: "items",
    })
      .then((res) => {
        setCount(
          res.data.documents
            .filter((i: any) => i.name == props.item.name)[0]
            .variants.filter((i: any) => i.name == props.variant.name)[0].qty
        );
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        toast.error(
          <div
            style={{
              fontSize: "var(--fs--1)",
              padding: "3.75px 15px",
            }}
          >
            {`${error.response.data.message}`}
          </div>,
          {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 3000,
          }
        );
      });

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
          <img src={`${urls.media}${props.variant.media}`} alt="" />
        </div>
        <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
              <div>
                {props.item.name.toUpperCase()} |{" "}
                {props.variant.name.toUpperCase()}
              </div>
              <div>
                &#8358;{new Intl.NumberFormat().format(props.variant.price)}
              </div>
            </div>
            <div
              style={style_map.flex(["center", "center"])}
              onClick={() => props.setVariant(undefined)}
            >
              <img src={assets.close} alt="" />
            </div>
          </div>
          <div style={{ display: "none" }}>
            <div>Select Variant</div>
            {/* <div>
              {props.item.variants.map((variant: string, i: number) => (
                <div key={i}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </div>
              ))}
            </div> */}
          </div>
          <div>
            <div>Select Quantity</div>
            <div>
              <Input
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if (value > count)
                    toast.error(
                      <div
                        style={{
                          fontSize: "var(--fs--1)",
                          padding: "3.75px 15px",
                        }}
                      >
                        {`You can't select more than ${count}`}
                      </div>,
                      {
                        hideProgressBar: true,
                        closeOnClick: true,
                        autoClose: 3000,
                      }
                    );

                  setData((prev) => ({
                    ...prev,
                    variant: { ...prev.variant, qty: value },
                  }));
                }}
              />
            </div>
          </div>
          <div
            style={style_map.flex(["center", "flex-start"])}
            onClick={() => {
              if (data.variant.qty <= 0)
                return toast.error(
                  <div
                    style={{
                      fontSize: "var(--fs--1)",
                      padding: "3.75px 15px",
                    }}
                  >
                    Please select a viable quantity
                  </div>,
                  {
                    hideProgressBar: true,
                    closeOnClick: true,
                    autoClose: 3000,
                  }
                );

              if (data.variant.qty > count)
                return toast.error(
                  <div
                    style={{
                      fontSize: "var(--fs--1)",
                      padding: "3.75px 15px",
                    }}
                  >
                    {`You can't select more than ${count}`}
                  </div>,
                  {
                    hideProgressBar: true,
                    closeOnClick: true,
                    autoClose: 3000,
                  }
                );

              props.setCart((prev: any) => [...prev, data]);
              props.setVariant(undefined);
              toast.success(
                <div
                  style={{
                    fontSize: "var(--fs--1)",
                    padding: "3.75px 15px",
                  }}
                >
                  The item has been added to your cart successfully
                </div>,
                { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
              );
            }}
          >
            <div style={style_map.flex(["center", "center"])}>
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
