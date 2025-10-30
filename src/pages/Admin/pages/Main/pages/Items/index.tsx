import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import "./style.scss";
import urls from "../../../../../../utils/urls";
import Request from "../../../../../../utils/requests";
import Input from "../../../../../../components/Input";
import style_map from "../../../../../../utils/style_map";

function Items({ ...props }) {
  const [items, setItems] = useState<
    {
      _id: string;
      name: string;
      variants: { name: string; qty: number; media: string }[];
    }[]
  >([]);

  function update(id: string) {
    Request.patch({
      url_mod: `items/${id}`,
      token: props.userToken,
      body: items.filter((item) => item._id == id)[0],
    })
      .then(() => {
        fetch();
        toast.success(
          <div
            style={{
              fontSize: "var(--fs--1)",
              padding: "3.75px 15px",
            }}
          >
            Quantity updated successfully
          </div>,
          { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
        );
      })
      .catch((error) => {
        console.error("Error patching items:", error);
        toast.error(
          <div
            style={{
              fontSize: "var(--fs--1)",
              padding: "3.75px 15px",
            }}
          >
            {`${error.response.data.message}`}
          </div>,
          {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 3000,
          }
        );
      });
  }

  function fetch() {
    Request.get({
      url_mod: "items",
    })
      .then((res) => {
        setItems(res.data.documents.reverse());
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        toast.error(
          <div
            style={{
              fontSize: "var(--fs--1)",
              padding: "3.75px 15px",
            }}
          >
            {`${error.response.data.message}`}
          </div>,
          {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 3000,
          }
        );
      });
  }

  useEffect(() => fetch(), []);

  return (
    <div id="admin_items_wrapper">
      {items.map((item, i) => (
        <div
          key={i}
          style={
            props.pageWidth < 850
              ? style_map.flex(["center", "flex-start", "column"])
              : style_map.flex(["center", "flex-start"])
          }
        >
          {item.variants.map((variant, i) => (
            <div
              key={i}
              style={style_map.flex(["flex-start", "flex-start", "column"])}
            >
              <div style={style_map.flex(["center", "center"])}>
                <img src={`${urls.media}${variant.media}`} alt="" />
              </div>
              <div
                style={style_map.flex(["flex-start", "flex-start", "column"])}
              >
                <div>
                  {item.name.toUpperCase()} | {variant.name.toUpperCase()}
                </div>
                <div>
                  <Input
                    type="number"
                    value={variant.qty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newQty = parseInt(e.target.value, 10) || 0;
                      setItems((prevItems) =>
                        prevItems.map((itm) =>
                          itm._id === item._id
                            ? {
                                ...itm,
                                variants: itm.variants.map((v) =>
                                  v.name === variant.name
                                    ? { ...v, qty: newQty }
                                    : v
                                ),
                              }
                            : itm
                        )
                      );
                    }}
                  />
                </div>
                <div onClick={() => update(item._id)}>Update</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Items;
