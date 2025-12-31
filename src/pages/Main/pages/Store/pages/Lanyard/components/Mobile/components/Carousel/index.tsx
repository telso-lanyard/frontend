import { useRef, useState, useEffect } from "react";

import "./style.scss";
import * as assets from "../../../../../../../../../../assets";

function Carousel({ ...props }) {
  const imgcontainerRef = useRef<HTMLDivElement>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    const container = imgcontainerRef.current;
    if (!container) return;

    const images = Array.from(container.children);
    if (!images.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = images.indexOf(entry.target);
            setActiveImgIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    images.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="store_lanyard_mobile_carousel_wrapper">
      <div>
        {props.type == "progression"
          ? "Beyond form."
          : "Forward, with purpose."}
      </div>
      <div>
        <div ref={imgcontainerRef}>
          {Array(4)
            .fill("")
            .map((_, i) => (
              <img
                src={
                  assets[
                    `lanyard_store_bg_${props.type || "elevation"}_2_${
                      i + 1
                    }` as keyof typeof assets
                  ]
                }
                alt=""
              />
            ))}
        </div>
        <div>
          {Array(4)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                style={{
                  width: activeImgIndex == i ? "30px" : "7.5px",
                  backgroundColor: activeImgIndex == i ? "black" : "#c0c0c0",
                  cursor: activeImgIndex == i ? "default" : "pointer",
                }}
                onClick={() =>
                  imgcontainerRef.current?.scrollTo({
                    left: i * imgcontainerRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
