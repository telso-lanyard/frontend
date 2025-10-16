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
        <div>MADE TO MOVE WITH YOUR STORY.</div>
        <div>Wear the World.</div>
      </div>
      <div style={style_map.flex(["center", "center"])}>
        <img src={assets.lanyard_sample} alt="" />
      </div>
      <Link to="/discover">Learn More</Link>
      <div>Shop Now</div>
    </div>
  );
}

export default Lanyard;
