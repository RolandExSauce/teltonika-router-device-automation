import { IInputFieldsArr, ITodoStep } from "../../utils/types";
import CustomTextField from "./CustomTextField";

// Component for rendering instructional content
export const InstructionContentAsAccordionDetails = (
  arrDataSteps: ITodoStep[] | undefined
) => (
  <ul>
    {arrDataSteps?.slice(0, 3).map(({ todo }, index) => (
      <li key={index} style={{ listStyle: "none", marginBottom: 15 }}>
        {todo}
      </li>
    ))}
  </ul>
);

// Component for rendering optional input fields in custom accordion component (as details)
export const OptionalInputFieldsAsAccordionDetails = (
  arrDataInputs: IInputFieldsArr[],
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      maxWidth: "100%",
    }}
  >
    {arrDataInputs?.slice(4).map((field, index) => (
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
          onChange={onChange}
        />
      </div>
    ))}
  </div>
);
