import { Box, Typography } from "@mui/material";
import "../config.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { automationSteps } from "./automationSteps";
import { ConfigStepsDropDownProps } from "../../types";

//render config steps description
const ConfigStepsDropDown: React.FC<ConfigStepsDropDownProps> = ({
  handleAccordionChange,
  expanded,
}) => (
  <Box sx={{ pr: 3, mr: 3 }}>
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginTop: 1,
            fontFamily: "Arial",
            color: "#1EB0FF",
          }}
        >
          View all steps (dropdown)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {automationSteps.slice(0, 3).map(({ todo }, index) => (
            <ListItem key={index} disableGutters>
              {todo}
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  </Box>
);

export default ConfigStepsDropDown;
