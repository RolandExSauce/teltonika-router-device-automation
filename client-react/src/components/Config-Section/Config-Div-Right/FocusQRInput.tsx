import { useRef, useEffect, useState } from "react";
import {
  offSwitchIconImg,
  onSwitchIconImg,
  clickHereIconImg,
} from "../../../assets/export-imgs";
import { IFocusQRInput } from "../../../utils/types";
import "../styles/FocusQRInput.css";

//section where you can focus qr input via the green/red button
const FocusQRInput: React.FC<IFocusQRInput> = ({ onQrTextChange }) => {
  const [qrTxt, setQRTxt] = useState("");
  const [statusImg, setStatusImg] = useState(offSwitchIconImg);

  const [statusColorAndText, setStatusColorAndText] = useState({
    // inputFocused: false,
    color: "red",
    text: "OFF",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      setStatusImg(onSwitchIconImg);
      setStatusColorAndText({
        // inputFocused: true,
        color: "green",
        text: "ON",
      });
    };

    const handleBlur = () => {
      setStatusImg(offSwitchIconImg);
      setStatusColorAndText({
        // inputFocused: true,
        color: "red",
        text: "OFF",
      });
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  //to notify parent about the change of qr code/sim catcher input field
  useEffect(() => {
    onQrTextChange(qrTxt);
  }, [qrTxt, onQrTextChange]);

  return (
    <div className="focus-qr-container">
      <input
        type="text"
        ref={inputRef}
        value={qrTxt}
        onChange={(e) => setQRTxt(e.target.value)}
        style={{ width: 0, height: 0, opacity: 0 }}
      />
      <img src={clickHereIconImg} style={{ width: 78, height: 55 }} />
      <button
        className="switch-btn"
        onClick={() => {
          console.log(inputRef);
          inputRef?.current?.focus();
        }}
      >
        <img src={statusImg} style={{ width: 40, height: 37 }} />
      </button>
      <p className="qr-status-text">
        QR Catcher is:{" "}
        <span style={{ fontWeight: "bold", color: statusColorAndText.color }}>
          {statusColorAndText.text}
        </span>
      </p>
    </div>
  );
};

export default FocusQRInput;
