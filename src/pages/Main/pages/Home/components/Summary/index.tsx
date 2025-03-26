import "./style.css";
import * as images from "../../../../../../assets";
import Input from "../../../../../../components/Input";
import style_map from "../../../../../../utils/style_map";

function Summary({ ...props }) {
  return (
    <div id="main_summary_wrapper" style={style_map.flex(["center", "center"])}>
      <div style={style_map.flex(["flex-start", "flex-start", "column"])}>
        <div>Order Summary</div>
        <div style={style_map.flex(["flex-start", "flex-start"])}>
          <div>
            <div>Order Amount</div>
            <div>&#8358;</div>
          </div>
          <div>
            <div>Order Quantity</div>
            <div></div>
          </div>
        </div>
        <div>Contact Details</div>
        <div style={style_map.flex(["flex-start", "space-between"])}>
          <div>
            <div>
              Name <span>*</span>
            </div>
            <div>
              <Input type="text" />
            </div>
          </div>
          <div>
            <div>
              Phone <span>*</span>
            </div>
            <div>
              <Input type="text" />
            </div>
          </div>
          <div>
            <div>
              Email <span>*</span>
            </div>
            <div>
              <Input type="email" />
            </div>
          </div>
        </div>
        <div>
          <div>
            Delivery Address <span>*</span>
          </div>
          <div>
            <textarea placeholder="Enter your Hall and Room Number" />
          </div>
        </div>

        <div>Review your order</div>
        <div>
          Please review your order carefully before submitting it for
          processing. - Your cart is empty -
        </div>
        <div style={style_map.flex(["center", "flex-start"])}>
          <div style={style_map.flex(["center", "center"])}>
            <img src={images.send} alt="" />
          </div>
          <div>SUBMIT</div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
