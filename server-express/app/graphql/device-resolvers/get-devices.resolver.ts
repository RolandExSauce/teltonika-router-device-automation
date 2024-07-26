import { DeviceModel } from '../../database/schemas/schemas'
import { NO_RECORDS_EMPTY_COL_DEVICE } from '../error.custom.messages'
import {
    Device,
    GetDevicesResult,
} from '../generated/generated__types'

//get router devices resolver
export const getDevices = async (
    _: undefined,
    __: undefined
): Promise<GetDevicesResult> => {
    const devices = (await DeviceModel.find({})) as Device[]
    return devices.length > 0 ?
        {
            devices: devices,
            __typename: 'DevicesSuccess'
        }
        : {
            customError: NO_RECORDS_EMPTY_COL_DEVICE,
            __typename: 'GraphqlError'

        }
}
