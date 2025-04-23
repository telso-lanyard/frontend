import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./style.css";
import * as icons from "../../../../assets";
import Input from "../../../../components/Input";
import Request from "../../../../utils/requests";
import style_map from "../../../../utils/style_map";

function Auth({ ...props }) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  function fetch() {
    Request.get({
      url_mod: "auth/login",
      query: {
        email: email,
        password: password,
        collection: "admin",
      },
    })
      .then((res) => {
        props.setuserID(res.data.user_id);
        props.setuserToken(res.data.token);

        toast.success(
          <div
            style={{
              fontSize: "var(--fs-sm)",
              padding: "3.75px 15px",
            }}
          >
            You've logged in successfully
          </div>,
          { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
        );
        navigate("/admin/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(
          <div
            style={{
              fontSize: "var(--fs-sm)",
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

  return (
    <div
      id="main_auth_login_wrapper"
      style={style_map.flex(["center", "center", "column"])}
    >
      <div>Sign in to your account</div>
      <div>Provide your email address and password</div>
      <div style={style_map.flex(["center", "flex-start", "column"])}>
        <div>
          <div>Email*</div>
          <div>
            <Input
              placeholder="Enter your email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setemail(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <div>Password*</div>
          <div>
            <Input
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setpassword(e.target.value)
              }
            />
            <div
              style={style_map.flex(["center", "center"])}
              onClick={() => setpasswordVisibility(!passwordVisibility)}
            >
              <img
                src={icons[`${passwordVisibility ? "eye_off" : "eye"}`]}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div onClick={fetch}>Continue</div>
    </div>
  );
}

export default Auth;
