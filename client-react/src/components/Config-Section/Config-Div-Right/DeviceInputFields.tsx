import React, { useState } from "react";
import CustomTextField from "../../Global/CustomTextField";
import CustomAccordion from "../../Global/CustomAccordion";
import { IDeviceInputFieldsProps } from "../../../utils/types";
import { OptionalInputFieldsAsAccordionDetails } from "../../Global/AccordionDetails";

//component for capturing input data, we map an array of the corresponding fields
const DeviceInputFields: React.FC<IDeviceInputFieldsProps> = ({
  onChange,
  data,
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const handleAccordionChange = (
    _e: React.SyntheticEvent,
    expanded: boolean
  ) => {
    setExpandedAccordion(expanded);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          maxWidth: "100%",
          marginBottom: "20px",
        }}
      >
        {data?.slice(0, 4).map((field, index) => (
          <div key={index} style={{ flex: "1 1 45%" }}>
            <CustomTextField
              inputProps={{
                id: field.id,
                name: field.id, //id and name will be the same,
                value: field.value,
                type: "text",
                placeHolderTxt: field.label,
              }}
              disabled={false}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => onChange(e)}
            />
          </div>
        ))}
      </div>
      {/* for the optional fields we will use accordion to hide them if not used */}
      <CustomAccordion
        accTitle="Optional fields but not required"
        accDetailsType="CUSTOM_TEXTFIELDS_OPTIONALS"
        expanded={expandedAccordion}
        handleAccordionChange={handleAccordionChange}
        DetailsArea={OptionalInputFieldsAsAccordionDetails(data, onChange)}
      />
    </div>
  );
};
export default DeviceInputFields;
