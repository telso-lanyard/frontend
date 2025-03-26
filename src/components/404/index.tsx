import "./style.css";
import style_map from "../../utils/style_map";

function NotFound({ ...props }) {
  return (
    <div
      id="not_found_wrapper"
      style={{
        ...style_map.flex(["center", "center", "column"]),
        ...props.style,
      }}
    >
      <div style={{ transform: "translateY(-100%)" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
