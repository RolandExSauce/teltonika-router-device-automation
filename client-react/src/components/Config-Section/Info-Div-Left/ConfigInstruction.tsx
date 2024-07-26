import { CSSProperties, useState } from "react";
import AutomationStepImgAndText from "./AutoSteps";
import ConfigStepsDropDown from "./ConfigStepsDropDown";
import {
  lazyGarfieldIconImg,
  warningSymbolIconImg,
} from "../../../assets/export-imgs";
import "../styles/config.css";

const ConfigInstruction = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const handleAccordionChange = (
    _e: React.SyntheticEvent,
    expanded: boolean
  ) => {
    setExpandedAccordion(expanded);
  };

  const warningStyle: CSSProperties = {
    backgroundColor: "#ffeaea",
    padding: "15px 0px 15px 10px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    marginTop: "50px",
    width: "94%",
  };

  const imageStyle = {
    width: 80,
    height: 80,
    margin: 10,
  };

  const textStyle = {
    fontSize: "1.5rem",
    lineHeight: 1.5,
  };

  const lazyGarfieldStyle = {
    width: "90%",
    marginTop: 20,
    paddingTop: 20,
    borderRadius: 30,
  };

  return (
    <div className="content">
      <AutomationStepImgAndText />
      <ConfigStepsDropDown
        expanded={expandedAccordion}
        handleAccordionChange={handleAccordionChange}
      />
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
