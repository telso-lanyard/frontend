import "./style.scss";

function Contact() {
  return (
    <a
      id="checkout_contact_wrapper"
      target="_blank"
      rel="noopener noreferrer"
      href={`https://wa.me/${2347075765619}?text=Hi!%20I%20need%20help%20with%20my%20order.`}
    >
      Need some help? <span>Chat Now</span>
    </a>
  );
}

export default Contact;
