/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation ConfigAndMaybeAddDeviceInDB($deviceConfigInput: DeviceConfigInput!) {\n    configAndMaybeAddDeviceInDB(deviceConfigInput: $deviceConfigInput) {\n      ... on StatusAfterConfig {\n        statusAfterConfig {\n        lastUsedFirmwareFile\n        lastUsedSDKFile\n        deviceIsConfigured\n        importedFromCSV\n        lastUpdatedAt\n      }\n      successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.ConfigAndMaybeAddDeviceInDbDocument,
    "\nquery GetDevices {\n  getDevices {\n    ... on DevicesSuccess {\n      devices {\n        modell\n        wifiSSID\n        webUser\n        passForWebUser\n        passWifi\n\n        deviceFieldsOptional {\n          shellUser\n          passForShellUser\n          serialNumber\n          SIMID\n          IMEI\n          LAN_MAC\n        }\n        configStatus {\n          lastUsedFirmwareFile\n          lastUsedSDKFile\n          deviceIsConfigured\n          importedFromCSV\n          lastUpdatedAt\n        }\n      }\n    }\n    ... on GraphqlError {\n      customError\n    }\n  }\n}\n": types.GetDevicesDocument,
    "\n  query LogoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  query GetUsers {\n    getUsers {\n      ... on UsersSuccess {\n        users {    \n          username\n          password\n          verified\n          role\n          userDep\n        }\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  mutation LoginUser($loginInput: loginInput!) {\n    loginUser(loginInput: $loginInput) {\n      ... on User {\n          username\n          password\n          verified\n          role\n          userDep\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation CreateUser($createUserInput: createUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($updateUserInput: updateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation UpdateSelf($updateSelfInput: updateSelfInput!) {\n    updateSelf(updateSelfInput: $updateSelfInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.UpdateSelfDocument,
    "\n  mutation DeleteUser($usernameOfToDeleteUser: String!) {\n    deleteUser(usernameOfToDeleteUser: $usernameOfToDeleteUser) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n": types.DeleteUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfigAndMaybeAddDeviceInDB($deviceConfigInput: DeviceConfigInput!) {\n    configAndMaybeAddDeviceInDB(deviceConfigInput: $deviceConfigInput) {\n      ... on StatusAfterConfig {\n        statusAfterConfig {\n        lastUsedFirmwareFile\n        lastUsedSDKFile\n        deviceIsConfigured\n        importedFromCSV\n        lastUpdatedAt\n      }\n      successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ConfigAndMaybeAddDeviceInDB($deviceConfigInput: DeviceConfigInput!) {\n    configAndMaybeAddDeviceInDB(deviceConfigInput: $deviceConfigInput) {\n      ... on StatusAfterConfig {\n        statusAfterConfig {\n        lastUsedFirmwareFile\n        lastUsedSDKFile\n        deviceIsConfigured\n        importedFromCSV\n        lastUpdatedAt\n      }\n      successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetDevices {\n  getDevices {\n    ... on DevicesSuccess {\n      devices {\n        modell\n        wifiSSID\n        webUser\n        passForWebUser\n        passWifi\n\n        deviceFieldsOptional {\n          shellUser\n          passForShellUser\n          serialNumber\n          SIMID\n          IMEI\n          LAN_MAC\n        }\n        configStatus {\n          lastUsedFirmwareFile\n          lastUsedSDKFile\n          deviceIsConfigured\n          importedFromCSV\n          lastUpdatedAt\n        }\n      }\n    }\n    ... on GraphqlError {\n      customError\n    }\n  }\n}\n"): (typeof documents)["\nquery GetDevices {\n  getDevices {\n    ... on DevicesSuccess {\n      devices {\n        modell\n        wifiSSID\n        webUser\n        passForWebUser\n        passWifi\n\n        deviceFieldsOptional {\n          shellUser\n          passForShellUser\n          serialNumber\n          SIMID\n          IMEI\n          LAN_MAC\n        }\n        configStatus {\n          lastUsedFirmwareFile\n          lastUsedSDKFile\n          deviceIsConfigured\n          importedFromCSV\n          lastUpdatedAt\n        }\n      }\n    }\n    ... on GraphqlError {\n      customError\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LogoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  query LogoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      ... on UsersSuccess {\n        users {    \n          username\n          password\n          verified\n          role\n          userDep\n        }\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      ... on UsersSuccess {\n        users {    \n          username\n          password\n          verified\n          role\n          userDep\n        }\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($loginInput: loginInput!) {\n    loginUser(loginInput: $loginInput) {\n      ... on User {\n          username\n          password\n          verified\n          role\n          userDep\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($loginInput: loginInput!) {\n    loginUser(loginInput: $loginInput) {\n      ... on User {\n          username\n          password\n          verified\n          role\n          userDep\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: createUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: createUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($updateUserInput: updateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($updateUserInput: updateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSelf($updateSelfInput: updateSelfInput!) {\n    updateSelf(updateSelfInput: $updateSelfInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSelf($updateSelfInput: updateSelfInput!) {\n    updateSelf(updateSelfInput: $updateSelfInput) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($usernameOfToDeleteUser: String!) {\n    deleteUser(usernameOfToDeleteUser: $usernameOfToDeleteUser) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($usernameOfToDeleteUser: String!) {\n    deleteUser(usernameOfToDeleteUser: $usernameOfToDeleteUser) {\n      ... on Success {\n        successMsg\n      }\n      ... on GraphqlError {\n        customError\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;