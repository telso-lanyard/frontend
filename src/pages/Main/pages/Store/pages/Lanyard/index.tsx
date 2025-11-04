import { useState } from "react";

import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

function Lanyard({ ...props }) {
  const [type, setType] = useState<"progression" | "elevation">();
  const [color, setColor] = useState();

  return props.pageWidth < 1000 ? (
    <Mobile
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      setCart={props.setCart}
      setProfile={props.setProfile}
      pageWidth={props.pageWidth}
    />
  ) : (
    <Desktop
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      setCart={props.setCart}
      setProfile={props.setProfile}
    />
  );
}

export default Lanyard;
