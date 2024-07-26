// import {
//     MutationUpdateDeviceDataArgs,
// } from '../generated/generated__types'
// import { DeviceModel } from '../../database/schemas/schemas'
// import {
//     COULD_NOT_UPDATE_ROUTER,
//     ROUTER_ALTERED,
// } from '../error.custom.messages'
// import { GraphqlOperationGeneralResponse } from '../../utils/types'

// // Update router resolver
// export const updateDeviceData = async (
//     _: undefined,
//     { updateDeviceInput }: MutationUpdateDeviceDataArgs
// ): GraphqlOperationGeneralResponse => {
//     console.log(updateDeviceInput)

//     // const updatedRouter = await RouterModel.findOneAndUpdate(
//     //   { routerSSID: ssidOfRouterToUpdate },
//     //   {
//     //     $set: {
//     //       serialNumber: newSerialNumber,
//     //       routerSSID: newRouterSSID,
//     //       IMEI: newIMEI,
//     //       LAN_MAC: newLAN_MAC,
//     //       wifiPass: newWifiPass,
//     //       routerPassWeb: newRouterPassWeb,
//     //       routerPassShell: newRouterPassShell,
//     //       ipAdress: newIpAdress,
//     //       isConfigured: newIsConfiguredStatus
//     //     },
//     //   },
//     //   {
//     //     returnOriginal: true,
//     //   }
//     // );

//     // if (updatedRouter) {
//     //   return {
//     //     routerUpdateResponse: ROUTER_ALTERED(
//     //       updatedRouter?.routerSSID as string,
//     //       "UPDATE"
//     //     ),
//     //   };
//     // } else {
//     //   return {
//     //     customError: COULD_NOT_UPDATE_ROUTER,
//     //   };
//     // }

//     return {
//         customError: COULD_NOT_UPDATE_ROUTER,
//     }
// }
