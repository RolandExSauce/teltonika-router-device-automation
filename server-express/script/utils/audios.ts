import sound from 'sound-play'
import {
    audioOnCompleteMsg,
    deviceTookTooLong,
    onDeviceConfigError,
    onDeviceConnect,
} from './constants'

const playAudio = async (audioFile: string) => {
    try {
        await sound.play(audioFile)
    } catch (err) {
        /* console.log(err) */
    }
}

export const playMessageDone = async () => {
    await playAudio(audioOnCompleteMsg) //done
}

export const configErrorMessage = async () => {
    await playAudio(onDeviceConfigError) //error
}

export const playDeviceConnected = async () => {
    await playAudio(onDeviceConnect) //connect sound
}

// 3 mins passed, too long, user has to manually
//retry configuration else query would hang forever
export const deviceConnectTimePassesTimeout = async () => {
    await playAudio(deviceTookTooLong)
}
