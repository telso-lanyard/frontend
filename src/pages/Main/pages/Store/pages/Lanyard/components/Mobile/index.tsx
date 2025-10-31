import "./style.css";
import Type from "./components/Type";
import Color from "./components/Color";
import Carousel from "./components/Carousel";

function Mobile({ ...props }) {
  return (
    <div id="store_lanyard_mobile_wrapper">
      <Type type={props.type} setType={props.setType} />
      <Carousel type={props.type} pageWidth={props.pageWidth} />
      <Color type={props.type} color={props.color} setColor={props.setColor} />
      <div></div>
    </div>
  );
}

export default Mobile;
