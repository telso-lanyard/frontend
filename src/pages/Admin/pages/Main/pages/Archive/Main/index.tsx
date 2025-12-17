import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./style.scss";
import api from "../../../../../../../utils/api";
import urls from "../../../../../../../utils/urls";
import * as icons from "../../../../../../../assets";

function Main() {
  const [data, setData] = useState<
    { _id: string; media: string; name: string }[]
  >([]);

  const { data: latest } = useQuery<typeof data, Error>({
    queryKey: ["Posts", "Archive", { limit: 50 }],
    queryFn: () =>
      api
        .get("archive", { params: { limit: 50 } })
        .then((res) => res.data.documents),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (latest) setData(latest);
  }, [latest]);

  return (
    <div id="admin_main_wrapper">
      <Link to="new">New</Link>
      <div>
        {data.map((el, i) => (
          <div key={i}>
            <img src={`${urls.media}/${el.media}`} alt="" />
            <div>{el.name}</div>
            <Link to={el._id}>
              <img src={icons.arrow_45deg} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
