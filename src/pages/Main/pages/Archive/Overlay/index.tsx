import { useRef, useState, useEffect } from "react";

import "./style.scss";
import api from "../../../../../utils/api";
import urls from "../../../../../utils/urls";
import * as assets from "../../../../../assets";
import { useQuery } from "@tanstack/react-query";
import { priceFormatters } from "../../../../../utils/data";
// import { price, priceFormatters } from "../../../../../utils/data";

function Overlay({ ...props }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const close_btn = useRef<HTMLButtonElement>(null);
  const imgcontainerRef = useRef<HTMLDivElement>(null);
  const [overlayPos, setOverlayPos] = useState({ right: 0, top: 0 });
  const [close_btnPos, setClose_btnPos] = useState({ width: 0 });
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [data, setData] = useState<{
    _id: string;
    type: string;
    name: string;
    media: string[];
    sold?: boolean;
    created_at: string;
  }>({
    _id: "",
    type: "",
    name: "",
    media: [],
    sold: undefined,
    created_at: "",
  });

  const { data: latest } = useQuery<typeof data, Error>({
    queryKey: ["Post", "Archive"],
    queryFn: () =>
      api.get(`archive/${props.overlay}`).then((res) => res.data.documents[0]),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (latest) setData(latest);
  }, [latest]);

  useEffect(() => {
    if (!overlayRef.current || !close_btn.current) return;

    const { top, left, width } = overlayRef.current.getBoundingClientRect();
    setOverlayPos({ right: left + width, top });

    setClose_btnPos({
      width: close_btn.current?.getBoundingClientRect().width,
    });
  }, [props.pageWidth]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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
  }, [data.media]);

  return (
    <div id="main_archive_overlay_wrapper">
      <div className="bg" onClick={() => props.setOverlay(undefined)} />
      <button
        style={{
          left: overlayPos.right - close_btnPos.width - 1.5,
          top: overlayPos.top + 2.5,
        }}
        ref={close_btn}
        className="close_btn"
        onClick={() => props.setOverlay(undefined)}
      >
        <img src={assets.close} alt="" />
      </button>
      <section ref={overlayRef}>
        <h1>{data.name}</h1>
        <div ref={imgcontainerRef}>
          {data.media.map((el, i) => (
            <img key={i} src={`${urls.media}/${el}`} alt="" />
          ))}
        </div>
        <div>
          {data.media.map((_, i) => (
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
        <div style={{ display: data.sold ? "none" : "flex" }}>
          <p>{data.type}</p>
          {/* <p>{priceFormatters.naira.format(price)}</p> */}
          <p>{priceFormatters.naira.format(10899)}</p>
        </div>
        <button style={{ display: data.sold ? "none" : "block" }}>
          ACQUIRE
        </button>
        {data.sold && (
          <p>
            RELEASED{" "}
            {new Date(data.created_at)
              .toLocaleString("en-US", { month: "short", year: "numeric" })
              .toUpperCase()}{" "}
            [ARCHIVED]
          </p>
        )}
      </section>
    </div>
  );
}

export default Overlay;
