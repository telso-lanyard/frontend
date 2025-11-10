import "./style.scss";
import * as assets from "../../../../../../assets";

function Payment({ ...props }) {
  console.log(props);
  
  return (
    <div id="checkout_payment_wrapper">
      <h1>How do you want to pay?</h1>
      <img src={assets.paystack_logo} alt="" />
      <div />
      <button>Continue to Paystack</button>
    </div>
  );
}

export default Payment;
