import "./style.css";
import Type from "./components/Type";

function Mobile({ ...props }) {
  return (
    <div id="store_lanyard_mobile_wrapper">
      <Type type={props.type} setType={props.setType} />
      <div></div>
    </div>
  );
}

export default Mobile;
