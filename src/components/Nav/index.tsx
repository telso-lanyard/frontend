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
      {/* <div
        className="nav_burger"
        style={{
          ...style_map.flex(["center", "center"]),
          display: props.pageWidth < 850 ? "flex" : "none",
        }}
      >
        <img src={icons.menu} alt="" />
      </div> */}
    </div>
  );
}

export default Nav;
