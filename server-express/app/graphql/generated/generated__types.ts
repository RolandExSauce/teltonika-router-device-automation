import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  deviceFieldsMust: IDeviceFieldsMust;
  deviceFieldsOptional?: InputMaybe<IDeviceFieldsOptional>;
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

export type IDeviceFieldsMust = {
  modell: DeviceModell;
  passForWebUser: Scalars['String']['input'];
  passWifi: Scalars['String']['input'];
  webUser: Scalars['String']['input'];
  wifiSSID: Scalars['String']['input'];
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

export type TokenResponse = GraphqlError | User;

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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  ConfiguredDeviceResult: ( GraphqlError ) | ( StatusAfterConfig );
  DeviceDetailedSearchResult: ( Device ) | ( GraphqlError );
  GeneralResult: ( GraphqlError ) | ( Success );
  GetAllFilesResult: ( GraphqlError ) | ( TypeOfFiles );
  GetDevicesResult: ( DevicesSuccess ) | ( GraphqlError );
  GetUsersResult: ( GraphqlError ) | ( UsersSuccess );
  TokenResponse: ( GraphqlError ) | ( User );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ConfigOptions: ConfigOptions;
  ConfiguredDeviceResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ConfiguredDeviceResult']>;
  Department: Department;
  Device: ResolverTypeWrapper<Device>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  DeviceConfigInput: DeviceConfigInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeviceConfigStatus: ResolverTypeWrapper<DeviceConfigStatus>;
  DeviceDetailedSearchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeviceDetailedSearchResult']>;
  DeviceFilesForScript: DeviceFilesForScript;
  DeviceInfo: DeviceInfo;
  DeviceModell: DeviceModell;
  DevicesSuccess: ResolverTypeWrapper<DevicesSuccess>;
  File: ResolverTypeWrapper<File>;
  GeneralResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GeneralResult']>;
  GetAllFilesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetAllFilesResult']>;
  GetDevicesResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetDevicesResult']>;
  GetUsersResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GetUsersResult']>;
  GraphqlError: ResolverTypeWrapper<GraphqlError>;
  IDeviceFieldsMust: IDeviceFieldsMust;
  IDeviceFieldsOptional: IDeviceFieldsOptional;
  Mutation: ResolverTypeWrapper<{}>;
  Options: Options;
  Query: ResolverTypeWrapper<{}>;
  StatusAfterConfig: ResolverTypeWrapper<StatusAfterConfig>;
  Success: ResolverTypeWrapper<Success>;
  TDeviceFieldsOptional: ResolverTypeWrapper<TDeviceFieldsOptional>;
  TokenResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TokenResponse']>;
  TypeOfFiles: ResolverTypeWrapper<TypeOfFiles>;
  UpdateDeviceInput: UpdateDeviceInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
  UsersSuccess: ResolverTypeWrapper<UsersSuccess>;
  createUserInput: CreateUserInput;
  loginInput: LoginInput;
  updateSelfInput: UpdateSelfInput;
  updateUserInput: UpdateUserInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ConfiguredDeviceResult: ResolversUnionTypes<ResolversParentTypes>['ConfiguredDeviceResult'];
  Device: Device;
  String: Scalars['String']['output'];
  DeviceConfigInput: DeviceConfigInput;
  Boolean: Scalars['Boolean']['output'];
  DeviceConfigStatus: DeviceConfigStatus;
  DeviceDetailedSearchResult: ResolversUnionTypes<ResolversParentTypes>['DeviceDetailedSearchResult'];
  DeviceFilesForScript: DeviceFilesForScript;
  DeviceInfo: DeviceInfo;
  DevicesSuccess: DevicesSuccess;
  File: File;
  GeneralResult: ResolversUnionTypes<ResolversParentTypes>['GeneralResult'];
  GetAllFilesResult: ResolversUnionTypes<ResolversParentTypes>['GetAllFilesResult'];
  GetDevicesResult: ResolversUnionTypes<ResolversParentTypes>['GetDevicesResult'];
  GetUsersResult: ResolversUnionTypes<ResolversParentTypes>['GetUsersResult'];
  GraphqlError: GraphqlError;
  IDeviceFieldsMust: IDeviceFieldsMust;
  IDeviceFieldsOptional: IDeviceFieldsOptional;
  Mutation: {};
  Options: Options;
  Query: {};
  StatusAfterConfig: StatusAfterConfig;
  Success: Success;
  TDeviceFieldsOptional: TDeviceFieldsOptional;
  TokenResponse: ResolversUnionTypes<ResolversParentTypes>['TokenResponse'];
  TypeOfFiles: TypeOfFiles;
  UpdateDeviceInput: UpdateDeviceInput;
  User: User;
  UsersSuccess: UsersSuccess;
  createUserInput: CreateUserInput;
  loginInput: LoginInput;
  updateSelfInput: UpdateSelfInput;
  updateUserInput: UpdateUserInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ConfiguredDeviceResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfiguredDeviceResult'] = ResolversParentTypes['ConfiguredDeviceResult']> = {
  __resolveType: TypeResolveFn<'GraphqlError' | 'StatusAfterConfig', ParentType, ContextType>;
};

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  configStatus?: Resolver<Maybe<ResolversTypes['DeviceConfigStatus']>, ParentType, ContextType>;
  deviceFieldsOptional?: Resolver<Maybe<ResolversTypes['TDeviceFieldsOptional']>, ParentType, ContextType>;
  modell?: Resolver<ResolversTypes['DeviceModell'], ParentType, ContextType>;
  passForWebUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passWifi?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wifiSSID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceConfigStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeviceConfigStatus'] = ResolversParentTypes['DeviceConfigStatus']> = {
  deviceIsConfigured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  importedFromCSV?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastUpdatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUsedFirmwareFile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUsedSDKFile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeviceDetailedSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeviceDetailedSearchResult'] = ResolversParentTypes['DeviceDetailedSearchResult']> = {
  __resolveType: TypeResolveFn<'Device' | 'GraphqlError', ParentType, ContextType>;
};

