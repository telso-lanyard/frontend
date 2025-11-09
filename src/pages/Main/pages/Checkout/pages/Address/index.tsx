import { useState } from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import order from "../../../../../../models/order";
import * as assets from "../../../../../../assets";
import Input from "../../../../../../components/Input";

function Address({ ...props }) {
  const [guardianToggle, setGuardianToggle] = useState(false);

  return (
    <div id="checkout_address_wrapper">
      <h1>Where should we send your order?</h1>
      <h2>Enter your name & address:</h2>
      <section>
        {Object.keys(order.shape.address.shape).map((el, i) => (
          <Input
            key={i}
            type="text"
            placeholder={el}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setAddress((prev: typeof props.address) => ({
                ...prev,
                [el]: e.target.value,
              }))
            }
          />
        ))}
      </section>
      <section>
        <h2>What’s your contact information?</h2>
        <Input
          type="email"
          placeholder="Email Address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setContact((prev: typeof props.address) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <p>
          We’ll email you a receipt and send your order updates to your mobile
          phone via SMS.
        </p>
        <Input
          type="number"
          placeholder="Phone Number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setContact((prev: typeof props.address) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
        <p>
          The phone number you enter can’t be changed after you place your
          order, so please make sure it’s correct.
        </p>
      </section>
      <section>
        <p>Share shipping updates with someone else:</p>
        {!guardianToggle && (
          <button onClick={() => setGuardianToggle(true)}>
            <p>Enter an email address</p>
            <img src={assets.arrow_down_red} alt="" />
          </button>
        )}
        {guardianToggle && (
          <>
            <Input
              placeholder="Email Address (Optional)"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setContact((prev: typeof props.address) => ({
                  ...prev,
                  guardian: e.target.value,
                }))
              }
            />
            <p>
              Shipping notifications will be sent to the email address you
              enter.
            </p>
          </>
        )}
      </section>
      <Link to="/checkout/payment">Continue to Payment</Link>
    </div>
  );
}

export default Address;
