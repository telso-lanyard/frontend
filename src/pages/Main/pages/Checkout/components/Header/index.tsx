import "./style.scss";
import { priceFormatters } from "../../../../../../utils/data";

function Header({ ...props }) {
  return (
    <header id="checkout_header_wrapper">
      <h1>Checkout</h1>
      <h2>{priceFormatters.naira.format(props.total)}</h2>
    </header>
  );
}

export default Header;
