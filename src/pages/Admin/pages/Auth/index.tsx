import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import "./style.scss";
import api from "../../../../utils/api";
import * as icons from "../../../../assets";
import Input from "../../../../components/Input";
import style_map from "../../../../utils/style_map";

function Auth({ ...props }) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () =>
      api
        .post("auth/login", { email, password, collection: "admin" })
        .then((res) => res.data),

    onSuccess: (data) => {
      props.setuserID(data.user_id);
      props.setuserToken(data.token);

      navigate("/admin");
      toast.success("You've logged in successfully");
    },
  });

  async function handleLogin() {
    try {
      // if (
      //   !(await validation(
      //     z.object({
      //       email: userSchema.shape.email,
      //       password: userSchema.shape.password,
      //     }),
      //     { email, password }
      //   ))
      // )
      //   return;

      loginMutation.mutate();
    } catch (err) {
      console.log("Validation failed");
    }
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
      <button onClick={handleLogin} disabled={loginMutation.isPending}>
        Continue
      </button>
    </div>
  );
}

export default Auth;
