import "./style.css";
import Type from "./components/Type";
import Color from "./components/Color";
import Carousel from "./components/Carousel";
import Checkout from "./components/Checkout";

function Mobile({ ...props }) {
  return (
    <div id="store_lanyard_mobile_wrapper">
      <Type type={props.type} setType={props.setType} />
      <Carousel type={props.type} pageWidth={props.pageWidth} />
      <Color type={props.type} color={props.color} setColor={props.setColor} />
      <Checkout
        type={props.type}
        color={props.color}
        setCart={props.setCart}
        setProfile={props.setProfile}
      />
    </div>
  );
}

export default Mobile;
