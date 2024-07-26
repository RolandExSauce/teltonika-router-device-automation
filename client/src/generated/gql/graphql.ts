/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum ConfigOptions {
  Option1 = 'Option1',
  Option2 = 'Option2',
  Option3 = 'Option3'
}

export type ConfiguredDeviceResult = GraphqlError | StatusAfterConfig;

export enum Department {
  It = 'IT',
  Others = 'OTHERS'
}

export type Device = {
  __typename?: 'Device';
  configStatus?: Maybe<DeviceConfigStatus>;
  deviceFieldsOptional?: Maybe<TDeviceFieldsOptional>;
  modell: DeviceModell;
  passForWebUser: Scalars['String']['output'];
  passWifi: Scalars['String']['output'];
  webUser: Scalars['String']['output'];
  wifiSSID: Scalars['String']['output'];
};

export type DeviceConfigInput = {
  configAgain?: InputMaybe<Scalars['Boolean']['input']>;
  deviceInfo: DeviceInfo;
  generateNewCredentials: Scalars['Boolean']['input'];
  options: Options;
};

export type DeviceConfigStatus = {
  __typename?: 'DeviceConfigStatus';
  deviceIsConfigured: Scalars['Boolean']['output'];
  importedFromCSV: Scalars['Boolean']['output'];
  lastUpdatedAt: Scalars['String']['output'];
  lastUsedFirmwareFile: Scalars['String']['output'];
  lastUsedSDKFile: Scalars['String']['output'];
};

export type DeviceDetailedSearchResult = Device | GraphqlError;

export type DeviceFilesForScript = {
  useThisFirmwareFile?: InputMaybe<Scalars['String']['input']>;
  useThisSDKFile?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceInfo = {
  deviceFieldsOptional?: InputMaybe<IDeviceFieldsOptional>;
  modell: DeviceModell;
  passForWebUser: Scalars['String']['input'];
  passWifi: Scalars['String']['input'];
  webUser: Scalars['String']['input'];
  wifiSSID: Scalars['String']['input'];
};

export enum DeviceModell {
  Rut200 = 'RUT200',
  Rut230 = 'RUT230',
  Rut240 = 'RUT240',
  Rut260 = 'RUT260',
  Rut300 = 'RUT300',
  Rut360 = 'RUT360',
  Rut901 = 'RUT901',
  Rut906 = 'RUT906',
  Rut950 = 'RUT950',
  Rut951 = 'RUT951',
  Rut955 = 'RUT955',
  Rut956 = 'RUT956'
}

export type DevicesSuccess = {
  __typename?: 'DevicesSuccess';
  devices: Array<Device>;
};

export type File = {
  __typename?: 'File';
  fileName: Scalars['String']['output'];
  folderName: Scalars['String']['output'];
};

export type GeneralResult = GraphqlError | Success;

export type GetAllFilesResult = GraphqlError | TypeOfFiles;

export type GetDevicesResult = DevicesSuccess | GraphqlError;

export type GetUsersResult = GraphqlError | UsersSuccess;

export type GraphqlError = {
  __typename?: 'GraphqlError';
  customError: Scalars['String']['output'];
};

export type IDeviceFieldsOptional = {
  IMEI?: InputMaybe<Scalars['String']['input']>;
  LAN_MAC?: InputMaybe<Scalars['String']['input']>;
  SIMID?: InputMaybe<Scalars['String']['input']>;
  passForShellUser?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  shellUser?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  configAndMaybeAddDeviceInDB: ConfiguredDeviceResult;
  createUser: GeneralResult;
  deleteOneOrManyDevices: GeneralResult;
  deleteUser: GeneralResult;
  loginUser: TokenResponse;
  refreshToken: TokenResponse;
  updateAndMaybeConfigDeviceAgain: ConfiguredDeviceResult;
  updateSelf: GeneralResult;
  updateUser: GeneralResult;
};


export type MutationConfigAndMaybeAddDeviceInDbArgs = {
  deviceConfigInput: DeviceConfigInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteOneOrManyDevicesArgs = {
  oneOrMoreSSIDToDelete: Array<Scalars['String']['input']>;
};


export type MutationDeleteUserArgs = {
  usernameOfToDeleteUser: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateAndMaybeConfigDeviceAgainArgs = {
  updateDeviceInput: UpdateDeviceInput;
};


export type MutationUpdateSelfArgs = {
  updateSelfInput: UpdateSelfInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Options = {
  deviceFilesForScript: DeviceFilesForScript;
  kindOfConfig: ConfigOptions;
};

export type Query = {
  __typename?: 'Query';
  backupDATA: GeneralResult;
  getAllFiles: GetAllFilesResult;
  getDevices: GetDevicesResult;
  getUsers: GetUsersResult;
  importDataFromCSVToDB: GeneralResult;
  logoutUser: Scalars['Boolean']['output'];
  searchDeviceDetails: DeviceDetailedSearchResult;
};


export type QuerySearchDeviceDetailsArgs = {
  optionalSearchParam: Scalars['String']['input'];
};

export type StatusAfterConfig = {
  __typename?: 'StatusAfterConfig';
  statusAfterConfig?: Maybe<DeviceConfigStatus>;
  successMsg: Scalars['String']['output'];
};

export type Success = {
  __typename?: 'Success';
  successMsg: Scalars['String']['output'];
};

export type TDeviceFieldsOptional = {
  __typename?: 'TDeviceFieldsOptional';
  IMEI?: Maybe<Scalars['String']['output']>;
  LAN_MAC?: Maybe<Scalars['String']['output']>;
  SIMID?: Maybe<Scalars['String']['output']>;
  passForShellUser?: Maybe<Scalars['String']['output']>;
  serialNumber?: Maybe<Scalars['String']['output']>;
  shellUser?: Maybe<Scalars['String']['output']>;
};

export type TokenResponse = GraphqlError | UserResponse;

export type TypeOfFiles = {
  __typename?: 'TypeOfFiles';
  configFiles: Array<File>;
  importedCSVFiles: Array<File>;
};

export type UpdateDeviceInput = {
  updateInput?: InputMaybe<DeviceConfigInput>;
  wifiSSIDOfDeviceToUpdate: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  password: Scalars['String']['output'];
  role: UserRole;
  userDep: Department;
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  Root = 'ROOT',
  User = 'USER'
}

export type UsersSuccess = {
  __typename?: 'UsersSuccess';
  users: Array<User>;
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  role: UserRole;
  userDep: Department;
  username: Scalars['String']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateSelfInput = {
  newPassword?: InputMaybe<Scalars['String']['input']>;
  newUsername?: InputMaybe<Scalars['String']['input']>;
  usernameOfToUpdateUser: Scalars['String']['input'];
};

export type UpdateUserInput = {
  newPassword?: InputMaybe<Scalars['String']['input']>;
  newRole?: InputMaybe<UserRole>;
  newUserDep?: InputMaybe<Department>;
  newUsername?: InputMaybe<Scalars['String']['input']>;
  usernameOfToUpdateUser: Scalars['String']['input'];
};

export type ConfigAndMaybeAddDeviceInDbMutationVariables = Exact<{
  deviceConfigInput: DeviceConfigInput;
}>;


export type ConfigAndMaybeAddDeviceInDbMutation = { __typename?: 'Mutation', configAndMaybeAddDeviceInDB: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'StatusAfterConfig', successMsg: string, statusAfterConfig?: { __typename?: 'DeviceConfigStatus', lastUsedFirmwareFile: string, lastUsedSDKFile: string, deviceIsConfigured: boolean, importedFromCSV: boolean, lastUpdatedAt: string } | null } };

export type GetDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDevicesQuery = { __typename?: 'Query', getDevices: { __typename?: 'DevicesSuccess', devices: Array<{ __typename?: 'Device', modell: DeviceModell, wifiSSID: string, webUser: string, passForWebUser: string, passWifi: string, deviceFieldsOptional?: { __typename?: 'TDeviceFieldsOptional', shellUser?: string | null, passForShellUser?: string | null, serialNumber?: string | null, SIMID?: string | null, IMEI?: string | null, LAN_MAC?: string | null } | null, configStatus?: { __typename?: 'DeviceConfigStatus', lastUsedFirmwareFile: string, lastUsedSDKFile: string, deviceIsConfigured: boolean, importedFromCSV: boolean, lastUpdatedAt: string } | null }> } | { __typename?: 'GraphqlError', customError: string } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser: boolean };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'UsersSuccess', users: Array<{ __typename?: 'User', username: string, password: string, verified: boolean, role: UserRole, userDep: Department }> } };

export type LoginUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'UserResponse', accessToken: string, user: { __typename?: 'User', username: string, password: string, verified: boolean, role: UserRole, userDep: Department } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'Success', successMsg: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'Success', successMsg: string } };

