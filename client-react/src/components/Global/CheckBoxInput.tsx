import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ICheckBoxInputProps } from "../../utils/types";

//a general checkbox input
const CheckBoxInput: React.FC<ICheckBoxInputProps> = ({
  handleInputCheckedChange,
  inputChecked,
  label,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={inputChecked} onChange={handleInputCheckedChange} />
      }
      label={label}
    />
  );
};
export default CheckBoxInput;
