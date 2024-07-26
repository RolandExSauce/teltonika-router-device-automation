// import React, { useEffect, useRef, useState } from "react";
// import "./OpButton.css";
// import {
//   downloadIcon,
//   notAllowdSVG,
//   restoreBackupSVG,
//   saveIcon,
// } from "../../assets/icons/exportIcons";
// import { SvgIcon } from "@mui/material";

// interface IOpButtonProps {
//   handleClick: () => void;
//   disabled: boolean;
//   opButtonTxtFor: "BACK" | "DOWNLOAD" | "SAVE" | "CANCEL";
//   buttonIsDynamic: boolean; // Animation effect applied only on download and backup data buttons
// }

// const OpButton: React.FC<IOpButtonProps> = ({
//   handleClick,
//   disabled,
//   opButtonTxtFor,
//   buttonIsDynamic,
// }) => {
//   const buttonRef = useRef<HTMLDivElement>(null);
//   const [buttonText, setButtonText] = useState<string>(
//     getInitialText(opButtonTxtFor)
//   );
//   const [icon, setIcon] = useState<
//     React.FunctionComponent<
//       React.SVGProps<SVGSVGElement> & {
//         title?: string;
//       }
//     >
//   >(getInitialIcon(opButtonTxtFor));

//   useEffect(() => {
//     const button = buttonRef.current;

//     const handleClickInternal = () => {
//       if (disabled) return;

//       if (!buttonIsDynamic) {
//         handleClick();
//         return;
//       }

//       if (button) {
//         button.classList.add("progress");
//         setButtonText(getOpBtnTxtOpRunning(opButtonTxtFor));

//         setTimeout(() => {
//           button.classList.remove("progress");
//           setButtonText("Done!");

//           setTimeout(() => setButtonText(getInitialText(opButtonTxtFor)), 3000);
//           handleClick();
//         }, 4000);
//       }
//     };

//     button?.addEventListener("click", handleClickInternal);

//     return () => button?.removeEventListener("click", handleClickInternal);
//   }, [buttonIsDynamic, disabled, handleClick, opButtonTxtFor]);

//   useEffect(() => {
//     setIcon(getInitialIcon(opButtonTxtFor));
//     setButtonText(getInitialText(opButtonTxtFor));
//   }, [opButtonTxtFor]);

//   return (
//     <div
//       style={{ margin: 12, padding: 12, width: "max-content" }}
//       className={`button ${disabled ? "disabled" : ""}`}
//       ref={buttonRef}
//     >
//       <div className="text-icon">
//         {buttonText !== "Done!" && <SvgIcon component={icon} inheritViewBox />}
//         <span className="text" style={{ color: getTextColor(opButtonTxtFor) }}>
//           {buttonText}
//         </span>
//       </div>
//     </div>
//   );
// };

// const getInitialText = (type: string) => {
//   const texts: Record<string, string> = {
//     BACK: "Create Backup",
//     DOWNLOAD: "Download Excel",
//     SAVE: "Save Info",
//     CANCEL: "Cancel",
//   };
//   return texts[type] || "Unknown";
// };

// const getOpBtnTxtOpRunning = (type: string) => {
//   return type === "BACK" ? "Backing Data up..." : "Downloading...";
// };

// const getInitialIcon = (type: string) => {
//   const icons: Record<
//     string,
//     React.FunctionComponent<
//       React.SVGProps<SVGSVGElement> & {
//         title?: string;
//       }
//     >
//   > = {
//     BACK: restoreBackupSVG,
//     DOWNLOAD: downloadIcon,
//     SAVE: saveIcon,
//     CANCEL: notAllowdSVG,
//   };
//   return icons[type] || notAllowdSVG;
// };

// const getTextColor = (type: string) => {
//   const colors: Record<string, string> = {
//     CANCEL: "red",
//     SAVE: "green",
//   };
//   return colors[type] || "";
// };

// export default OpButton;
