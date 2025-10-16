import "./style.css";
import * as images from "../../../../../../assets";
import style_map from "../../../../../../utils/style_map";

function Landing() {
  return (
    <div id="main_landing_wrapper" style={style_map.flex(["center", "center"])}>
      <img
        src={images.landing_img}
        alt=""
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
    </div>
  );
}

export default Landing;
