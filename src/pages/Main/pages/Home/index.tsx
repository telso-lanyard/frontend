import { useState, useEffect } from "react";

import Landing from "./components/Landing";
import Lanyard from "./components/Lanyard";
import Nav from "../../../../components/Nav";

function Home({ ...props }) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // let prevScrollY = 0;
    let prevBodyStyles: Partial<CSSStyleDeclaration> = {};

    if (!loaded) {
      // prevScrollY = window.scrollY || window.pageYOffset || 0;

      prevBodyStyles = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };

      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      window.scrollTo(0, 0);

      body.style.position = "fixed";
      body.style.top = "0";
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      const scrollbarGap =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

      body.style.overflow = "hidden";
      html.style.overflow = "hidden";

      html.style.scrollBehavior = prevScrollBehavior;

      return () => {
        body.style.position = prevBodyStyles.position || "";
        body.style.top = prevBodyStyles.top || "";
        body.style.left = prevBodyStyles.left || "";
        body.style.right = prevBodyStyles.right || "";
        body.style.width = prevBodyStyles.width || "";
        body.style.overflow = prevBodyStyles.overflow || "";
        body.style.paddingRight = prevBodyStyles.paddingRight || "";
        html.style.overflow = "";
      };
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      html.style.overflow = "";
    }
  }, [loaded]);

  return (
    <>
      <Nav loaded={loaded} pageWidth={props.pageWidth} />
      <Landing setLoaded={setLoaded} />
      <Lanyard />
    </>
  );
}

export default Home;
