import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import * as assets from "../../../../../../assets";
import api from "../../../../../../utils/api";

function Payment({ ...props }) {
  const navigate = useNavigate();

  const orderMutation = useMutation({
    mutationFn: () =>
      api
        .post("orders", {
          cart: props.cart,
          address: props.address,
          contact: props.contact,
        })
        .then((res) => res.data),

    onSuccess: (data) => payMutation.mutate(data),
  });

  const payMutation = useMutation({
    mutationFn: (data: any) =>
      api
        .post("payment", {
          order_id: data.id,
          email: props.contact.email,
        })
        .then((res) => res.data),

    onSuccess: (data) => {
      window.location.href = data.data.authorization_url;
      toast.success("Payment processed successfully");
    },
  });

  async function pay() {
    try {
      orderMutation.mutate();
    } catch (err) {
      console.log("Validation failed");
    }
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
