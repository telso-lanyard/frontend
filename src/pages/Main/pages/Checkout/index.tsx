import { Routes, Route, Navigate } from "react-router-dom";

import "./style.scss";
import Summary from "./pages/Summary";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import Contact from "./components/Contact";

function Checkout({ ...props }) {
  return (
    <div id="checkout_wrapper">
      <Header total={props.total} />
      <Routes>
        <Route index element={<Navigate to="summary" replace />} />
        <Route path="summary" element={<Summary cart={props.cart} />} />
        <Route path="address" element={<Address cart={props.cart} />} />
        <Route path="payment" element={<Payment cart={props.cart} />} />
      </Routes>
      <Contact />
    </div>
  );
}

export default Checkout;
