// import { backupFileName, firmwareFileName } from './constants'
import { IWireless, folderAndFileName } from '../../app/utils/types'
import { currentDate } from '../tools/utils'
import path from 'path'
import { DEVICE_WIFI_PASS_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE, DEVICE_WIFI_SSID_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE } from '../script-constants'


const basepathConfigFiles = '../configFiles/'

// Linux commands
const SYS_UPGRADE_FIRMWARE = ({ subfolder, fileName }: folderAndFileName) => {
    const firmwareFile = `${basepathConfigFiles}/${subfolder}/${fileName}`; //get the config file
    return `cd ../ ; sysupgrade /tmp/${firmwareFile}`;
}
const SYS_UPGRADE_RESTORE_BACKUP = ({ subfolder, fileName }: folderAndFileName) => {
    const sdkFile = `${basepathConfigFiles}/${subfolder}/${fileName}`; //get the config file
    return `cd .. ; sysupgrade -r /tmp/${sdkFile}`;
}

const SYS_UPGRADE_CREATE_BACKUP = `cd ../ ; sysupgrade -b backup-RUT951-${currentDate()}.tar.gz`

// Change admin and root password commands
const changeAdminPW = (newPassword: string) =>
    `echo -e "${newPassword}\\n${newPassword}" | passwd admin`

const changeRootPW = (newPassRoot: string) =>
    `echo -e "${newPassRoot}\\n${newPassRoot}" | passwd root`

// Command to count files in config dir
const COUNT_FILES_CONFIG = `cd ../etc/config ; ls -1 | wc -l`

// Command to change SSID and Wi-Fi password
const resetWirelessCommand = ({ newSSID, newWifiPass }: IWireless) =>
    `cd ../etc/config ; sed -i 's/${DEVICE_WIFI_SSID_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE}/${newSSID}/g' wireless ; sed -i 's/${DEVICE_WIFI_PASS_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE}/${newWifiPass}/g' wireless`

export {
    SYS_UPGRADE_FIRMWARE,
    SYS_UPGRADE_RESTORE_BACKUP,
    SYS_UPGRADE_CREATE_BACKUP,
    COUNT_FILES_CONFIG,
    changeAdminPW,
    changeRootPW,
    resetWirelessCommand,
}
