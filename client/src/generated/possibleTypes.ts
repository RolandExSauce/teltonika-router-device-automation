
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "ConfiguredDeviceResult": [
      "GraphqlError",
      "StatusAfterConfig"
    ],
    "DeviceDetailedSearchResult": [
      "Device",
      "GraphqlError"
    ],
    "GeneralResult": [
      "GraphqlError",
      "Success"
    ],
    "GetAllFilesResult": [
      "GraphqlError",
      "TypeOfFiles"
    ],
    "GetDevicesResult": [
      "DevicesSuccess",
      "GraphqlError"
    ],
    "GetUsersResult": [
      "GraphqlError",
      "UsersSuccess"
    ],
    "TokenResponse": [
      "GraphqlError",
      "UserResponse"
    ]
  }
};
      export default result;
    