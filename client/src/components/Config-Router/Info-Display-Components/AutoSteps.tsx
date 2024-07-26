import { Stack } from "@mui/material";
import { automationSteps, renderStep } from "./automationSteps";

//map over renderStep
const Automation = () => {
  return (
    <Stack sx={{ padding: 1, mb: 5 }} direction={"row"} spacing={8}>
      {automationSteps.map(renderStep)}
    </Stack>
  ) 
};
export default Automation;