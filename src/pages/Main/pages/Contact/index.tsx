import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";
import Input from "../../../../components/Input";
import Request from "../../../../utils/requests";
import style_map from "../../../../utils/style_map";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetch = () => {
    if (isSubmitting) return;

    let isValid = true;
    Object.keys(formData).forEach((el) => {
      if (formData[el as keyof typeof formData].length <= 1) {
        isValid = false;
        toast.error(
          <div
            style={{
              fontSize: "var(--fs-sm)",
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

    if (isValid) {
      setIsSubmitting(true);
      Request.post({
        url_mod: "contact",
        body: formData,
      })
        .then((_) => {
          toast.success(
            <div
              style={{
                fontSize: "var(--fs-sm)",
                padding: "3.75px 15px",
              }}
            >
              Message sent successfully
            </div>,
            { hideProgressBar: true, closeOnClick: true, autoClose: 3000 }
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

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
        <div onClick={fetch}>SEND</div>
      </div>
    </>
  );
}

export default Contact;
