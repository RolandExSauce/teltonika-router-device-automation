import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { automationStepsArray } from "./automationSteps";
import { ConfigStepsDropDownProps } from "../../../utils/types";


//Component to show accordion when dropped down with the explanation
const ConfigStepsDropDown: React.FC<ConfigStepsDropDownProps> = ({
  handleAccordionChange,
  expanded,
}) => (
  <div style={{ paddingRight: 24, marginRight: 24 }}>
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <h2
          style={{
            fontWeight: "bold",
            margin: "10px 0px 10px 0px",
            fontFamily: "Arial",
            color: "#00538C",
          }}
        >
          Use Dropdown to view explanation
        </h2>
      </AccordionSummary>
      <div style={{ margin: "0px 0px 10px 20px" }}>
        Click here to view a {/* TODO: provide a demo video */}
        <a
          href="#"
          target="_blank"
          style={{
            textDecoration: "none",
            color: "#0077c0",
            display: "inline",
            marginLeft: 5,
            fontSize: 21,
          }}
        >
          demo video
        </a>
      </div>
      <AccordionDetails className="accordion-content">
        <ul>
          {automationStepsArray.slice(0, 3).map(({ todo }, index) => (
            <li key={index} style={{ listStyle: "none", marginBottom: 15 }}>
              {todo}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  </div>
);
export default ConfigStepsDropDown;
