import "./style.css";
import * as assets from "../../../../../../assets";
import style_map from "../../../../../../utils/style_map";

function Hero() {
  function scroll() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  return (
    <div id="main_hero_wrapper">
      <div style={style_map.flex(["center", "center"])}>
        <img
          src={assets.hero_bg}
          alt=""
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
      </div>
      <div style={style_map.flex(["center", "flex-start"])} onClick={scroll}>
        <div style={style_map.flex(["center", "center"])}>
          <img src={assets.arrow_down} alt="scroll" />
        </div>
        <div>START</div>
      </div>
      <div style={style_map.flex(["center", "center"])} onClick={scroll}>
        <img src={assets.keyboard_down} alt="scroll" />
      </div>
    </div>
  );
}

export default Hero;
