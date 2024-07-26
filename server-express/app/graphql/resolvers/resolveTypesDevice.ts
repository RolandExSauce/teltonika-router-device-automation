// resolving unions using Object types
import { Device, GraphqlError, StatusAfterConfig, Success } from '../generated/generated__types'

//on config router device
const ConfiguredDeviceResult = {
    __resolveType: (obj: {
        statusAfterConfig: StatusAfterConfig,
        errObj: GraphqlError;
    }) => obj.statusAfterConfig ? 'StatusAfterConfig' : 'GraphqlError',
}

//on searched device
const DeviceDetailedSearchResult = {
    __resolveType: (obj: {
        device: Device
        customError: string
    }) => obj.device ? 'Device' : 'GraphqlError',
}

// on get devices query
const GetDevicesResult = {
    __resolveType: (obj: {
        devices: Device[]
        customError: string
    }) =>  obj.devices.length !== 0 ? 'DevicesSuccess' : 'GraphqlError',
}

export {
    ConfiguredDeviceResult,
    DeviceDetailedSearchResult,
    GetDevicesResult,
}
