import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";

import "./style.scss";
import Input from "../../../../components/Input";
import api from "../../../../utils/api";
import style_map from "../../../../utils/style_map";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const contactMutation = useMutation({
    mutationFn: () => api.post("contact", formData).then((res) => res.data),

    onSuccess: () => {
      toast.success(
        <div
          style={{
            fontSize: "var(--fs--1)",
            padding: "3.75px 15px",
          }}
        >
          Message sent successfully
        </div>,
        { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
      );
    },
  });

  async function contact() {
    try {
      Object.keys(formData).forEach((el) => {
        if (formData[el as keyof typeof formData].length <= 1) {
          return toast.error(
            <div
              style={{
                fontSize: "var(--fs--1)",
                padding: "3.75px 15px",
              }}
            >
              {`${
                el.charAt(0).toUpperCase() + el.slice(1)
              } not entered or value entered is not valid`}
            </div>,
            { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
          );
        }
      });

      contactMutation.mutate();
    } catch (err) {
      console.log("Validation failed");
    }
  }

  return (
    <>
      <div
        id="main_contact_wrapper"
        style={style_map.flex(["center", "flex-start", "column"])}
      >
        <div>GET IN TOUCH</div>
        <div>
          <Input
            name="name"
            placeholder="Name"
            style={{ textAlign: "center" }}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            style={{ textAlign: "center" }}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            name="number"
            type="number"
            placeholder="Contact Number"
            style={{ textAlign: "center" }}
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div onClick={contact}>SEND</div>
      </div>
    </>
  );
}

export default Contact;
