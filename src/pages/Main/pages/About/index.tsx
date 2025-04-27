import * as images from "../../../../assets";
import Footer from "../../../../components/Footer";
import style_map from "../../../../utils/style_map";

function About() {
  return (
    <div style={{ background: "black" }}>
      <div
        style={{
          ...style_map.flex(["center", "center"]),
          paddingBottom: "125px",
        }}
      >
        <img
          src={images.about}
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

export default About;
