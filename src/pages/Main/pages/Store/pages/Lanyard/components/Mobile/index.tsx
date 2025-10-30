import "./style.css";
import Type from "./components/Type";
import Carousel from "./components/Carousel";

function Mobile({ ...props }) {
  return (
    <div id="store_lanyard_mobile_wrapper">
      <Type type={props.type} setType={props.setType} />
      <Carousel pageWidth={props.pageWidth} />
      <div></div>
    </div>
  );
}

export default Mobile;
