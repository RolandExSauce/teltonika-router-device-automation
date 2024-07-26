import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SelectConfigTypeProps } from '../../types';

// this component tracks which of the 3 available configuration types was chosen
const SelectConfigType: React.FC<SelectConfigTypeProps> = ({ onChange }) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        defaultValue={'Option1'}
        onChange={onChange} // Handle change event
        sx={{ gap: 3, mb: 4 }}
      >
        <FormControlLabel
          value='Option1'
          control={<Radio size='small' />}
          label='Configure/add to DB'
        />
        <FormControlLabel
          value='Option2'
          control={<Radio size='small' />}
          label='Configure only'
        />
        <FormControlLabel
          value='Option3'
          control={<Radio size='small' />}
          label='Only add to DB'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectConfigType;
