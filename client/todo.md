change everywhere where you got: inputQR_SIM_BAR_CODE 
to inputQR_CODE


authRulesTypes => extend user permissions 



ask client: do you want the text powered by blaba or rather:

log in to start configuring your router devices ? 


stop re-render of component when sidebar is toggled ? 

*********************************************************************************

input DeviceConfigInput {
    deviceInfo: DeviceInfo!
    generateNewCredentials: Boolean!
    options: Options!
}



input DeviceInfo {
    modell: DeviceModell!

    wifiSSID: String!
    webUser: String!


    shellUser: Strin
    passForShellUser: String


    passForWebUser: String!
    passWifi: String!
    
    serialNumber: String
    SIMID: String
    IMEI: String
    LAN_MAC: String


    ipAdress: String
    configStatus: InputDeviceConfigStatus
}



input Options {
    kindOfConfig: ConfigOptions!
    # will be set from client based on wether files are uploaded/or existing files are selected
    updateFirmware: Boolean
    updateSDK: Boolean
}


input InputDeviceConfigStatus {
    lastTimeFirmwareUpgraded: String
    lastTimeSDKRestored: String
    lastTimeDataModified: String
    lastUpgradedFirmwareVersionFile: String
    lastUploadedSDKFile: String
}
