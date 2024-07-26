import { Stack } from "@mui/material";
import { automationStepsArray, renderStepImgAndText } from "./automationSteps";

//map over renderStep
const AutomationStepImgAndText = () => {
  return (
    <Stack sx={{ padding: 1, mb: 5 }} direction={"row"} spacing={8}>
      {automationStepsArray.map(renderStepImgAndText)}
    </Stack>
  );
};
export default AutomationStepImgAndText;
