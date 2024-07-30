const UploadFileButtonStyles = {
    boxShadow: 3, // Reduced shadow for better layout consistency
    fontSize: 12,
    width: "230px", // Fixed width for consistency
    fontWeight: "bold",
    fontFamily: "Arial",
    borderRadius: "30px",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    height: 57,
    display: "flex", // Ensures proper alignment of icon and text
    alignItems: "center", // Center text and icon vertically
    justifyContent: "center", // Center text and icon horizontally
  }


//input style for custom textfield
  const inputStyleCustomTextField = {
    height: "48px",
    width: "100%",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    padding: "0 12px",
    fontSize: "16px",
    outline: "none",
    margin: "3px",
  };
  
  
  export {
    inputStyleCustomTextField,
    UploadFileButtonStyles
  }


