import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ICustomAccordionProps } from "../../utils/types";

// Custom accordion component to show explanation or other things when dropped down
const CustomAccordion: React.FC<ICustomAccordionProps> = ({
  handleAccordionChange,
  expanded,
  accTitle,
  accSubTitle,
  DetailsArea,
}) => {
  return (
    <div style={{ width: "100%", height: "50%" }}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h3
            style={{
              fontWeight: "bold",
              margin: "2px",
              fontFamily: "Arial",
              color: "#00538C",
            }}
          >
            {accTitle}
          </h3>
        </AccordionSummary>
        {accSubTitle && (
          <div style={{ margin: "0px 0px 10px 20px" }}>
            {accSubTitle.substring(0, 22)}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#0077c0",
                display: "inline",
                marginLeft: 5,
                fontSize: 21,
              }}
            >
              {accSubTitle.substring(22)}
            </a>
          </div>
        )}
        <AccordionDetails className="accordion-content">
          {DetailsArea}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
