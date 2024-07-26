import { Avatar, Box, Typography } from "@mui/material";
import plugIMG from "../images/plug.png";
import finishIMG from "../images/finish.png";
import configIMG from "../images/config.png";
import qrCodeTypeIMG from "../images/qrCodeType.png";
import InfoPdf from "../utils/instructions_connecting_device_to_internet.pdf";
import { ITodoStep } from "../../types";

//array containing steps for configuring router
export const automationSteps: ITodoStep[] = [
  {
    stepName: (
      <Typography sx={{ fontWeight: "bold" }} color="#228b22">
        Plug
      </Typography>
    ),
    imgSrc: plugIMG,
    todo: (
      <Typography>
        <span style={{ color: "#1EB0FF", fontWeight: "bold", fontSize: 20 }}>
          1.
        </span>{" "}
        Plug your Router device and establish an internet connection to your
        machine using WIFI or a LAN cable.{" "}
        <a
          href={InfoPdf}
          target="_blank"
          style={{ textDecoration: "none", color: "green" }}
        >
          Click here
        </a>{" "}
        for help
      </Typography>
    ),
  },
  {
    stepName: (
      <Typography sx={{ fontWeight: "bold" }} color="#228b22">
        some Info
      </Typography>
    ),
    imgSrc: qrCodeTypeIMG,
    todo: (
      <Typography>
        <span style={{ color: "#1EB0FF", fontWeight: "bold", fontSize: 20 }}>
          2.
        </span>{" "}
        Klick the red circle to capture input by QR Code Scanner - green ? then
        we're ready 😎😎, you can also enter your data manuelly.
      </Typography>
    ),
  },

  {
    stepName: (
      <Typography sx={{ fontWeight: "bold" }} color="#228b22">
        Hit Configure
      </Typography>
    ),
    imgSrc: configIMG,
    todo: (
      <Typography>
        <span style={{ color: "#1EB0FF", fontWeight: "bold", fontSize: 20 }}>
          3.
        </span>{" "}
        Type/Scan your data, click decrypt - check your data, correct if needed,
        then click the config button. You only need to click decrypt if you
        scanned data through QR Code
      </Typography>
    ),
  },

  {
    stepName: (
      <Typography sx={{ fontWeight: "bold" }} color="#228b22">
        Done
      </Typography>
    ),
    imgSrc: finishIMG,
  },
];

//render step images: plug, scan, configure and done
export const renderStep = ({ stepName, imgSrc }: ITodoStep, index: number) => (
  <Box
    key={index}
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <Avatar src={imgSrc} sx={{ width: "65px", height: "65px", mb: 1 }} />
    <Typography sx={{ fontWeight: "bold", fontFamily: "Arial" }} variant="h5">
      {stepName}
    </Typography>
  </Box>
);
