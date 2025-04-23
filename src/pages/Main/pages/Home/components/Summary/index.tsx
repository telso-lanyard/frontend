import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import * as images from "../../../../../../assets";
import Input from "../../../../../../components/Input";
import style_map from "../../../../../../utils/style_map";
import Request from "../../../../../../utils/requests";

function Summary({ ...props }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState<{
    cart: [];
    contact: { name: string; phone: string; email: string; address: string };
  }>({
    contact: { name: "", phone: "", email: "", address: "" },
    cart: [],
  });

  useEffect(
    () => setOrder((prev) => ({ ...prev, cart: props.cart })),
    [props.cart]
  );

  function submit() {
    (["name", "phone", "email", "address"] as const).forEach((value) => {
      if (order.contact[value].length <= 3) {
        return toast.error(
          <div
            style={{
              fontSize: "var(--fs-sm)",
              padding: "3.75px 15px",
            }}
          >
            {`Invalid length for ${value} parameter in Contact Details`}
          </div>,
          {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 3000,
          }
        );
      }
    });

    if (order.cart.length <= 0)
      return toast.error(
        <div
          style={{
            fontSize: "var(--fs-sm)",
            padding: "3.75px 15px",
          }}
        >
          Cart is empty, please select an item
        </div>,
        {
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 3000,
        }
      );

    if (order) {
      toast.success(
        <div
          style={{
            fontSize: "var(--fs-sm)",
            padding: "3.75px 15px",
          }}
        >
          Your order is being processed
        </div>,
        {
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 3000,
        }
      );

      Request.post({
        url_mod: "orders",
        body: order,
      })
        .then(() =>
          navigate(
            `/transaction/${order.cart.reduce(
              (
                sum: number,
                item: { variant: { price: number; qty: number } }
              ) => sum + item.variant.price * item.variant.qty,
              0
            )}`
          )
        )
        .catch((error) => {
          console.error("Error posting order:", error);
          toast.error(
            <div
              style={{
                fontSize: "var(--fs-sm)",
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
    }
  }

  return (
    <div id="main_summary_wrapper" style={style_map.flex(["center", "center"])}>
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>Order Summary</div>
        <div style={style_map.flex(["flex-start", "flex-start"])}>
          <div>
            <div>Order Amount</div>
            <div>
              &#8358;
              {new Intl.NumberFormat().format(
                props.cart.reduce(
                  (
                    sum: number,
                    item: { variant: { price: number; qty: number } }
                  ) => sum + item.variant.price * item.variant.qty,
                  0
                )
              )}
            </div>
          </div>
          <div>
            <div>Order Quantity</div>
            <div>
              {new Intl.NumberFormat().format(
                props.cart.reduce(
                  (
                    sum: number,
                    item: { variant: { price: number; qty: number } }
                  ) => sum + item.variant.qty,
                  0
                )
              )}
            </div>
          </div>
        </div>
        <div>Contact Details</div>
        <div style={style_map.flex(["flex-start", "space-between"])}>
          <div>
            <div>
              Name <span>*</span>
            </div>
            <div>
              <Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrder((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, name: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div>
            <div>
              Phone <span>*</span>
            </div>
            <div>
              <Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrder((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div>
            <div>
              Email <span>*</span>
            </div>
            <div>
              <Input
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrder((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            Delivery Address <span>*</span>
          </div>
          <div>
            <textarea
              placeholder="Enter your Hall and Room Number"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setOrder((prev) => ({
                  ...prev,
                  contact: { ...prev.contact, address: e.target.value },
                }))
              }
            />
          </div>
        </div>

        <div>Review your order</div>
        <div>
          Please review your order carefully before submitting it for
          processing. {props.cart.length < 1 && "- Your cart is empty -"}
        </div>
        <div
          style={{
            ...style_map.flex(["flex-start", "flex-start", "column"]),
            display: props.cart.length >= 1 ? "flex" : "none",
          }}
        >
          <div style={style_map.flex(["center", "space-between"])}>
            <div>Item</div>
            <div>Unit price</div>
            <div>Qty</div>
            <div>Amount</div>
          </div>
          {props.cart.map((item: (typeof props.cart)[0], i: number) => (
            <div key={i} style={style_map.flex(["center", "space-between"])}>
              <div>
                {item.name.toUpperCase()} | {item.variant.name.toUpperCase()}
              </div>
              <div>
                &#8358;{new Intl.NumberFormat().format(item.variant.price)}
              </div>
              <div>{item.variant.qty}</div>
              <div>
                &#8358;
                {new Intl.NumberFormat().format(
                  item.variant.price * item.variant.qty
                )}
              </div>
            </div>
          ))}
          <div style={style_map.flex(["center", "space-between"])}>
            <div>Order Amount</div>
            <div>
              &#8358;
              {new Intl.NumberFormat().format(
                props.cart.reduce(
                  (
                    sum: number,
                    item: { variant: { price: number; qty: number } }
                  ) => sum + item.variant.price * item.variant.qty,
                  0
                )
              )}
            </div>
          </div>
        </div>
        <div style={style_map.flex(["center", "flex-start"])} onClick={submit}>
          <div style={style_map.flex(["center", "center"])}>
            <img src={images.send} alt="" />
          </div>
          <div>SUBMIT</div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
