//FIELDS: # fields of router information 
//CSV_FIELDS ="modell,serialNumber,routerSSID,wifiPass,webUser,shellUser,dfltRouterPass,routerPassWeb,routerPassShell,ipAdress"



// import csvtojson from "csvtojson";
// import { hashUserPasswords } from "./secure-passwords";
// import { Router, User } from "../../graphql/generated/generated__types";
// import { IUserModel, IRouterModel } from "../schemas/interfaces";
// import { NAME_DEV, DEFAULT_DEP, ROLE_DEV, NAME_USER_1, ROLE_USER_1, DEP_USER_1 } from "../../env/use.env";

// //some fields are none cuz the infos were not provided
// const cleanRouterData = (routerData: Router[]): Router[] => {
//   return routerData.map((doc) => {
//     const updatedDoc = {
//       ...doc,
//       isConfigured: true, // we presume the routers being migrated are all configured
//       routerPassShell: doc.routerPassShell || "NOT AVAILABLE",
//       routerPassWeb: doc.routerPassWeb || "NOT AVAILABLE",
//       wifiPass: doc.wifiPass || "NOT AVAILABLE",
//       IMEI: doc.IMEI || "NOT AVAILABLE",
//       LAN_MAC: doc.LAN_MAC || "NOT AVAILABLE",
//       ipAdress: doc.ipAdress || "NOT AVAILABLE"
//     };
//     // Add any other fields not stored in the source file if needed
//     return updatedDoc;
//   });
// };

// const getCSVDATA = async (filePath: string): Promise<Router[]> => {
//   const csvData = (await csvtojson().fromFile(filePath)) as Router[];
//   return cleanRouterData(csvData); //get csv data and return them clean
// };

// //get users data
// const getUSERDATA = async (): Promise<User> => {
//   const passRoot =
//     await hashUserPasswords();
//   return [
//     { username: NAME_DEV, password: passDev, role: ROLE_DEV, userDep: DEFAULT_DEP },
//     { username: NAME_USER_1, password: passRoot, role: ROLE_USER_1, userDep: DEP_USER_1 },
//   ];
// };

// //TODO use this later for csv file upload
// // const routerDocsExists = await RouterModel.find({});
// // if (routerDocsExists.length === 0) {
// //   const csvData = await getCSVDATA(csvPath);
// //   await RouterModel.insertMany(csvData);
// // }

// export { getCSVDATA, getUSERSDATA, ImportDataToMONGO };
