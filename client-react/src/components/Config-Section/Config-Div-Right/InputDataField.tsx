import { Grid, TextField } from "@mui/material";

interface InputDataFieldProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: inputFieldsObjType
  ) => void;
  data: inputFieldsObjType[];
  dataTwo?: DataObj
}

export interface inputFieldsObjType {
  label: string;
  id: string;
  value: string;
}

interface DataObj {
    inputQR_CODE?: string;
    wifiSSID: string;
    passWifi: string;
    webUser: string;
    passForWebUser: string;
    serialNumber: string;
    SIMID: string;
    IMEI: string;
    LAN_MAC: string;
}



const InputDataField: React.FC<InputDataFieldProps> = ({ onChange, data, dataTwo }) => {

  delete dataTwo?.inputQR_CODE;

  return (
    <>
      {/* FIXME: LATER: THIS INPUT IS UNCONTROLLED, THOUGH EVERYTHING WORKS FINE, MAYBE CHANGE LATER */}
      {data?.map((field, key) => (
        <Grid item xs={12} md={6} key={key}>
          <TextField
            type="text"
            label={field.label}
            variant="outlined"
            autoComplete="off"
            id={field.id}
            name={field.id}
            value={field.value}
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={(e) => {
              onChange(e, field);
            }}
          />
        </Grid>
      ))}
    </>
  );
};

export default InputDataField;
