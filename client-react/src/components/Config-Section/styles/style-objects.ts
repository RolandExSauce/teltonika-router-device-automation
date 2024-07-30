import { CSSProperties } from "react";

//style for automationSteps.tsx *****************************
const commonTextStyle = {
    fontSize: 21,
    lineHeight: 1.5,
  };
  const stepNumberStyle = {
    color: "#00538C",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5,
  };
  //******************************************************/

  //style for ConfigInstruction.tsx *****************************
  const warningStyle: CSSProperties = {
    backgroundColor: "#ffeaea",
    padding: "15px 0px 15px 10px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    marginTop: "50px",
    width: "94%",
  };

  const imageStyle = {
    width: 80,
    height: 80,
    margin: 10,
  };

  const textStyle = {
    fontSize: "1.5rem",
    lineHeight: 1.5,
  };

  const lazyGarfieldStyle = {
    width: "90%",
    marginTop: 20,
    paddingTop: 20,
    borderRadius: 30,
  };
//******************************************************************************* */

  export {
    commonTextStyle,
    stepNumberStyle,
    warningStyle,
    imageStyle,
    textStyle,
    lazyGarfieldStyle
  }