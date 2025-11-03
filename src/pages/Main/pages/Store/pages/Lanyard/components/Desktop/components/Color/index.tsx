import "./style.scss";
import { colors } from "../../../../../../../../../../utils/data";

function Color({ ...props }) {
  return (
    <div id="store_lanyard_desktop_color_wrapper">
      <div>
        Finish. <span>Pick your favourite.</span>
      </div>
      <div>
        Color -{" "}
        {Object.keys(colors).find(
          (k) => colors[k as keyof typeof colors] === props.color
        )}
      </div>
      <div>
        {Object.values(colors).map((color, i) => (
          <div
            key={i}
            style={{
              background: `#${color}`,
              border: `2px solid ${props.color == color ? "#b3b3b3" : "#FFF"}`,
            }}
            onClick={() => props.setColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default Color;
