import { changeAdminPW, changeRootPW } from '../utils/commands.linux'
import { IDataConfig } from '../../app/utils/types'
import { middleware_hosts } from './clients'

//function to update passwords
export const updateDevicePasswords = async (Host: IDataConfig) => {
    const { newCredentials } = Host
   
    const { clientSSH } = await middleware_hosts(Host)
    const CHANGE_ADMIN_PASSWORD = changeAdminPW(
        String(newCredentials?.newPassForWebUser)
    )
    const CHANGE_ROOT_PASSWORD = changeRootPW(
        String(newCredentials?.newPassForShellUser)
    )

    try {
        // Change admin password
        clientSSH.exec(CHANGE_ADMIN_PASSWORD, []).catch((err) => { })

        // Change root password
        clientSSH.exec(CHANGE_ROOT_PASSWORD, []).catch((err) => { })

        // change wifi password: 
    } catch (err) { }

}
