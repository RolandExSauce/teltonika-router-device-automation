// export const TableSetUp = () => {
//   const localization: Partial<MRT_Localization> = {
//     // toggleFullScreen: isFullScreen
//     //   ? "Leave Fullscreen mode"
//     //   : "Fullscreen mode",

//     noRecordsToDisplay: (
//       <img
//         style={{
//           height: "450px",
//           width: "570px",
//           margin: "20px",
//           padding: "20px",
//           textAlign: "center",
//         }}
//         src={noResultImg}
//         alt="No results"
//       />
//     ) as unknown as string,
//   };

//   const deviceTable: MRT_TableOptions<Device> = {
//     editDisplayMode: "modal",

//     //columns: memoizedColumns
//     //enableEditing: isAdmin
//     //enableHiding: isAdmin
//     enableColumnFilters: false,
//     // state: {isFullScreen: }
//     //onIsFullScreenChange: () =>
//     initialState: {
//       density: "compact",
//       columnVisibility: {
//         // isConfigured: isAdmin,
//         // routerPassShell: isAdmin,
//         // shellUser: isAdmin,
//       },
//     },

//     //display column def options
//     displayColumnDefOptions: {
//       "mrt-row-actions": {
//         muiTableHeadCellProps: {
//           align: "center",
//         },
//         size: 80,
//       },
//     },

//     enableDensityToggle: false, //maybe set this to true ?
//     // data: tableData,
//     //muiTableBodyProps,

//     enableRowActions: true,
//     positionActionsColumn: "first",
//     enableColumnOrdering: true,

//     //row actions
//     renderRowActions: ({ row, table }) => (
//       <div style={{ display: "flex", flexWrap: "nowrap", gap: "20px" }}>
//         <Tooltip arrow placement="left" title="Edit">
//           <button
//             style={{
//               border: "none",
//               background: "none",
//               margin: 5,
//               cursor: "pointer",
//             }}
//             onClick={() => table.setEditingRow(row)}
//           >
//             <img
//               src={editPencilIcon}
//               alt=""
//               style={{ width: "37px", height: "37px" }}
//             />
//           </button>
//         </Tooltip>

//         <Tooltip arrow placement="right" title="Delete">
//           <button
//             style={{
//               border: "none",
//               background: "none",
//               margin: 5,
//               cursor: "pointer",
//             }}
//             color="error"
//             //   onClick={() => handleClickOpen(row)}
//           >
//             <SvgIcon component={deleteIcon} inheritViewBox />
//           </button>
//         </Tooltip>
//       </div>
//     ),

//     //custom actions
//     renderTopToolbarCustomActions: () => (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: "2rem",
//           padding: "0.5rem",
//         }}
//       >
//         <OpButton
//           opButtonTxtFor="DOWNLOAD"
//           //   handleClick={() => downloadData(tableData)}
//           handleClick={() => console.log("implement")}
//           //disabled={!tableData.length}
//           disabled={true}
//           buttonIsDynamic={true}
//         />

//         <OpButton
//           opButtonTxtFor="BACK"
//           //   handleClick={() => setDeviceOpAndMsg("BACKUP=")  }
//           handleClick={() => console.log("implement")}
//           //disabled={!tableData.length}
//           disabled={true}
//           buttonIsDynamic={true}
//         />
//       </div>
//     ),

//     //if edit dialog pops up, we customize
//     renderEditRowDialogContent: ({ table, internalEditComponents }) => (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           width: "600px", //custom width
//           maxWidth: "100%", //ensure it does not exceed viewport width
//           padding: 20,
//           boxSizing: "border-box",
//           overflow: "hidden", //prevent scrollbars
//         }}
//       >
//         <DialogTitle
//           style={{
//             borderBottom: "thick double #32a1ce",
//             width: "100%",
//             marginBottom: 30,
//             paddingBottom: 20,
//           }}
//         >
//           Edit Device Info
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "1.5rem",
//             alignItems: "center",
//             width: "350px",
//             overflow: "auto",
//           }}
//         >
//           {internalEditComponents}
//           {/* or render custom edit components here */}
//         </DialogContent>

//         <DialogActions>
//           <OpButton
//             opButtonTxtFor="CANCEL"
//             handleClick={() => {
//               table.setEditingRow(null);
//             }}
//             //   disabled={!tableData.length}
//             //   buttonIsDynamic={false}
//             disabled={true}
//             buttonIsDynamic={false}
//           />

//           <OpButton
//             opButtonTxtFor="SAVE"
//             handleClick={() => {
//               table.setEditingRow(null);
//             }}
//             //   disabled={!tableData.length}
//             //   buttonIsDynamic={false}
//             disabled={true}
//             buttonIsDynamic={false}
//           />
//         </DialogActions>
//       </div>
//     ),

//     //implement: handleSaveRowEdits
//     onEditingRowSave: () => {},

//     //implement: handleClose
//     onEditingRowCancel: () => {},

//     //customized localization prop
//     localization,
//   };

//   return deviceTable;
// };

// export default TableSetUp;