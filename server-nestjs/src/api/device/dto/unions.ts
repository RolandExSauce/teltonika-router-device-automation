import { createUnionType } from '@nestjs/graphql';
import { GraphqlError, Success } from 'src/api/graphql.global.type-defs';
import {
  StatusAfterConfig,
  DeviceWithMoreInfo,
  DevicesSuccess,
} from './device.type-defs';
import {
  configResUnionDescr,
  getDevicesResUnionDescr,
  deviceDetailedSearchResultDescr,
  updatedDeviceResUnionDescr,
  deletedOneOrManyResUnionDescr,
} from 'src/api/graphql.fields.descriptions';

//union config device result
const ConfigDeviceResult = createUnionType({
  name: 'ConfigDeviceResult',
  description: configResUnionDescr,
  types: () => [StatusAfterConfig, GraphqlError] as const,
  resolveType(obj: { configOverview: StatusAfterConfig; customError: string }) {
    return obj.configOverview ? 'DeviceConfigStatus' : 'GraphqlError';
  },
});

//union fetch devices result
const GetDevicesResponse = createUnionType({
  name: 'GetDevicesResponse',
  description: getDevicesResUnionDescr,
  types: () => [DevicesSuccess, GraphqlError] as const,
  resolveType(obj: { devices: DeviceWithMoreInfo[]; customError: string }) {
    return obj.devices ? 'DevicesSuccess' : 'GraphqlError';
  },
});

//union detailed device search result
const DeviceDetailedSearchResult = createUnionType({
  name: 'DeviceDetailedSearchResult',
  description: deviceDetailedSearchResultDescr,
  types: () => [DeviceWithMoreInfo, GraphqlError] as const,
  resolveType(obj: { device: DeviceWithMoreInfo; customError: string }) {
    return obj.device ? 'DeviceWithMoreInfo' : 'GraphqlError';
  },
});

//union update device data result
const UpdatedDeviceResponse = createUnionType({
  name: 'UpdatedDeviceResponse',
  description: updatedDeviceResUnionDescr,
  types: () => [Success, GraphqlError] as const,
  resolveType(obj: { successMsg: string; customError: string }) {
    return obj.successMsg ? 'Success' : 'GraphqlError';
  },
});

//union delete one or more device result
const DeletedOneOrMoreDevicesResponse = createUnionType({
  name: 'DeletedOneOrMoreDevicesResponse',
  description: deletedOneOrManyResUnionDescr,
  types: () => [Success, GraphqlError] as const,
  resolveType(obj: { successMsg: string; customError: string }) {
    return obj.successMsg ? 'Success' : 'GraphqlError';
  },
});

export {
  ConfigDeviceResult,
  GetDevicesResponse,
  DeviceDetailedSearchResult,
  UpdatedDeviceResponse,
  DeletedOneOrMoreDevicesResponse,
};
