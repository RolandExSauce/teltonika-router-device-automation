import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
} from "react";
import "./OpButton.css";
import { SvgIcon, SxProps, Theme } from "@mui/material";

interface IOpButtonProps {
  handleClick: () => void;
  disabled: boolean;
  opButtonTxt?: string;
  buttonIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  buttonStyleOptions?: {
    buttonStyles?: CSSProperties;
    iconStyles?: SxProps<Theme>;
  };
  borderRounded?: boolean; //borders are rounded
  buttonIsDynamic: boolean; // the animation effect will only be applied on download and backup data buttons
  typeButtonIfDynamic?: "BACK" | "DOWNLOAD"; //if button is dynamic we know that it will either be the download button or backup button
}

//This reusable button component will be used throughout the entire application,
//"Op" for Operation, so the button will trigger operations so its not just a styled button
const OpButton: React.FC<IOpButtonProps> = ({
  handleClick,
  disabled,
  opButtonTxt,
  buttonIcon,
  buttonStyleOptions,
  buttonIsDynamic,
  typeButtonIfDynamic,
}) => {
  //base button styles, merge with the passed styles for the specific button (if passed at all)
  const baseButtonStyles: CSSProperties = {
    padding: "10px 22px 10px 22px",
    width: "max-content",
    //pass the custom style for appropriate button after 
    //the base style so that it can be overriden
    ...buttonStyleOptions?.buttonStyles,
  };

  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonText, setButtonText] = useState<string | undefined>(opButtonTxt);

  const handleClickInternal = useCallback(() => {
    if (disabled) return;

    //if button is not dynamic that means the uploading progress bar is irrelevant,
    //than just handle the click
    if (!buttonIsDynamic) {
      handleClick();
      return;
    }

    //get kind of type and set running text on animation trigger
    const runningText =
      typeButtonIfDynamic === "BACK"
        ? "Backing Data up..."
        : "Downloading file..";

    buttonRef.current?.classList.add("progress");
    setButtonText(runningText);

    setTimeout(() => {
      buttonRef.current?.classList.remove("progress");
      setButtonText("Done!");

      setTimeout(() => {
        setButtonText(opButtonTxt);
      }, 3500);

      handleClick();
    }, 4000);
  }, [
    disabled,
    buttonIsDynamic,
    typeButtonIfDynamic,
    handleClick,
    opButtonTxt,
  ]);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleClickInternal);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleClickInternal);
      }
    };
  }, [handleClickInternal]);

  const isDone = buttonText === "Done!";

  return (
    <div
      style={baseButtonStyles}
      className={`button ${disabled ? "disabled" : ""}`}
      ref={buttonRef}
    >
      <div className="text-icon">
        {!isDone && (
          <SvgIcon
            component={buttonIcon}
            inheritViewBox
            sx={buttonStyleOptions?.iconStyles}
          />
        )}
        <span
          className={`text ${opButtonTxt?.toLowerCase()} ${
            isDone ? "done" : ""
          }`}
        >
          {buttonText}
        </span>
      </div>
    </div>
  );
};

export default OpButton;
