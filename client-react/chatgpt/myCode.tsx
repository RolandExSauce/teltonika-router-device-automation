import React, { useEffect, useRef, useState } from "react";
import "./OpButton.css";
import {
  downloadIcon,
  notAllowdSVG,
  restoreBackupSVG,
  saveIcon,
} from "../../assets/icons/exportIcons";
import { SvgIcon } from "@mui/material";

interface IOpButtonProps {
  handleClick: () => void;
  disabled: boolean;
  opButtonTxtFor: "BACK" | "DOWNLOAD" | "SAVE" | "CANCEL";
  buttonIsDynamic: boolean; //the animation effect will only be applied on download and backup data buttons
}

//Button component when downloading excel file or creating backup file
const OpButton: React.FC<IOpButtonProps> = ({
  handleClick,
  disabled,
  opButtonTxtFor,
  buttonIsDynamic,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const opBtnIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  > =
    opButtonTxtFor === "BACK"
      ? restoreBackupSVG
      : opButtonTxtFor === "DOWNLOAD"
      ? downloadIcon
      : opButtonTxtFor === "SAVE"
      ? saveIcon
      : notAllowdSVG;
  const opBtnTxt =
    opButtonTxtFor === "BACK"
      ? "Create Backup"
      : opButtonTxtFor === "DOWNLOAD"
      ? "Download Excel"
      : opButtonTxtFor === "SAVE"
      ? "Save Info"
      : "Cancel";
  const opBtnTxtOpRunning =
    opButtonTxtFor === "BACK" ? "Backing Data up..." : "Downloading...";
  const [buttonText, setButtonText] = useState<string>(opBtnTxt);

  useEffect(() => {
    const button = buttonRef.current;
    const handleClickInternal = () => {
      if (disabled) return; // Do nothing if disabled
      if (!buttonIsDynamic) {
        handleClick();
        return;
      }

      button?.classList.add("progress");
      setButtonText(opBtnTxtOpRunning);

      setTimeout(() => {
        button?.classList.remove("progress"); // Remove progress after 4s
        setButtonText("Done!");

        // After 3,9 seconds, reset the text to initial state
        setTimeout(() => {
          setButtonText(opBtnTxt);
        }, 3900);

        handleClick(); //call handleClick function from props
      }, 3500);
    };

    if (button) {
      button.addEventListener("click", handleClickInternal);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (button) {
        button.removeEventListener("click", handleClickInternal);
      }
    };
  }, [buttonIsDynamic, disabled, handleClick, opBtnTxt, opBtnTxtOpRunning]);

  return (
    <div
      style={{ margin: 10, padding: 12, width: "max-content" }}
      className={`button ${disabled ? "disabled" : ""}`}
      ref={buttonRef}
    >
      <div className="text-icon">
        {buttonText !== "Done!" && (
          <SvgIcon component={opBtnIcon} inheritViewBox />
        )}
        <span
          className="text"
          ref={textRef}
          style={{
            color:
              opButtonTxtFor === "CANCEL"
                ? "red"
                : opButtonTxtFor === "SAVE"
                ? "green"
                : buttonText === "Done!"
                ? "green"
                : "",
          }}
        >
          {buttonText}
        </span>
      </div>
    </div>
  );
};

export default OpButton;