export type DevicesSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['DevicesSuccess'] = ResolversParentTypes['DevicesSuccess']> = {
  devices?: Resolver<Array<ResolversTypes['Device']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  folderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralResult'] = ResolversParentTypes['GeneralResult']> = {
  __resolveType: TypeResolveFn<'GraphqlError' | 'Success', ParentType, ContextType>;
};

export type GetAllFilesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetAllFilesResult'] = ResolversParentTypes['GetAllFilesResult']> = {
  __resolveType: TypeResolveFn<'GraphqlError' | 'TypeOfFiles', ParentType, ContextType>;
};

export type GetDevicesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetDevicesResult'] = ResolversParentTypes['GetDevicesResult']> = {
  __resolveType: TypeResolveFn<'DevicesSuccess' | 'GraphqlError', ParentType, ContextType>;
};

export type GetUsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetUsersResult'] = ResolversParentTypes['GetUsersResult']> = {
  __resolveType: TypeResolveFn<'GraphqlError' | 'UsersSuccess', ParentType, ContextType>;
};

export type GraphqlErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphqlError'] = ResolversParentTypes['GraphqlError']> = {
  customError?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  configAndMaybeAddDeviceInDB?: Resolver<ResolversTypes['ConfiguredDeviceResult'], ParentType, ContextType, RequireFields<MutationConfigAndMaybeAddDeviceInDbArgs, 'deviceConfigInput'>>;
  createUser?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  deleteOneOrManyDevices?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationDeleteOneOrManyDevicesArgs, 'oneOrMoreSSIDToDelete'>>;
  deleteUser?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'usernameOfToDeleteUser'>>;
  loginUser?: Resolver<ResolversTypes['TokenResponse'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'loginInput'>>;
  refreshToken?: Resolver<ResolversTypes['TokenResponse'], ParentType, ContextType>;
  updateAndMaybeConfigDeviceAgain?: Resolver<ResolversTypes['ConfiguredDeviceResult'], ParentType, ContextType, RequireFields<MutationUpdateAndMaybeConfigDeviceAgainArgs, 'updateDeviceInput'>>;
  updateSelf?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationUpdateSelfArgs, 'updateSelfInput'>>;
  updateUser?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  backupDATA?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType>;
  getAllFiles?: Resolver<ResolversTypes['GetAllFilesResult'], ParentType, ContextType>;
  getDevices?: Resolver<ResolversTypes['GetDevicesResult'], ParentType, ContextType>;
  getUsers?: Resolver<ResolversTypes['GetUsersResult'], ParentType, ContextType>;
  importDataFromCSVToDB?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType>;
  logoutUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  searchDeviceDetails?: Resolver<ResolversTypes['DeviceDetailedSearchResult'], ParentType, ContextType, RequireFields<QuerySearchDeviceDetailsArgs, 'optionalSearchParam'>>;
};

export type StatusAfterConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusAfterConfig'] = ResolversParentTypes['StatusAfterConfig']> = {
  statusAfterConfig?: Resolver<Maybe<ResolversTypes['DeviceConfigStatus']>, ParentType, ContextType>;
  successMsg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = {
  successMsg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TDeviceFieldsOptionalResolvers<ContextType = any, ParentType extends ResolversParentTypes['TDeviceFieldsOptional'] = ResolversParentTypes['TDeviceFieldsOptional']> = {
  IMEI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  LAN_MAC?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SIMID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passForShellUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serialNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shellUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenResponse'] = ResolversParentTypes['TokenResponse']> = {
  __resolveType: TypeResolveFn<'GraphqlError' | 'User', ParentType, ContextType>;
};

export type TypeOfFilesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TypeOfFiles'] = ResolversParentTypes['TypeOfFiles']> = {
  configFiles?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType>;
  importedCSVFiles?: Resolver<Array<ResolversTypes['File']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  userDep?: Resolver<ResolversTypes['Department'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersSuccess'] = ResolversParentTypes['UsersSuccess']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ConfiguredDeviceResult?: ConfiguredDeviceResultResolvers<ContextType>;
  Device?: DeviceResolvers<ContextType>;
  DeviceConfigStatus?: DeviceConfigStatusResolvers<ContextType>;
  DeviceDetailedSearchResult?: DeviceDetailedSearchResultResolvers<ContextType>;
  DevicesSuccess?: DevicesSuccessResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  GeneralResult?: GeneralResultResolvers<ContextType>;
  GetAllFilesResult?: GetAllFilesResultResolvers<ContextType>;
  GetDevicesResult?: GetDevicesResultResolvers<ContextType>;
  GetUsersResult?: GetUsersResultResolvers<ContextType>;
  GraphqlError?: GraphqlErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StatusAfterConfig?: StatusAfterConfigResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  TDeviceFieldsOptional?: TDeviceFieldsOptionalResolvers<ContextType>;
  TokenResponse?: TokenResponseResolvers<ContextType>;
  TypeOfFiles?: TypeOfFilesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersSuccess?: UsersSuccessResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';