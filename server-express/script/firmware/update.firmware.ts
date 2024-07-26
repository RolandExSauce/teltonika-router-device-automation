
import { IDataConfig } from '../../app/utils/types'
import { check_and_MAYBE_upload_FIRMWARE } from './upload.firmware'
import { middleware_hosts } from '../tools/clients'
import { awaitClient } from '../tools/onServer.down'
import { matcherBeforeFileName, pingHost } from '../tools/utils'
import { playDeviceConnected } from '../utils/audios'
import { SYS_UPGRADE_FIRMWARE } from '../utils/commands.linux'
import { UpdateDeviceFiles } from '../../app/graphql/generated/generated__types'

//TODO: "based on modell, get the correct firmwarefiles and then edit SYS_UPGRADE_FIRMWARE"
//function to flash the firmware
export const flashFirmware = async (
    hostData: Omit<IDataConfig, 'newCredentials'>,
    { wantToUseThisFirmwareFile }: Pick<UpdateDeviceFiles, 'wantToUseThisFirmwareFile'> //only need firmware file
) => {
    const matchedFolderByDeviceModell = matcherBeforeFileName(String(wantToUseThisFirmwareFile)) as RegExpMatchArray
    const matchedFolderByDeviceModellWithUnderScore = matchedFolderByDeviceModell[1];
    const firmwareFileName = wantToUseThisFirmwareFile?.replace(matchedFolderByDeviceModellWithUnderScore, '') as string; // Remove the deviceTypePart from the original name
    try {
        let res: boolean | undefined
        do {
            res = await pingHost()
            if (res) {
                playDeviceConnected()
                // Check and upload firmware if necessary
                await check_and_MAYBE_upload_FIRMWARE(hostData)
                const { clientSSH } = await middleware_hosts(hostData)
                await clientSSH.exec(SYS_UPGRADE_FIRMWARE({
                    subfolder: matchedFolderByDeviceModellWithUnderScore,
                    fileName: firmwareFileName
                }), []).catch(async (err) => {
                    const errMsg = err.message as string
                    // Check if the error message indicates an upgrade process
                    if (errMsg.includes(`Commencing upgrade. Closing all shell sessions.`))
                        clientSSH.dispose() // Upgrade initiated, closing shell sessions
                })
                await awaitClient() //wait for device to be on again
                break
            }
        } while (!res)
        return true
    } catch (err) {
        return false
    }
}
