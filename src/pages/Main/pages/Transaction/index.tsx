import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import style_map from "../../../../utils/style_map";
import * as icons from "../../../../assets";

function Transaction() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div id="transaction_wrapper">
        <div>
          <div style={style_map.flex(["flex-start", "space-between"])}>
            <div>
              <div>Total Amount</div>
              <div>Follow the steps below to complete your order</div>
            </div>
            <div>
              &#8358;
              {
                location.pathname.split("/")[
                  location.pathname.split("/").length - 1
                ]
              }
            </div>
          </div>
          <div>
            <div style={style_map.flex(["center", "flex-start"])}>
              <div style={style_map.flex(["center", "center"])}>1</div>
              <div>Bank Transfer</div>
            </div>
            <div>
              <div>
                Transfer the total order amount &#8358;
                <b>
                  {
                    location.pathname.split("/")[
                      location.pathname.split("/").length - 1
                    ]
                  }
                </b>{" "}
                to the bank account below:
              </div>
              <div>
                <div>Account Details</div>
                <div>4997331799</div>
                <div>Moniepoint MFB</div>
                <div>THE RIGHT INNOVATIONS LTD - TELSO LLC</div>
              </div>
            </div>
          </div>
          <div>
            <div style={style_map.flex(["center", "flex-start"])}>
              <div style={style_map.flex(["center", "center"])}>2</div>
              <div>Confirmation</div>
            </div>
            <div>
              <div>
                Please click <b>"Mark as Paid"</b> after successfully completed
                your transaction
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              toast.success(
                "Payment will be reviewed and delivery information will be communicated",
                { style: { fontSize: "var(--fs-sm)" } }
              );
              setTimeout(() => navigate("/"), 1000);
            }}
            style={style_map.flex(["center", "flex-start"])}
          >
            <div style={style_map.flex(["center", "center"])}>
              <img src={icons.check} alt="" />
            </div>
            <div>MARK AS PAID</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Transaction;
