import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Updater,
  type MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import { Device } from "../../generated/gql/graphql";
import { IUser } from "../../utils/types";
import { deviceColumns } from "./DeviceColumns";
import { getTableOptions } from "./TableOptions";
import { useGetDevicesQuery } from "../../services/device.service";
import DeleteDialog from "./DeleteDialog";
import { AuthAndUserRoles } from "../../auth/auth-and-roles";

//Component to for showing table, split into different components
const DeviceTable = () => {
  const { auth } = AuthAndUserRoles();
  const currentUser = useMemo<IUser | null>(() => auth, [auth]);

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<MRT_Row<Device>>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tableData, setTableData] = useState<Device[]>([]);

  const isAdminOrRoot = auth?.role === "ADMIN" || auth?.role === "ROOT";

  //handle opening and closure of modal dialogs
  const handleClose = () => setOpen(false);
  const handleClickOpen = (row: MRT_Row<Device>) => {
    setOpen(true);
    setRowData(row);
  };

  // Use the custom hook to fetch devices
  const { loading } = useGetDevicesQuery(setTableData);

  const handleFullScreenChange = (updater: MRT_Updater<boolean>) => {
    setIsFullScreen((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  //handle row save
  const handleSaveRowEdits: MaterialReactTableProps<Device>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      tableData[row.index] = values;
      setTableData([...tableData]);
      exitEditingMode();
    };

  //momoized device columns
  const memoizedDeviceColumns = useMemo(() => deviceColumns, []);
  const tableLength = tableData.length;
  //memoized table options
  const tableOptions = useMemo(
    () =>
      getTableOptions(
        isAdminOrRoot,
        tableLength,
        isFullScreen,
        handleClickOpen
      ),
    [isAdminOrRoot, isFullScreen, tableLength]
  );

  //create table instance with useMaterial hook
  const tableInstance = useMaterialReactTable({
    columns: memoizedDeviceColumns,
    data: tableData,
    ...tableOptions,
    onIsFullScreenChange: handleFullScreenChange,
    onEditingRowSave: handleSaveRowEdits,
    onEditingRowCancel: handleClose,
  });

  //style object for overall styling
  const styles = {
    title: {
      fontSize: 35,
      color: "#40404F",
      marginTop: 7,
      marginBottom: 25,
      marginLeft: 10,
    },
    highlightedText: {
      color: "#318CE7",
    },
  };

  return (
    <div>
      <h1 style={styles.title}>
        Hello <span>{isAdminOrRoot ? currentUser?.username : "User"}</span>
        ,&nbsp;
        <span>currently we have</span>&nbsp;&nbsp;&nbsp;
        <span style={styles.highlightedText}>
          {tableData.length} Router Devices
        </span>
      </h1>
      {/* show table if query is done loading, TODO: maybe check also if data is available via subscription ?  */}
      {!loading && <MaterialReactTable table={tableInstance} />}

      <DeleteDialog
        openDialog={open}
        handleClose={handleClose}
        rowData={rowData}
        tableData={tableData}
        tableDataLength={tableLength}
        setTableData={setTableData}
      />
    </div>
  );
};

export default DeviceTable;
