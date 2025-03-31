import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.css";
import * as assets from "../../assets";
import style_map from "../../utils/style_map";
import MobileMenu from "./components/MobileMenu";

function Nav({ ...props }) {
  const location = useLocation();
  const [mobileMenu, setmobileMenu] = useState<boolean>(false);

  return (
    <>
      <div
        id="nav_wrapper"
        style={{
          ...props.style,
          ...style_map.flex(["center", "space-between"]),
        }}
      >
        <div style={style_map.flex(["center", "center"])}>
          <img src={assets.logo_white} alt="" />
        </div>
        {location.pathname.split("/").includes("admin") &&
          !location.pathname.split("/").includes("auth") &&
          props.pageWidth < 850 && (
            <div
              style={style_map.flex(["center", "center"])}
              onClick={() => setmobileMenu(!mobileMenu)}
            >
              <img
                src={
                  assets[
                    `${
                      mobileMenu ? "close_white" : "menu"
                    }` as keyof typeof assets
                  ]
                }
                alt=""
              />
            </div>
          )}
      </div>
      {mobileMenu && props.pageWidth < 850 && (
        <MobileMenu nav_links={props.nav_links} setmobileMenu={setmobileMenu} />
      )}
    </>
  );
}

export default Nav;
