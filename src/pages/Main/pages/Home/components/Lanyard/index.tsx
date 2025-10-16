import { Link } from "react-router-dom";

import "./style.css";
import * as assets from "../../../../../../assets";
import style_map from "../../../../../../utils/style_map";

function Lanyard() {
  return (
    <div
      id="home_lanyard_wrapper"
      style={style_map.flex(["center", "flex-end", "column"])}
    >
      <div>
        <div>THE LANYARD</div>
        <div>Wear the World.</div>
      </div>
      <div style={style_map.flex(["center", "center"])}>
        <img src={assets.lanyard_sample} alt="" />
      </div>
      <Link to="/discover">Discover the story →</Link>
      <div>Shop Now</div>
    </div>
  );
}

export default Lanyard;
