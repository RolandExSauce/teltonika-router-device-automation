// import { useCallback, useMemo, useState } from "react"; // React hooks
// import {
//   MaterialReactTable,
//   type MaterialReactTableProps,
//   type MRT_ColumnDef,
//   type MRT_Updater,
//   type MRT_Row,
//   MRT_Localization,
//   useMaterialReactTable,
// } from "material-react-table";
// import { Box, Button, SvgIcon, Stack, TextField, Tooltip } from "@mui/material";
// import {
//   copyIcon,
//   deleteIcon,
//   editPencilIcon,
//   FalseSVG,
//   noResultImg,
//   TrueSVG,
// } from "../../../assets/icons/exportIcons";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// //graphQL imports
// import { Query, Device } from "../../../generated/gql/graphql";
// import { useQuery } from "@apollo/client";
// import { GET_DEVICES_QUERY } from "../../../graphql/queries";

// //utility functions and constants
// import { downloadData } from "../tools/utils";
// import {
//   CANNOT_DOWNLOAD_EXCEL,
//   DOWNLOADED_EXCEL,
// } from "../../../assets/constants";
// import { CurrentUser } from "../../../utils/types";
// import OpButton from "../OpButton";
// import { deviceColumns } from "../DeviceColumns";

// const DeviceTableTest = () => {
//   const currentUser = {} as CurrentUser; // Temporary user object, replace with actual context
//   const [open, setOpen] = useState(false);
//   const [rowData, setRowData] = useState<MRT_Row<Device>>();
//   const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
//   const [deviceOpAndMsg, setDeviceOpAndMsg] = useState<string>("");
//   const [tableData, setTableData] = useState<Device[]>([]);

//   // Extract operation checks into constants for better readability
//   const startsWithOperation = (operation: string) =>
//     deviceOpAndMsg.startsWith(operation + "=");
//   const OP_DELETE = startsWithOperation("DELETE");
//   const OP_UPDATE = startsWithOperation("UPDATE");
//   const OP_CREATE_BACKUP = startsWithOperation("BACKUP");
//   const OP_DOWNLOAD_SUCCESS = startsWithOperation("DOWNLOAD_SUCCESS");
//   const OP_DOWNLOAD_FAILURE = startsWithOperation("DOWNLOAD_FAILURE");
//   const OP_FETCH_ROUTERS = startsWithOperation("FETCH_ROUTERS");

//   const isAdmin = currentUser?.role === "ADMIN";

//   const handleClose = () => setOpen(false);

//   const handleClickOpen = (row: MRT_Row<Device>) => {
//     setOpen(true);
//     setRowData(row);
//   };

//   const { loading } = useQuery<Query>(GET_DEVICES_QUERY, {
//     onCompleted: ({ getDevices }) => {
//       if (getDevices.__typename === "DevicesSuccess") {
//         const modData = getDevices.devices?.map((r: Device) => ({ ...r }));
//         setTableData(modData);
//       } else if (getDevices.__typename === "GraphqlError") {
//         setDeviceOpAndMsg(`FETCH_ROUTERS=${getDevices.customError}`);
//       }
//     },
//     onError: (err) => {
//       setDeviceOpAndMsg(`FETCH_ROUTERS=${err.message}`);
//       setTimeout(() => setDeviceOpAndMsg(""), 3000);
//     },
//   });

//   const handleFullScreenChange = (updater: MRT_Updater<boolean>) => {
//     setIsFullScreen((prevPagination) =>
//       updater instanceof Function ? updater(prevPagination) : updater
//     );
//   };

//   const handleSaveRowEdits: MaterialReactTableProps<Device>["onEditingRowSave"] =
//     async ({ exitEditingMode, row, values }) => {
//       tableData[row.index] = values;
//       setTableData([...tableData]);
//       exitEditingMode();
//     };

//   const handleDeleteRow = useCallback(
//     (wifiSSID: string) => {
//       const routerIndex = tableData.findIndex(
//         (device) => device.wifiSSID === wifiSSID
//       );
//       if (routerIndex !== -1) {
//         tableData.splice(routerIndex, 1);
//         setTableData([...tableData]);
//       }
//     },
//     [tableData]
//   );

//   const memoizedColumns = useMemo(() => deviceColumns, []);

//   // const table = useMaterialReactTable();

//   return (
//     <div>
//       <h1
//         style={{
//           fontSize: 35,
//           color: "#40404F",
//           marginTop: 7,
//           marginBottom: 25,
//           marginLeft: 10,
//         }}
//       >
//         Hello <span>{isAdmin ? currentUser.username : "User"}</span>,&nbsp;
//         <span>currently we have</span>&nbsp;&nbsp;&nbsp;
//         <span style={{ color: "#318CE7" }}>
//           {tableData.length} Router Devices
//         </span>
//       </h1>

