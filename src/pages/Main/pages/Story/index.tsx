import * as images from "../../../../assets";
import Footer from "../../../../components/Footer";

function Story() {
  return (
    <div>
      <div style={{ marginBottom: "150px" }}>
        <img src={images.story} alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Story;
