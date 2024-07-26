import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { InputCheckProps } from "../../../utils/types";


// this component will tell us whether to use existing files or not, we can do that via a checkbox
const InputCheck: React.FC<InputCheckProps> = ({
  handleChange,
  useFiles,
  label,
}) => {
  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={useFiles} onChange={handleChange} />}
        label={label}
      />
    </Box>
  );
};

export default InputCheck;
