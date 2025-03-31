import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import style_map from "../../../../utils/style_map";

function MobileMenu({ ...props }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      id="nav_mobile_menu_wrapper"
      style={style_map.flex(["center", "flex-start", "column"])}
    >
      {props.nav_links.map((el: { name: string; link: string }, i: number) => (
        <div
          key={i}
          onClick={() => {
            navigate(el.link);
            props.setmobileMenu(false);
          }}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
}

export default MobileMenu;
