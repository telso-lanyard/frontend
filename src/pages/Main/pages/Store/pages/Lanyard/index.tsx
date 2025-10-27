import { useState } from "react";

import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

function Lanyard({ ...props }) {
  const [type, setType] = useState<"progression" | "elevation">();

  return props.pageWidth < 1200 ? (
    <Mobile type={type} setType={setType} />
  ) : (
    <Desktop type={type} setType={setType} />
  );
}

export default Lanyard;
