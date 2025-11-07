import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

function Lanyard({ ...props }) {
  const navigate = useNavigate();
  const [color, setColor] = useState();
  const [type, setType] = useState<"progression" | "elevation">();

  function addToCart(mods: { route?: string; profile?: boolean }) {
    if (!type && !color) return toast.info("Please select a type and color");
    if (!type) return toast.info("Please select a type");
    if (!color) return toast.info("Please select a color");

    props.setCart((prev: (typeof props.cart)[0]) => {
      const existingIndex = prev.findIndex(
        (item: (typeof prev)[0]) => item.type === type && item.color === color
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: (updated[existingIndex].count || 1) + 1,
        };
        return updated;
      } else {
        return [...prev, { type: type, color: color, count: 1 }];
      }
    });

    if (mods.profile) props.setProfile(mods.profile);

    if (mods.route)
      setTimeout(
        () => {
          navigate(mods.route || "/");
        },
        mods.profile ? 2000 : 0
      );
  }

  return props.pageWidth < 1000 ? (
    <Mobile
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      setCart={props.setCart}
      setProfile={props.setProfile}
      location={props.location}
      setLocation={props.setLocation}
      pageWidth={props.pageWidth}
      addToCart={addToCart}
    />
  ) : (
    <Desktop
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      setCart={props.setCart}
      setProfile={props.setProfile}
      location={props.location}
      setLocation={props.setLocation}
      addToCart={addToCart}
    />
  );
}

export default Lanyard;
