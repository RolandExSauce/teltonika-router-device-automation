import { useState } from "react";
import AutomationStepImgAndText from "./AutoSteps";
import CustomAccordion from "../../Global/CustomAccordion";
import {
  warningSymbolIconImg,
  lazyGarfieldIconImg,
} from "../../../assets/export-imgs";
import { automationStepsArray } from "./automationSteps";
import { InstructionContentAsAccordionDetails } from "../../Global/AccordionDetails";
import {
  warningStyle,
  imageStyle,
  textStyle,
  lazyGarfieldStyle,
} from "../styles/style-objects";

//Left side show config instruction
const ConfigInstruction = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const handleAccordionChange = (
    _e: React.SyntheticEvent,
    expanded: boolean
  ) => {
    setExpandedAccordion(expanded);
  };

  return (
    <div className="content">
      <AutomationStepImgAndText />
      <div style={{ width: "94%" }}>
        <CustomAccordion
          accTitle="Use Dropdown to view explanation"
          accSubTitle="Here is a demo video, click here"
          accDetailsType="INSTRUCTION"
          expanded={expandedAccordion}
          handleAccordionChange={handleAccordionChange}
          DetailsArea={InstructionContentAsAccordionDetails(
            automationStepsArray
          )}
        />
      </div>
      <div style={warningStyle}>
        <img
          src={warningSymbolIconImg}
          alt="Warning symbol"
          style={imageStyle}
        />
        <p style={textStyle}>
          Make sure your Internet connection is stable! Contact Admin if the
          request keeps failing.
        </p>
      </div>

      {!expandedAccordion && (
        <div>
          <img
            src={lazyGarfieldIconImg}
            alt="Lazy Garfield"
            style={lazyGarfieldStyle}
          />
        </div>
      )}
    </div>
  );
};
export default ConfigInstruction;
