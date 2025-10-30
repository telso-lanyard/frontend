import "./style.scss";
import style_map from "../../../../../../../../../../utils/style_map";

function Type({ ...props }) {
  return (
    <div
      id="store_lanyard_desktop_type_wrapper"
      style={style_map.flex(["center", "center", "column"])}
    >
      {["progression", "elevation"].map((type, i) => (
        <div
          key={i}
          onClick={() => props.setType(type)}
          style={{
            border: `${props.type == type ? 2 : 1}px solid #b3b3b3`,
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      ))}
    </div>
  );
}

export default Type;
