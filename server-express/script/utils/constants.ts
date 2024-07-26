import path from 'path'

//firmware and backup file-names plus local paths
const firmwareFileName = 'RUT9M_R_00.07.04.5_WEBUI.bin'
const backupFileName = 'backup-Teltonika-RUT951.com-2023-07-24.tar.gz'
const lgntFW = 18 //e.g. RUT9M_R_00.07.04.5 length of firmware name

// local paths for firmware and backup file
const localPathFirmware = path.join(
    __dirname,
    `../../../configFiles/${firmwareFileName}`
)
const localPathBackup = path.join(
    __dirname,
    `../../../configFiles/${backupFileName}`
)

//audio notifications
const audioOnCompleteMsg = path.join(__dirname, `./audio/completedMessage.mp3`)
const onDeviceConnect = path.join(__dirname, `./audio/connectedAudio.mp3`)
const deviceTookTooLong = path.join(__dirname, `./audio/toLongToConnect.mp3`)
const onDeviceConfigError = path.join(__dirname, `./audio/configErrorSound.mp3`)

//remote paths on the server
const remotePathFirmware = `/tmp/${firmwareFileName}`
const remotePathBackup = `/tmp/${backupFileName}`
const remote_path_current_firmware_version = '/etc/version' //firmware version

//after two minute of processing the firmware file, attempt pinging the client
const timeout = 180000 // 3 minutes
const keepaliveInterval = 1000 // alive interval
const max_time_wait_on_config_start = 180

export {
    lgntFW,
    backupFileName,
    firmwareFileName,
    localPathFirmware,
    localPathBackup,
    audioOnCompleteMsg,
    onDeviceConnect,
    deviceTookTooLong,
    onDeviceConfigError,
    remotePathFirmware,
    remotePathBackup,
    remote_path_current_firmware_version,
    max_time_wait_on_config_start,
    keepaliveInterval,
    timeout,
}
