import "./style.css";
import * as assets from "../../assets";
import style_map from "../../utils/style_map";

function Nav({ ...props }) {
  return (
    <div
      id="nav_wrapper"
      style={{ ...props.style, ...style_map.flex(["center", "space-between"]) }}
    >
      <div style={style_map.flex(["center", "center"])}>
        <img src={assets.logo_white} alt="" />
      </div>
      {/* <div style={style_map.flex(["center", "center"])}>
        <img src={assets.cart} alt="" />
      </div> */}
    </div>
  );
}

export default Nav;
