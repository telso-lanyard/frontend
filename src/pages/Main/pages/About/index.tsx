import * as images from "../../../../assets";
import Footer from "../../../../components/Footer";

function About() {
  return (
    <div>
      <div style={{ marginBottom: "150px" }}>
        <img src={images.about} alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default About;
