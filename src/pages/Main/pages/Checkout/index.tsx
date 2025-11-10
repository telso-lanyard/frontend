import z from "zod";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./style.scss";
import Summary from "./pages/Summary";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import Contact from "./components/Contact";
import order from "../../../../models/order";

function Checkout({ ...props }) {
  const [address, setAddress] = useState<z.infer<typeof order>["address"]>(
    Object.keys(order.shape.address.shape).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as any) as z.infer<typeof order>["address"]
  );

  const [contact, setContact] = useState<z.infer<typeof order>["contact"]>(
    Object.keys(order.shape.contact.shape).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as any) as z.infer<typeof order>["contact"]
  );


  return (
    <div id="checkout_wrapper">
      <Header total={props.total} />
      <Routes>
        <Route index element={<Navigate to="summary" replace />} />
        <Route path="summary" element={<Summary cart={props.cart} />} />
        <Route
          path="address"
          element={
            <Address
              cart={props.cart}
              address={address}
              setAddress={setAddress}
              contact={contact}
              setContact={setContact}
            />
          }
        />
        <Route
          path="payment"
          element={
            <Payment
              cart={props.cart}
              address={address}
              contact={contact}
              total={props.total}
            />
          }
        />
      </Routes>
      <Contact />
    </div>
  );
}

export default Checkout;
