import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./style.scss";
import Request from "../../../../../../../../utils/requests";
import style_map from "../../../../../../../../utils/style_map";

function Details({ ...props }) {
  const location = useLocation();
  const [order, setOrder] = useState<{
    _id: string;
    trackID: number;
    contact: { name: string; phone: string; address: string; email: string };
    createdAt: string;
    amount: number;
    paid: boolean;
    delivered: boolean;
    cart: {
      name: string;
      variant: { name: string; price: number; qty: number };
    }[];
  }>();

  function fetch() {
    Request.get({
      url_mod: `orders/${
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      }`,
      token: props.userToken,
    })
      .then((res) => {
        setOrder(res.data.documents[0]);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
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
  }

  function update(id: string = "", data: {}) {
    Request.patch({
      url_mod: `orders/${id}`,
      token: props.userToken,
      body: data,
    })
      .then(() => {
        fetch();

        toast.success(
          <div
            style={{
              fontSize: "var(--fs--1)",
              padding: "3.75px 15px",
            }}
          >
            Order updated successfully
          </div>,
          { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
        );
      })
      .catch((error) => {
        console.error("Error updating orders:", error);
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
  }

  useEffect(() => fetch(), []);

  return (
    <div
      id="admin_orders_details_wrapper"
      style={style_map.flex(["flex-start", "flex-start", "column"])}
    >
      <div style={style_map.flex(["flex-start", "space-between"])}>
        <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
          {order?.amount && (
            <div>&#8358;{new Intl.NumberFormat().format(order?.amount)}</div>
          )}
          <div>
            {order?.contact.name} &nbsp;-&nbsp; {order?.trackID}
          </div>
        </div>
        <div>
          {order?.createdAt &&
            new Date(order?.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
      </div>
      <div style={style_map.flex(["flex-start", "flex-end"])}>
        <div
          style={{
            color: order?.paid ? "white" : "black",
            background: order?.paid ? "black" : "transparent",
          }}
          onClick={() => update(order?._id, { ...order, paid: true })}
        >
          Paid
        </div>
        <div
          style={{
            color: order?.delivered ? "white" : "black",
            background: order?.delivered ? "black" : "transparent",
          }}
          onClick={() => update(order?._id, { ...order, delivered: true })}
        >
          Delivered
        </div>
      </div>
      <div>
        <div style={style_map.flex(["flex-start", "flex-start"])}>
          <div>{order?.contact.phone}</div>
          <div>
            <a href={`mailto:${order?.contact.email}`}>
              {order?.contact.email}
            </a>
          </div>
        </div>
        <div>{order?.contact.address}</div>
      </div>
      {order?.cart.map((el, i) => (
        <div key={i}>
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <div>
              {el.name.toUpperCase()} | {el.variant.name.toUpperCase()}
            </div>
            <div>{el.variant.qty}</div>
          </div>
          <div>&#8358;{new Intl.NumberFormat().format(el.variant.price)}</div>
        </div>
      ))}
    </div>
  );
}

export default Details;
