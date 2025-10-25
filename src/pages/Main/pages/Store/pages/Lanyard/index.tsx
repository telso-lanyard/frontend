import { useState, useEffect } from "react";

import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

import * as assets from "../../../../../../assets";

function Lanyard({ ...props }) {
  const [type, setType] = useState<"progression" | "elevation">();
  const [bg_img, setBg_img] = useState(assets.lanyard_store_bg);

  useEffect(() => {
    if (!type) return;

    type == "elevation"
      ? setBg_img(assets.lanyard_store_bg_elevation)
      : setBg_img(assets.lanyard_store_bg_progression);
  }, [type]);

  return props.pageWidth < 1200 ? (
    <Mobile type={type} setType={setType} bg_img={bg_img} />
  ) : (
    <Desktop type={type} setType={setType} bg_img={bg_img} />
  );
}

export default Lanyard;
