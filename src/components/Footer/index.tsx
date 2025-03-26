import "./style.css";
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
      <div>This website is the property of TELSO LLC</div>
    </div>
  );
}

export default Footer;