//       {!loading && (
//         <div>
//           <MaterialReactTable
//             editDisplayMode="modal"
//             columns={memoizedColumns}
//             enableEditing={isAdmin}
//             enableHiding={isAdmin}
//             enableColumnFilters={false}
//             state={{ isFullScreen }}
//             onIsFullScreenChange={handleFullScreenChange}
//             initialState={{
//               density: "compact",
//               columnVisibility: {
//                 isConfigured: isAdmin,
//                 routerPassShell: isAdmin,
//                 shellUser: isAdmin,
//               },
//             }}
//             displayColumnDefOptions={{
//               "mrt-row-actions": {
//                 muiTableHeadCellProps: {
//                   align: "center",
//                 },
//                 size: 80,
//               },
//             }}
//             enableDensityToggle={false}
//             data={tableData}
//             muiTableBodyProps={{}}
//             enableRowActions={true}
//             positionActionsColumn="first"
//             enableColumnOrdering
//             renderRowActions={({ row, table }) => (
//               <div style={{ display: "flex", flexWrap: "nowrap", gap: "20px" }}>
//                 <Tooltip arrow placement="left" title="Edit">
//                   <button
//                     style={{
//                       border: "none",
//                       background: "none",
//                       margin: 5,
//                       cursor: "pointer",
//                     }}
//                     onClick={() => table.setEditingRow(row)}
//                   >
//                     <img
//                       src={editPencilIcon}
//                       alt=""
//                       style={{ width: "37px", height: "37px" }}
//                     />
//                   </button>
//                 </Tooltip>

//                 <Tooltip arrow placement="right" title="Delete">
//                   <button
//                     style={{
//                       border: "none",
//                       background: "none",
//                       margin: 5,
//                       cursor: "pointer",
//                     }}
//                     color="error"
//                     onClick={() => handleClickOpen(row)}
//                   >
//                     <SvgIcon component={deleteIcon} inheritViewBox />
//                   </button>
//                 </Tooltip>
//               </div>
//             )}
//             renderTopToolbarCustomActions={() => (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   gap: "2rem",
//                   padding: "0.5rem",
//                 }}
//               >
//                 <OpButton
//                   opButtonTxtFor="DOWNLOAD"
//                   handleClick={() => downloadData(tableData)}
//                   disabled={!tableData.length}
//                   buttonIsDynamic={true}
//                 />

//                 <OpButton
//                   opButtonTxtFor="BACK"
//                   handleClick={() => setDeviceOpAndMsg("BACKUP=")}
//                   disabled={!tableData.length}
//                   buttonIsDynamic={true}
//                 />
//               </div>
//             )}
//             renderEditRowDialogContent={({
//               table,
//               row,
//               internalEditComponents,
//             }) => (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                   width: "600px", //custom width
//                   maxWidth: "100%", //ensure it does not exceed viewport width
//                   padding: 20,
//                   boxSizing: "border-box",
//                   overflow: "hidden", //prevent scrollbars
//                 }}
//               >
//                 <DialogTitle
//                   style={{
//                     borderBottom: "thick double #32a1ce",
//                     width: "100%",
//                     marginBottom: 30,
//                     paddingBottom: 20,
//                   }}
//                 >
//                   Edit Device Info
//                 </DialogTitle>
//                 <DialogContent
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "1.5rem",
//                     alignItems: "center",
//                     width: "350px",
//                     overflow: "auto",
//                   }}
//                 >
//                   {internalEditComponents}
//                   {/* or render custom edit components here */}
//                 </DialogContent>

//                 <DialogActions>
//                   <OpButton
//                     opButtonTxtFor="CANCEL"
//                     handleClick={() => {
//                       table.setEditingRow(null);
//                     }}
//                     disabled={!tableData.length}
//                     buttonIsDynamic={false}
//                   />

//                   <OpButton
//                     opButtonTxtFor="SAVE"
//                     handleClick={() => {
//                       table.setEditingRow(null);
//                     }}
//                     disabled={!tableData.length}
//                     buttonIsDynamic={false}
//                   />
//                 </DialogActions>
//               </div>
//             )}
//             onEditingRowSave={handleSaveRowEdits}
//             onEditingRowCancel={handleClose}
//             localization={{
//               toggleFullScreen: isFullScreen
//                 ? "Leave Fullscreen mode"
//                 : "Fullscreen mode",
//               noRecordsToDisplay: (
//                 <img
//                   style={{
//                     height: "450px",
//                     width: "570px",
//                     margin: "20px",
//                     padding: "20px",
//                     textAlign: "center",
//                   }}
//                   src={noResultImg}
//                   alt="No results"
//                 />
//               ) as unknown as string,
//             }}
//           />
//         </div>
//       )}

//       {/* {OP_CREATE_BACKUP && (
//         <span>{`Backup was successfully created at ${new Date().toDateString()}`}</span>
//       )}
//       {OP_DOWNLOAD_SUCCESS && <span>{DOWNLOADED_EXCEL}</span>}
//       {OP_DOWNLOAD_FAILURE && <span>{CANNOT_DOWNLOAD_EXCEL}</span>}
//       {OP_FETCH_ROUTERS && <span>{deviceOpAndMsg.split("=")[1]}</span>} */}

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Are you sure you want to delete?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete router with wifiSSID:{" "}
//             {rowData?.original.wifiSSID}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button
//             onClick={() => {
//               handleDeleteRow(rowData?.original.wifiSSID as string);
//               handleClose();
//             }}
//             autoFocus
//           >
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DeviceTableTest;
