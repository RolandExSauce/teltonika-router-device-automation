import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SelectConfigTypeProps } from '../../../utils/types';

// this component tracks which of the 3 available configuration types was chosen
const SelectConfigType: React.FC<SelectConfigTypeProps> = ({ onChange }) => {
  return (
    <FormControl component="fieldset" style={{ width: '100%' }}>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        defaultValue={'Option1'}
        onChange={onChange} // Handle change event
        sx={{
          justifyContent: 'space-between', // Distribute space evenly
          alignItems: 'center', // Align items vertically centered
          width: '100%', // Ensure it fills the container width
        }}
      >
        <FormControlLabel
          value='Option1'
          control={<Radio size='small' />}
          label='Configure & Add to DB'
        />
        <FormControlLabel
          value='Option2'
          control={<Radio size='small' />}
          label='Configure only'
        />
        <FormControlLabel
          value='Option3'
          control={<Radio size='small' />}
          label='Add to DB only'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectConfigType;