export type UpdateSelfMutationVariables = Exact<{
  updateSelfInput: UpdateSelfInput;
}>;


export type UpdateSelfMutation = { __typename?: 'Mutation', updateSelf: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'Success', successMsg: string } };

export type DeleteUserMutationVariables = Exact<{
  usernameOfToDeleteUser: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'GraphqlError', customError: string } | { __typename?: 'Success', successMsg: string } };


export const ConfigAndMaybeAddDeviceInDbDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfigAndMaybeAddDeviceInDB"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceConfigInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeviceConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configAndMaybeAddDeviceInDB"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceConfigInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceConfigInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StatusAfterConfig"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusAfterConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastUsedFirmwareFile"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedSDKFile"}},{"kind":"Field","name":{"kind":"Name","value":"deviceIsConfigured"}},{"kind":"Field","name":{"kind":"Name","value":"importedFromCSV"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"successMsg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<ConfigAndMaybeAddDeviceInDbMutation, ConfigAndMaybeAddDeviceInDbMutationVariables>;
export const GetDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DevicesSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modell"}},{"kind":"Field","name":{"kind":"Name","value":"wifiSSID"}},{"kind":"Field","name":{"kind":"Name","value":"webUser"}},{"kind":"Field","name":{"kind":"Name","value":"passForWebUser"}},{"kind":"Field","name":{"kind":"Name","value":"passWifi"}},{"kind":"Field","name":{"kind":"Name","value":"deviceFieldsOptional"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shellUser"}},{"kind":"Field","name":{"kind":"Name","value":"passForShellUser"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"SIMID"}},{"kind":"Field","name":{"kind":"Name","value":"IMEI"}},{"kind":"Field","name":{"kind":"Name","value":"LAN_MAC"}}]}},{"kind":"Field","name":{"kind":"Name","value":"configStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastUsedFirmwareFile"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedSDKFile"}},{"kind":"Field","name":{"kind":"Name","value":"deviceIsConfigured"}},{"kind":"Field","name":{"kind":"Name","value":"importedFromCSV"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdatedAt"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<GetDevicesQuery, GetDevicesQueryVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserQuery, LogoutUserQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UsersSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userDep"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"loginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userDep"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Success"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"successMsg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Success"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"successMsg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateSelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSelfInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateSelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSelfInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSelfInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Success"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"successMsg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSelfMutation, UpdateSelfMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameOfToDeleteUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameOfToDeleteUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameOfToDeleteUser"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Success"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"successMsg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GraphqlError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customError"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;

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
    