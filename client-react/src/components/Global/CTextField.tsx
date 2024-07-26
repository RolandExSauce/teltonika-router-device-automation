const inputStyle = {
  height: "48px",
  width: "100%",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  padding: "0 12px",
  fontSize: "16px",
  outline: "none",
  margin: "3px",
};
const divStyle = { display: "flex", alignItems: "center", width: "100%" };

interface ICTextFieldProps {
  value: string;
  placeHolderTxt: string;
  disabled?: boolean;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//custom textfield component, hence "C"
const CTextField: React.FC<ICTextFieldProps> = ({
  value,
  placeHolderTxt,
  disabled,
}) => {
  return (
    <div style={divStyle}>
      <input
        id="ctextfield"
        name="ctextfield"
        type="text"
        value={value}
        placeholder={placeHolderTxt}
        readOnly={disabled}
        // onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
};

export default CTextField;
