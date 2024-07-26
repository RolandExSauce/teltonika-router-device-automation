import {
    GraphqlError,
    QuerySearchDeviceDetailsArgs,
    Device,
} from '../generated/generated__types'
import { DeviceModel } from '../../database/schemas/schemas'
import {
    NO_ROUTER_EXIST,
    SEARCH_OPTION_MISSING_ROUTER,
} from '../error.custom.messages'

//search device resolver
export const searchDeviceDetails = async (
    _: undefined,
    { optionalSearchParam }: QuerySearchDeviceDetailsArgs
): Promise<Device | GraphqlError> => {
    if (!optionalSearchParam || optionalSearchParam === 'NONE') {
        return { customError: SEARCH_OPTION_MISSING_ROUTER }
    }
    const device = (await DeviceModel.findOne({
        $or: [
            //search by multiple params
            { wifiSSID: optionalSearchParam },
            { serialNumber: optionalSearchParam },
            { ipAdress: optionalSearchParam },
        ],
    })) as Device
    if (!device) {
        return { customError: NO_ROUTER_EXIST }
    }
    return device
}
