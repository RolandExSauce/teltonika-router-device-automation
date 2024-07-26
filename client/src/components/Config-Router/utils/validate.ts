import { IRouterInput } from "../../types";

//when code is scanned, need to match lenght 
export const validateConfigInputs = (fields: IRouterInput) => {
  const {
    serialNumber,
    routerSSID,
    IMEI,
    LAN_MAC,
    dfltRouterPass,
    dfltWifiPass,
  } = fields;

  if (
    serialNumber.length !== 10 ||
    routerSSID.length !== 11 ||
    IMEI?.length !== 15 ||
    LAN_MAC?.length !== 12 ||
    dfltRouterPass.length !== 8 ||
    dfltWifiPass?.length !== 8
  ) {
    return false; //will return false if the length those inputs are wrong 
  } else return true;
};
