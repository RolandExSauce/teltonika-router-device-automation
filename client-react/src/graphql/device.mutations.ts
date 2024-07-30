import { gql } from "@apollo/client";

//delete router
// const DELETE_ROUTER_MUTATION = gql`
//   mutation DeleteRouter($serialNumber: String!) {
//     deleteRouter(serialNumber: $serialNumber) {
//       ... on DeleteRouterResponse {
//         ssidOfDeletedRouter
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
// `;

//update router
// const UPDATE_ROUTER_MUTATION = gql`
//   mutation UpdateRouter($updateRouterInput: updateRouterInput!) {
//     updateRouter(updateRouterInput: $updateRouterInput) {
//       ... on UpdateRouterResponse {
//         routerUpdateResponse
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
// `;

//config device mutation
const CONFIG_DEVICE_MUTATION = gql`
  mutation ConfigAndMaybeAddDeviceInDB($deviceConfigInput: DeviceConfigInput!) {
    configAndMaybeAddDeviceInDB(deviceConfigInput: $deviceConfigInput) {
      ... on StatusAfterConfig {
        statusAfterConfig {
        lastUsedFirmwareFile
        lastUsedSDKFile
        deviceIsConfigured
        importedFromCSV
        lastUpdatedAt
      }
      successMsg
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;

/*user mutations ***************************************************************/



export {
  CONFIG_DEVICE_MUTATION,
}