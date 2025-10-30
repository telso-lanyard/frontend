import { Link } from "react-router-dom";

import "./style.scss";
import * as images from "../../assets";
import style_map from "../../utils/style_map";

function Footer() {
  return (
    <div
      id="footer_wrapper"
      style={style_map.flex(["center", "center", "column"])}
    >
      <div style={style_map.flex(["center", "center"])}>
        <img src={images.logo} alt="" />
      </div>
      <div>This website is the property of TELSO LIMITED</div>
      <div style={style_map.flex(["center", "center"])}>
        <Link to="/">Home</Link>

        <div />
        <Link to="/about">About Us</Link>
        <div />
        <Link to="/contact">Contact Us</Link>
        <div />
        <Link to="/story">THE LANYARD - STORY</Link>
      </div>
    </div>
  );
}

export default Footer;
