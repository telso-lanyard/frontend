import * as images from "../../../../assets";
import Footer from "../../../../components/Footer";
import style_map from "../../../../utils/style_map";

function Story({ ...props }) {
  return (
    <div style={{ background: "black" }}>
      <div
        style={{
          ...style_map.flex(["center", "center"]),
          paddingBottom: props.pageWidth > 800 ? "125px" : "50px",
        }}
      >
        <img
          src={images[props.pageWidth > 800 ? "story" : "story_mobile"]}
          alt=""
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Story;
