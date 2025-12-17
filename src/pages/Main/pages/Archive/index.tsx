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
  const [overlay, setOverlay] = useState<string>();
  const [sold, setSold] = useState<boolean | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);

  const { data: latest } = useQuery<typeof data, Error>({
    queryKey: ["Posts", "Archive", { limit: 100, sold, type }],
    queryFn: () =>
      api
        .get("archive", { params: { limit: 100, sold, type } })
        .then((res) => res.data.documents),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (latest) setData(latest);
    console.log(latest);
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
                <li>sort by:</li>
                <li
                  style={{
                    color: sold == undefined ? "#D41F27" : "",
                  }}
                  onClick={() => setSold(undefined)}
                >
                  all
                </li>
                <li
                  style={{
                    color: sold === false ? "#D41F27" : "",
                  }}
                  onClick={() => setSold(false)}
                >
                  catalogue
                </li>
                <li
                  style={{
                    color: sold ? "#D41F27" : "",
                  }}
                  onClick={() => setSold(true)}
                >
                  archived
                </li>
              </ul>
              <ul>
                {models.map((el, i) => (
                  <li
                    key={i}
                    style={{
                      color: type == el ? "#D41F27" : "",
                    }}
                    onClick={() => setType(type == el ? undefined : el)}
                  >
                    {el}
                  </li>
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
                onClick={() => setOverlay(el._id)}
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
