import { ICustomTextFieldProps } from "../../utils/types";
import { inputStyleCustomTextField } from "./styles/styles-objects";

//custom textfield component
const CustomTextField: React.FC<ICustomTextFieldProps> = ({
  inputProps: { id, name, placeHolderTxt, type, value },
  disabled,
  onChange,
}) => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeHolderTxt}
        readOnly={disabled}
        onChange={onChange}
        style={inputStyleCustomTextField}
      />
    </div>
  );
};
export default CustomTextField;
