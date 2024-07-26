import { NodeSSH } from 'node-ssh'
import scp from 'node-scp'
import { keepaliveInterval, timeout } from '../utils/constants'
import { IDataConfig } from '../../app/utils/types'
import { devicePort, hostName } from '../script-constants'

//TODO: USE node-ssh for copying the files as well

export const middleware_hosts = async (Host: Omit<IDataConfig, 'newCredentials'>) => {
    const { username, password } = Host

    // Create an SSH client
    const clientSSH = new NodeSSH()

    // Establish the SSH connection
    await clientSSH.connect({
        host: hostName,
        port: devicePort,
        username,
        password,
        tryKeyboard: true,
        timeout,
        keepaliveInterval,
    })

    // Set up event listeners for SSH connection events
    clientSSH.connection
        ?.on('ready', () => {
            console.log('Connected!')
        })
        .on('error', (err) => {
            console.error('Error occurred: ', err)
        })
        .on('keyboard-interactive', (name, descr, lang, prompts, finish) => {
            return finish([password]) // Accept new keys
        })

    // Create an SCP client for file copying
    const clientSCP = scp({
        host: hostName,
        port: devicePort,
        username,
        password,
    })

    return {
        clientSSH,
        clientSCP,
    }
}
