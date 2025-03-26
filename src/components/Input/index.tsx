import "./style.css";

function Input({ ...props }) {
  return (
    <input
      name={props.name}
      list={props.list}
      style={props.style}
      className="input_wrapper"
      onChange={props.onChange}
      type={props.type || "text"}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      value={props.value || undefined}
      defaultValue={props.defaultValue}
      disabled={props.disabled || false}
    />
  );
}

export default Input;
