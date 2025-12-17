// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./style.scss";
// import Request from "../../../../../../../../utils/api";
import style_map from "../../../../../../../../utils/style_map";

function Main() {
  const [orders, _] = useState<
    {
      _id: string;
      trackID: number;
      contact: { name: string };
      createdAt: string;
      amount: number;
      paid: boolean;
      delivered: boolean;
    }[]
  >([]);

  // function fetch() {
  //   Request.get({
  //     url_mod: "orders",
  //     token: props.userToken,
  //   })
  //     .then((res) => {
  //       setOrders(
  //         res.data.documents.sort(
  //           (a: (typeof orders)[0], b: (typeof orders)[0]) => {
  //             return a.delivered === b.delivered ? 0 : a.delivered ? 1 : -1;
  //           }
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching orders:", error);
  //       toast.error(
  //         <div
  //           style={{
  //             fontSize: "var(--fs--1)",
  //             padding: "3.75px 15px",
  //           }}
  //         >
  //           {`${error.response.data.message}`}
  //         </div>,
  //         {
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           autoClose: 3000,
  //         }
  //       );
  //     });
  // }

  // function update(id: string, data: {}) {
  //   Request.patch({
  //     url_mod: `orders/${id}`,
  //     token: props.userToken,
  //     body: data,
  //   })
  //     .then(() => {
  //       fetch();
  //       toast.success(
  //         <div
  //           style={{
  //             fontSize: "var(--fs--1)",
  //             padding: "3.75px 15px",
  //           }}
  //         >
  //           Order updated successfully
  //         </div>,
  //         { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating orders:", error);
  //       toast.error(
  //         <div
  //           style={{
  //             fontSize: "var(--fs--1)",
  //             padding: "3.75px 15px",
  //           }}
  //         >
  //           {`${error.response.data.message}`}
  //         </div>,
  //         {
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           autoClose: 3000,
  //         }
  //       );
  //     });
  // }

  // useEffect(() => fetch(), []);

  return (
    <div
      id="admin_orders_main_wrapper"
      style={style_map.flex(["flex-start", "flex-start", "column"])}
    >
      {orders.map((order, i: number) => (
        <div
          key={i}
          style={style_map.flex(["flex-start", "flex-start", "column"])}
        >
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <div>
              <div>&#8358;{new Intl.NumberFormat().format(order.amount)}</div>
              <div>
                {order.contact.name} &nbsp;-&nbsp; {order.trackID}
              </div>
            </div>
            <div>
              {new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <Link to={`details/${order._id}`}>View</Link>
            <div style={style_map.flex(["flex-start", "flex-end"])}>
              <div
                style={{
                  color: order.paid ? "white" : "black",
                  background: order.paid ? "black" : "transparent",
                }}
                // onClick={() => update(order._id, { ...order, paid: true })}
              >
                Paid
              </div>
              <div
                style={{
                  color: order.delivered ? "white" : "black",
                  background: order.delivered ? "black" : "transparent",
                }}
                // onClick={() => update(order._id, { ...order, delivered: true })}
              >
                Delivered
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Main;
