import { deviceConnectTimePassesTimeout } from '../utils/audios'
import { max_time_wait_on_config_start } from '../utils/constants'
import { pingHost } from './utils'

//start timer, if device dont connect after certain time, stop query
export const awaitMaybeDeviceNotPlugedOrConnected = async (): Promise<boolean> => {
    let res: boolean | undefined
    let startTime = Date.now()

    while (true) {
        res = await pingHost()
        if (res) {
            return true //Connected
        }
        const currentTime = Date.now()
        const elapsedTimeInSeconds = Math.round(
            (currentTime - startTime) / 1000
        )
        if (elapsedTimeInSeconds > max_time_wait_on_config_start) {
            deviceConnectTimePassesTimeout()
            return false // Timeout reached
        }
    }
}
