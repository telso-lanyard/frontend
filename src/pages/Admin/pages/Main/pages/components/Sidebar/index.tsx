import { Link, useLocation } from "react-router-dom";

import "./style.css";
import style_map from "../../../../../../../utils/style_map";
import * as icons from "../../../../../../../assets";

function Sidebar({ ...props }) {
  const location = useLocation();

  return (
    <div
      id="admin_main_sidebar_wrapper"
      style={style_map.flex(["flex-start", "flex-start", "column"])}
    >
      {props.nav_links.map(
        (el: { icon: string; link: string; name: string }, i: number) => (
          <Link
            to={el.link}
            key={i}
            style={{
              ...style_map.flex(["center", "flex-start"]),
              background:
                location.pathname === el.link ||
                location.pathname.includes(el.name.toLowerCase())
                  ? "black"
                  : "white",
            }}
          >
            <div style={style_map.flex(["center", "center"])}>
              <img
                src={
                  icons[
                    `${el.icon}${
                      location.pathname === el.link ||
                      location.pathname.includes(el.name.toLowerCase())
                        ? "_white"
                        : ""
                    }` as keyof typeof icons
                  ]
                }
                alt=""
              />
            </div>
            <div
              style={{
                color:
                  location.pathname === el.link ||
                  location.pathname.includes(el.name.toLowerCase())
                    ? "white"
                    : "black",
              }}
            >
              {el.name}
            </div>
          </Link>
        )
      )}
    </div>
  );
}

export default Sidebar;
