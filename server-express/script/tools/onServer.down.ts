import { playDeviceConnected } from '../utils/audios'
import { timeout } from '../utils/constants'
import { pingHost } from './utils'

//when config is running, device is not reachable, lets continue to ping until alive
export const awaitClient = async () => {
    return new Promise<boolean>((resolve) => {
        const checkDeviceConnected = async () => {
            const response = await pingHost()
            if (response) {
                await playDeviceConnected()
                resolve(true)
            } else {
                setTimeout(checkDeviceConnected, 1000) // Adjust the interval as needed
            }
        }
        setTimeout(() => {
            checkDeviceConnected()
        }, timeout)
    })
}
