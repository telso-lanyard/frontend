import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./style.scss";
import Overlay from "./Overlay";
import api from "../../../../utils/api";
import urls from "../../../../utils/urls";
import * as assets from "../../../../assets";
import { models } from "../../../../utils/data";

function Archive({ ...props }) {
  const [data, setData] = useState<
    {
      _id: string;
      type: string;
      name: string;
      media: string;
      created_at: string;
    }[]
  >([]);
  const [overlay, setOverlay] = useState<(typeof data)[0]>();

  const { data: latest } = useQuery<typeof data, Error>({
    queryKey: ["Posts", "Archive", { limit: 100 }],
    queryFn: () =>
      api
        .get("archive", { params: { limit: 100 } })
        .then((res) => res.data.documents),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (latest) setData(latest);
  }, [latest]);

  return (
    <>
      <div id="main_archive_wrapper">
        {props.pageWidth < 800 && (
          <header>
            <img src={assets.logo_red} alt="" />
            <h1>THE ARCHIVE</h1>
          </header>
        )}
        <div>
          {props.pageWidth >= 800 && (
            <nav>
              <header>
                <img src={assets.logo_red} alt="" />
                <h1>THE ARCHIVE</h1>
              </header>
              <ul>
                {models.map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </nav>
          )}
          <section>
            {data.map((el, i) => (
              <img
                key={i}
                src={`${urls.media}/${el.media}`}
                alt=""
                onClick={() => setOverlay(el)}
              />
            ))}
          </section>
        </div>
        <footer>
          Note: All units are early prototypes for those who love our products
          and want to be part of THE PIONEERs <br /> © 2025
        </footer>
      </div>
      {overlay && (
        <Overlay
          overlay={overlay}
          setOverlay={setOverlay}
          pageWidth={props.pageWidth}
        />
      )}
    </>
  );
}

export default Archive;
