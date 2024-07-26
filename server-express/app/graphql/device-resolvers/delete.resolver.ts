import {
    MutationDeleteOneOrManyDevicesArgs,
} from '../generated/generated__types'
import { DeviceModel } from '../../database/schemas/schemas'
import {
    CANNOT_DELETE_ROUTER,
    DELETE_WHERE_FOR_ROUTER_MISSING,
    ROUTER_ALTERED,
    ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
} from '../error.custom.messages'
import json2csv from 'json2csv'
import path from 'path'
import fs from 'fs'
import { GraphqlOperationGeneralResponse } from '../../utils/types'

//delete router resolver
export const deleteOneOrManyDevices = async (
    _: undefined,
    { oneOrMoreSSIDToDelete }: MutationDeleteOneOrManyDevicesArgs
): GraphqlOperationGeneralResponse => {
    if (oneOrMoreSSIDToDelete.length === 0) {
        return { customError: DELETE_WHERE_FOR_ROUTER_MISSING }
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

    return {
        customError: ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
    }
}
