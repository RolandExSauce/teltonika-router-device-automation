import {
    GeneralResult,
    MutationDeleteOneOrManyDevicesArgs,
} from '../generated/generated__types'
import { DeviceModel } from '../../database/schemas/schemas'
import {
    CANNOT_DELETE_ROUTER,
    ONE_OR_MORE_SSID_MISSING_FOR_DELETE,
    ROUTER_ALTERED,
    ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
} from '../error.custom.messages'
import json2csv from 'json2csv'
import path from 'path'
import fs from 'fs'


//delete router resolver
export const deleteOneOrManyDevices = async (
    _: undefined,
    { oneOrMoreSSIDToDelete }: MutationDeleteOneOrManyDevicesArgs
): Promise<GeneralResult> => {

    //user should not be able to delete more than 5 records at once
    if (oneOrMoreSSIDToDelete.length > 5) {
        return {
            customError: 'Cannot delete more than 5 devices at once' //just to controll this
        }
    }

    try {
        if (oneOrMoreSSIDToDelete.length === 0) {
            return { customError: ONE_OR_MORE_SSID_MISSING_FOR_DELETE }
        }

        else {

            //TODO: display name of deleted devices ?
            const deleteResponse =
                await DeviceModel.deleteMany({
                    wifiSSID: { $in: oneOrMoreSSIDToDelete },
                    // returnOriginal: true //TODO: returnOrignal not working ???
                })
            //LATER: TODO: also delete from csv file

            console.log("delete response: ", deleteResponse)
            return {
                successMsg: 'failed'
            }
        }

    }

    catch (e) {

        console.log("error in delete: ", e)

        return {
            customError: "bruhh error"
        }

    }
    // const routerToDelete = await DeviceModel.findOne({ serialNumber });
    // if (!routerToDelete) {
    //   return { customError: CANNOT_DELETE_ROUTER };
    // }

    // const routerSSIDofDeletedRouter = await DeviceModel.findByIdAndDelete(
    //   routerToDelete
    // );

    // if (!routerSSIDofDeletedRouter) {
    //   return { customError: CANNOT_DELETE_ROUTER };
    // }

    // const routers = await DeviceModel.find({});
    // const updateCSVBackUp = json2csv.parse(routers, { fields: CSV_FIELDS });
    // fs.writeFile(
    //   path.join(__dirname, "../../../rut950_data_backup.csv"),
    //   updateCSVBackUp,
    //   (err) => {
    //     if (err) console.info(err);
    //   }
    // );

    // //update backup file
    // if (updateCSVBackUp) {
    //   return {
    //     ssidOfDeletedRouter: ROUTER_ALTERED(
    //       routerSSIDofDeletedRouter.wifiSSID,
    //       "DELETE"
    //     ),
    //   };
    // } else {
    //   return {
    //     customError: ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
    //   };
    // }

    // return {
    //     customError: ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
    // }
}
