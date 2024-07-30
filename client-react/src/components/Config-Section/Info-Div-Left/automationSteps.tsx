import { ITodoStep } from "../../../utils/types";
import {
  approvedIconImg,
  configGearsIconImg,
  plugIconImg,
  typeOrScanInfoIconImg,
} from "../../../assets/export-imgs";
import { commonTextStyle, stepNumberStyle } from "../styles/style-objects";

// Array containing steps for configuring router
export const automationStepsArray: ITodoStep[] = [
  {
    stepName: "Plug",
    imgSrc: plugIconImg,
    todo: (
      <p style={commonTextStyle}>
        <span style={stepNumberStyle}>1.</span>
        Plug your Router device and establish an internet connection to your
        machine using WIFI or a LAN cable.
      </p>
    ),
  },
  {
    stepName: "Info",
    imgSrc: typeOrScanInfoIconImg,
    todo: (
      <p style={commonTextStyle}>
        <span style={stepNumberStyle}>2.</span>
        QR Code/SIM ID Catcher is turned on with the Switch - Click it, green?
        Then we're ready. You can also enter your data manually.
      </p>
    ),
  },
  {
    stepName: "Configure",
    imgSrc: configGearsIconImg,
    todo: (
      <p style={commonTextStyle}>
        <span style={stepNumberStyle}>3.</span>
        If you turned on the Catcher via Switch, then don't move your cursor
        anymore because it's a focused hidden input element for capturing data
        via a Scanner Device. After scanning, click decrypt; afterwards, you can
        edit the info if necessary. If you enter data manually, just hit the
        config button and you're good!
      </p>
    ),
  },
  {
    stepName: "Done",
    imgSrc: approvedIconImg,
  },
];

// Render step images: plug, scan, configure, and done
export const renderStepImgAndText = (
  { stepName, imgSrc }: ITodoStep,
  index: number
) => (
  <div
    key={index}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <img
      src={imgSrc}
      alt={`${stepName} icon`}
      style={{ width: "70px", height: "70px", marginBottom: 5 }}
    />
    <h4 style={{ fontWeight: "bold", color: "#00538C" }}>{stepName}</h4>
  </div>
);
