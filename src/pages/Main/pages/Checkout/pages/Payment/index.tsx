import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../../../assets";
import Request from "../../../../../../utils/requests";

function Payment({ ...props }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function pay() {
    if (loading) return;
    setLoading(true);

    Request.post({
      url_mod: "orders",
      body: {
        cart: props.cart,
        address: props.address,
        contact: props.contact,
      },
    })
      .then((res: any) => {
        Request.post({
          url_mod: "payment",
          body: {
            order_id: res.data.id,
            email: props.contact.email,
          },
        })
          .then((res: any) => {
            // navigate(props.route);

            window.location.href = res.data.data.authorization_url;
            toast.success("Payment processed successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    for (const key of Object.keys(props.address)) {
      if (props.address[key].length <= 2) {
        navigate("/checkout");
        return;
      }
    }

    for (const key of Object.keys(props.contact)) {
      if (key !== "guardian" && props.contact[key].length <= 2) {
        navigate("/checkout");
        return;
      }
    }
  }, [props.address, props.contact]);

  return (
    <div id="checkout_payment_wrapper">
      <h1>How do you want to pay?</h1>
      <img src={assets.paystack_logo} alt="" />
      <div />
      <button onClick={pay}>Continue to Paystack</button>
    </div>
  );
}

export default Payment;
