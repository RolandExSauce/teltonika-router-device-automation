import axios from "axios";
import { DeviceModell } from "../../../generated/gql/graphql";
import { REST_ENPOINT_UPLOAD } from "../../../assets/env-variables";


// Middleware function to make a post request for uploading files
export const handleFileSubmit = async (files: File[] | null, deviceType: DeviceModell, uploadingCSVDATA: boolean) => {
  console.log(files)
  if (files && files.length > 0) {
    const formData = new FormData();
    // Append files to the FormData
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        const file = files[i];
        //so that backend knows where to put the files, for data migration in import folder else in configFiles folder
        const newFileName = `${uploadingCSVDATA ? 'CSV' : deviceType}_${file.name}`;
        // Create a new File object with the modified file name
        const modifiedFile = new File([file], newFileName, { type: file.type });
        formData.append("appFiles", modifiedFile);
      }
    }
    try {
      //const response = 
      await axios.post(
        REST_ENPOINT_UPLOAD,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      // console.log("response from axios: ", response);
    } catch (error) {
      // console.error("error uploading file: ", error);
    }
  } else {
    console.log("No files selected.");
  }
};
