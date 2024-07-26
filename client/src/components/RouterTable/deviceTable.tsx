import { useCallback, useContext, useMemo, useState } from "react"; //react hooks
import _ from "lodash";
//material react table stuff
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
  type MRT_Updater,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Delete, Edit } from "@mui/icons-material";
import { FalseSVG, TrueSVG } from "../../assets/icons/exportIcons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//graphql stuff
import { Mutation, Query, Device } from "../../generated/gql/graphql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { 
  //BACKUP_ROUTERS_QUERY, 
  GET_DEVICES_QUERY 
} from "../../graphql/queries";
import {
  // DELETE_ROUTER_MUTATION,
  // UPDATE_ROUTER_MUTATION,
} from "../../graphql/device.mutations";
import { AuthContext } from "../../auth/authContext";
import {
  downloadData,
  useViewTableTreeStyles,
  validateDeleteDialog,
} from "./tools";
import { ErrorMessage, Formik } from "formik";
import {
  CANNOT_DOWNLOAD_EXCEL,
  DOWNLOADED_EXCEL,
} from "../../assets/constants";

//router device table
const DeviceTable = () => {
  //auth then to dashboard
  const { currentUser } = useContext(AuthContext);
  const classes = useViewTableTreeStyles();

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<MRT_Row<Device>>();

  const handleClose = () => {
    setOpen(false); //close dialog on delete
  };

  //handle click open and set the row data
  const handleClickOpen = (row: MRT_Row<Device>) => {
    setOpen(true);
    setRowData(row);
  };

  //only if admin or super **************************************/
  const isAdmin = currentUser?.role === "ADMIN";
  /************************************************************/

  /* react hooks and states ************************************************/
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [deviceOpAndMsg, setDeviceOpAndMsg] = useState<string>(""); //operation message of router to display

  //set message to display, based on what the user is doing
  function startsWithOperation(operation: string) {
    return deviceOpAndMsg.startsWith(operation + "=");
  }

  const OP_DELETE = startsWithOperation("DELETE");
  const OP_UPDATE = startsWithOperation("UPDATE");
  const OP_CREATE_BACKUP = startsWithOperation("BACKUP");
  const OP_DOWNLOAD_SUCCESS = startsWithOperation("DOWNLOAD_SUCCESS");
  const OP_DOWNLOAD_FAILURE = startsWithOperation("DOWNLOAD_FAILURE");
  const OP_FETCH_ROUTERS = startsWithOperation("FETCH_ROUTERS");

  const [tableData, setTableData] = useState<Device[]>(() => []); // set table data array to incomming arr of objects

  /*********************************************************************/
  //full screen change
  const handleFullScreenChange = (updater: MRT_Updater<boolean>) => {
    setIsFullScreen(
      (prevPagination) =>
        updater instanceof Function ? updater(prevPagination) : updater //for more read docs
    );
  };
  /******************************************************************** */

  /* GRAPHQL STUFF ************************************************** */
  //fetch routers from database
  const { loading } = useQuery<Query>(GET_DEVICES_QUERY, {
    onCompleted: ({ getDevices }) => {
      console.log(getDevices);
      if (getDevices.__typename === "DevicesSuccess") {
        const routerArr = getDevices.devices;
        const modData = routerArr?.map((r: Device) => ({ ...r })); // else readonly error on update mutation
        setTableData(modData);
      } else if (getDevices.__typename === "GraphqlError") {
        setDeviceOpAndMsg(`FETCH_ROUTERS=${getDevices.customError}`);
      }
    },

    //error from graphql shield
    onError: (err) => {
      setDeviceOpAndMsg(`FETCH_ROUTERS=${err.message}`);
      setTimeout(() => {
        setDeviceOpAndMsg("");
      }, 3000);
    },
  });

  //router backup query
  // const [createFileBackUp] = useLazyQuery<Query>(BACKUP_ROUTERS_QUERY, {
  //   fetchPolicy: "network-only",
  //   onCompleted: ({ backupDATA }) => {
  //     if (backupDATA.__typename === "BackUpStatus") {
  //       setRouterOpAndMsg(`BACKUP=${backupDATA.backUpCreated}`);
  //     } else if (backupDATA.__typename === "GraphqlError") {
  //       setRouterOpAndMsg(`BACKUP=${backupDATA.customError}`);
  //     }
  //     setTimeout(() => {
  //       setRouterOpAndMsg(""); //delete backup msg after 3 secs
  //     }, 3000);
  //   },

  //   onError: (err) => {
  //     setRouterOpAndMsg(`BACKUP=${err.message}`);
  //     setTimeout(() => {
  //       setRouterOpAndMsg("");
  //     }, 3000);
  //   },
  // });

  //delete router mutation
  // const [deleteRouter] = useMutation<Mutation>(DELETE_ROUTER_MUTATION, {
  //   onCompleted: ({ deleteRouter }) => {
  //     if (deleteRouter.__typename === "DeleteRouterResponse") {
  //       setRouterOpAndMsg(`DELETE=${String(deleteRouter.ssidOfDeletedRouter)}`);
  //     } else if (deleteRouter.__typename === "GraphqlError") {
  //       setRouterOpAndMsg(`DELETE=${deleteRouter.customError}`);
  //     }
  //     //close dialog
  //     handleClose();
  //     setTimeout(() => {
  //       setRouterOpAndMsg("");
  //     }, 3000);
  //     setTableData([...tableData]);
  //   },
  //   onError: (err) => {
  //     setRouterOpAndMsg(`DELETE=${err.message}`);
  //     setTimeout(() => {
  //       setRouterOpAndMsg("");
  //     }, 3000);
  //   },
  //   refetchQueries: [{ query: GET_ROUTERS_QUERY }],
  // });

  //update router mutation
  // const [updateRouter] = useMutation<Mutation>(UPDATE_ROUTER_MUTATION, {
  //   fetchPolicy: "network-only",
  //   onCompleted: ({ updateRouter }) => {
  //     if (updateRouter.__typename === "UpdateRouterResponse") {
  //       setRouterOpAndMsg(`UPDATE=${updateRouter.routerUpdateResponse}`);
  //     } else if (updateRouter.__typename === "GraphqlError") {
  //       setRouterOpAndMsg(`UPDATE=${updateRouter.customError}`);
  //     }
  //     setTimeout(() => {
  //       setRouterOpAndMsg("");
  //     }, 3000);
  //   },

  //   onError: (err) => {
  //     setRouterOpAndMsg(`DELETE=${err.message}`);
  //     setTimeout(() => {
  //       setRouterOpAndMsg("");
  //     }, 3000);
  //   },
  //   refetchQueries: [{ query: GET_ROUTERS_QUERY }],
  // });
  /*************************************************************** */

  /* perform crud operations on table *******************************************/
  const handleSaveRowEdits: MaterialReactTableProps<Device>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      //send/receive api updates here
      tableData[row.index] = values;
      setTableData([...tableData]);

      // await updateRouter({
      //   variables: {
      //     updateInput: {
      //       ssidOfRouterToUpdate: rowData?.getValue<string>("routerSSID"), //get ssid of row to update
      //       newSerialNumber: values.serialNumber,
      //       newRouterSSID: values.routerSSID,
      //       newWifiPassword: values.wifiPassword,
      //       newAdminPassword: values.newUserPassword,
      //       newSimID: values.simID,
      //       newDeviceKind: values.deviceKind,
      //       newDeviceId: values.deviceId,
      //       newDeviceBuilder: values.deviceBuilder,
      //     },
      //   },
      // });



      exitEditingMode(); //exit modal
    };

  //delete row delete from table
  const handleDeleteRow = useCallback(
    (wifiSSID: string) => {
      //find router device index using lodash
      const routerIndex = _.findIndex(
        tableData,
        (device) => device.wifiSSID === wifiSSID
      );
      tableData.splice(routerIndex, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  //define columns in useMemo
  const columns = useMemo<MRT_ColumnDef<Device>[]>(
    () => [
      // {
      //   accessorKey: "isConfigured",
      //   header: "Configured",
      //   size: 40,
      //   enableColumnActions: false,
      //   enableSorting: false,
      //   Edit: () => undefined,
      //   //custom conditional format and styling
      //   Cell: ({ cell }) => (
      //     <Box component="span">
      //       {cell.getValue<boolean>() ? (
      //         <Stack direction={"row"} spacing={2}>
      //           <SvgIcon component={TrueSVG} inheritViewBox /> <span>Yes</span>
      //         </Stack>
      //       ) : (
      //         <Stack direction={"row"} spacing={2}>
      //           <SvgIcon component={FalseSVG} inheritViewBox /> <span>No</span>
      //         </Stack>
      //       )}
      //     </Box>
      //   ),
      // },
      {
        accessorKey: "wifiSSID",
        header: "Device SSID",
        size: 40,
        enableColumnActions: false,
        enableSorting: false,
        muiTableBodyCellEditTextFieldProps: {
          label: "Change Device SSID",
          type: "text",
          variant: "outlined",
        },
      },

      {
        accessorKey: "passWifi",
        header: "WIFI PW",
        size: 40,
        enableColumnActions: false,
        enableSorting: false,
        muiTableBodyCellEditTextFieldProps: {
          label: "New WIFI Password",
          type: "text",
          variant: "outlined",
        },

        Cell: ({ cell }) => (
          <Box component="span">
            <Stack direction="row" spacing={2}>
              <TextField
                variant="outlined"
                type={
                  cell.getValue<string>() === "NOT AVAILABLE"
                    ? "text"
                    : "password"
                }
                sx={{
                  width: 148,
                  height: -50,

                  input: {
                    color:
                      cell.getValue<string>() === "NOT AVAILABLE" ||
                      cell.getValue<string>() === ""
                        ? "red"
                        : "",
                  },
                }}
                value={cell.getValue<string>()}
                inputProps={{ readOnly: true }}
              />

              <Tooltip title="copy" arrow>
                <Button
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      cell.getValue<string>()
                    );
                  }}
                >
                  <ContentCopyIcon />
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        ),
      },

      {
        accessorKey: "webUser",
        header: "Web User",
        size: 30,
        enableColumnActions: false,
        enableSorting: false,
        Edit: () => undefined,
      },

      {
        accessorKey: "passForWebUser",
        header: "webUser PW",
        size: 40,
        enableColumnActions: false,
        enableSorting: false,
        muiTableBodyCellEditTextFieldProps: {
          label: "New WebUser PW",
          type: "text",
          variant: "outlined",
          required: true,
        },
        Cell: ({ cell }) => (
          <Box component="span">
            <Stack direction="row" spacing={2}>
              <TextField
                variant="outlined"
                type={
                  cell.getValue<string>() === "NOT AVAILABLE"
                    ? "text"
                    : "password"
                }
                sx={{
                  width: 148,
                  height: -50,
                  input: {
                    color:
                      cell.getValue<string>() === "NOT AVAILABLE" ||
                      cell.getValue<string>() === ""
                        ? "red"
                        : "",
                  },
                }}
                value={cell.getValue<string>()}
                inputProps={{ readOnly: true }}
              />

              <Tooltip title="copy" arrow>
                <Button
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      cell.getValue<string>()
                    );
                  }}
                >
                  <ContentCopyIcon />
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        ),
      },

      // {
      //   accessorKey: "shellUser",
      //   header: "Shell User",
      //   size: 30,
      //   enableColumnActions: false,
      //   enableSorting: false,
      //   Edit: () => undefined,
      // },

      // {
      //   accessorKey: "routerPassShell",
      //   header: "Shell PW",
      //   size: 40,
      //   enableColumnActions: false,
      //   enableSorting: false,
      //   Edit: () => undefined,
      //   Cell: ({ cell }) => (
      //     <Box component="span">
      //       <Stack direction="row" spacing={2}>
      //         <TextField
      //           variant="outlined"
      //           type={
      //             cell.getValue<string>() === "NOT AVAILABLE" ||
      //             cell.getValue<string>() === ""
      //               ? "text"
      //               : "password"
      //           }
      //           sx={{
      //             width: 148,
      //             height: -50,

      //             input: {
      //               color:
      //                 cell.getValue<string>() === "NOT AVAILABLE" ||
      //                 cell.getValue<string>() === ""
      //                   ? "red"
      //                   : "",
      //             },
      //           }}
      //           value={
      //             cell.getValue<string>() === "NOT AVAILABLE" ||
      //             cell.getValue<string>() === ""
      //               ? "NOT AVAILABLE"
      //               : cell.getValue<string>()
      //           }
      //           inputProps={{ readOnly: true }}
      //         />

      //         <Tooltip title="copy" arrow>
      //           <Button
      //             onClick={async () => {
      //               await navigator.clipboard.writeText(
      //                 cell.getValue<string>() === "NOT AVAILABLE"
      //                   ? ""
      //                   : cell.getValue<string>()
      //               );
      //             }}
      //           >
      //             <ContentCopyIcon />
      //           </Button>
      //         </Tooltip>
      //       </Stack>
      //     </Box>
      //   ),
      // },

      // {
      //   accessorKey: "serialNumber",
      //   header: "Serialnumber",
      //   size: 40,
      //   enableColumnActions: false,
      //   enableSorting: false,
      //   muiTableBodyCellEditTextFieldProps: {
      //     label: "Change Serialnumber",
      //     variant: "outlined",
      //   },
      // },

      {
        accessorKey: "modell",
        header: "Device Modell",
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        Edit: () => undefined,
      },
    ],
    []
  );

  return (
    <>
      <Typography
        style={{
          fontSize: 35,
          color: "#40404F",
          fontFamily: "Lilita One",
          marginTop: 7,
          marginBottom: 25,
          marginLeft: 10,
        }}
      >
        Hello <span>{isAdmin ? currentUser.username : "User"}</span>
        ,&nbsp;
        <span>currently we have</span>&nbsp;&nbsp;&nbsp;
        <span style={{ color: "#318CE7" }}>
          {tableData.length} RUT951 Routers
        </span>
      </Typography>

      {!loading && (
        <Box className={classes.root}>
          <MaterialReactTable
            editingMode="modal"
            columns={columns}
            enableEditing={isAdmin ? true : false}
            enableHiding={isAdmin ? true : false}
            enableColumnFilters={false}
            initialState={{
              density: "compact",
              columnVisibility: {
                isConfigured: isAdmin ? true : false,
                routerPassShell: isAdmin ? true : false,
                shellUser: isAdmin ? true : false,
              },
            }}
            //center alignment
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 120,
              },
            }}
            muiTableContainerProps={{
              sx: {
                marginTop: 5,
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "green",
                  borderRadius: "30px",
                },
              },
            }}
            data={tableData}
            enableColumnOrdering
            state={{ isFullScreen }}
            onIsFullScreenChange={handleFullScreenChange}
            onEditingRowSave={handleSaveRowEdits}
            //render with only admin can delete option
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                {isAdmin && (
                  <Tooltip arrow placement="left-start" title="edit">
                    <IconButton
                      sx={{ color: "#5D8AA8" }}
                      onClick={() => {
                        table.setEditingRow(row);
                        setRowData(row);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )}

                {isAdmin && (
                  <Box>
                    <Tooltip arrow placement="right" title="delete">
                      <IconButton
                        color="error"
                        onClick={() => handleClickOpen(row)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>

                    {open && (
                      <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        hideBackdrop={true}
                        PaperProps={{
                          elevation: 2,
                          sx: {
                            border: "solid 1px gray",
                            p: 7,
                          },
                        }}
                      >
                        <DialogTitle sx={{ fontSize: 25 }}>
                          <span style={{ fontWeight: "bold" }}>
                            Do you really want to delete the Router Device with
                            the SSID:
                          </span>{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {rowData?.getValue<string>("routerSSID") + " "}
                          </span>
                        </DialogTitle>

                        <DialogContent>
                          <DialogContentText>
                            <Formik
                              initialValues={{ secret: "" }}
                              validationSchema={validateDeleteDialog}
                              onSubmit={async () => {
                                //delete router and then close the window
                                // await deleteRouter({
                                //   variables: {
                                //     serialNumber:
                                //       rowData?.getValue<string>("serialNumber"),
                                //   },
                                // });

                                //then delete the row and refresh
                                handleDeleteRow(
                                  String(
                                    rowData?.getValue<string>("serialNumber")
                                  )
                                );
                              }}
                            >
                              {(props) => {
                                const {
                                  values,
                                  isSubmitting,
                                  handleChange,
                                  handleSubmit,
                                } = props;
                                return (
                                  <form onSubmit={handleSubmit}>
                                    <Stack spacing={2}>
                                      <Typography
                                        sx={{ color: "black" }}
                                        variant="h6"
                                      >
                                        For security reasons, you must enter the
                                        secret code to be able to delete the
                                        device
                                      </Typography>

                                      <TextField
                                        helperText={
                                          <ErrorMessage name="secret" />
                                        }
                                        placeholder="Enter code to delete."
                                        autoComplete="off"
                                        sx={{
                                          maxWidth: "30ch",
                                          input: {
                                            "&::placeholder": {
                                              opacity: 1,
                                            },
                                          },
                                        }}
                                        classes={{ root: classes.textField }}
                                        name="secret"
                                        value={values.secret}
                                        onChange={handleChange}
                                      />
                                    </Stack>

                                    <DialogActions>
                                      <Button
                                        style={{
                                          borderRadius: 35,
                                          backgroundColor: "#e32636",
                                          fontSize: "18px",
                                        }}
                                        variant="contained"
                                        onClick={handleClose}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        style={{
                                          borderRadius: 35,
                                          backgroundColor: "#1560bd",
                                          fontSize: "18px",
                                        }}
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}
                                      >
                                        Yes
                                      </Button>
                                    </DialogActions>
                                  </form>
                                );
                              }}
                            </Formik>
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
                    )}
                  </Box>
                )}
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={async () => {
                    //download complete or not display message
                    const downloadResult = await downloadData(tableData);
                    downloadResult
                      ? setDeviceOpAndMsg(DOWNLOADED_EXCEL)
                      : setDeviceOpAndMsg(CANNOT_DOWNLOAD_EXCEL);

                    setTimeout(() => {
                      setDeviceOpAndMsg("");
                    }, 3000);
                  }}
                  endIcon={<FileDownloadIcon />}
                  variant="contained"
                  sx={{ marginTop: 1 }}
                >
                  Download Data as EXCEL List
                </Button>

                {isAdmin ? (
                  <Button
                    onClick={async () => {
                      // await createFileBackUp();
                    }}
                    endIcon={<BackupIcon fontSize="large" />}
                    variant="contained"
                    sx={{ marginTop: 1 }}
                  >
                    Create Backup
                  </Button>
                ) : undefined}

                {OP_DELETE && (
                  <Typography
                    sx={{ marginTop: 0.8, marginLeft: 2, color: "red" }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}

                {OP_UPDATE && (
                  <Typography
                    sx={{ marginTop: 0.8, marginLeft: 2, color: "green" }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}

                {OP_CREATE_BACKUP && (
                  <Typography
                    sx={{
                      marginTop: 0.8,
                      marginLeft: 2,
                      color:
                        deviceOpAndMsg
                          .substring(deviceOpAndMsg.indexOf("=") + 1)
                          .includes("Backup existiert") ||
                          deviceOpAndMsg
                          .substring(deviceOpAndMsg.indexOf("=") + 1)
                          .includes("Backup")
                          ? "green"
                          : "red",
                    }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}

                {OP_DOWNLOAD_SUCCESS && (
                  <Typography
                    sx={{ marginTop: 0.8, marginLeft: 2, color: "green" }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}

                {OP_DOWNLOAD_FAILURE && (
                  <Typography
                    sx={{ marginTop: 0.8, marginLeft: 2, color: "red" }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}

                {OP_FETCH_ROUTERS && (
                  <Typography
                    sx={{ marginTop: 0.8, marginLeft: 2, color: "red" }}
                    variant="h5"
                  >
                    {deviceOpAndMsg.substring(deviceOpAndMsg.indexOf("=") + 1)}
                  </Typography>
                )}
              </Box>
            )}
            //localization prop
            localization={{
              //this normaly should be a string, but why is it not a React Node ?, temp fix: "as any"
              edit: (
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: 3,
                    marginBottom: 2,
                    fontSize: 30,
                    fontFamily: "Lilita One",
                  }}
                >
                  Edit Device Data
                </Typography> // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as any,

              noRecordsToDisplay: (
                <Stack direction={"column"} spacing={3}>
                  <Typography
                    variant="h5"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    We were unable to find any data - This could have the
                    following reasons
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    1. Your token has expired - Log out and log back in.
                  </Typography>

                  <Typography variant="h6" sx={{ color: "#000" }}>
                    2. If step 1 didn't work, then the issue lies in the
                    backend; contact your admin in this case.
                  </Typography>
                </Stack> // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as any,

              cancel: "Cancel",
              save: "Save",
              actions: "Options",
              showHideSearch: "show/hide searchbar",
              showHideColumns: "show/hide columns",
              toggleDensity: "Toggle density",
              hideAll: "Hide all columns",
              showAll: "Show all columns",
              resetOrder: undefined,
              move: "move columns",
              toggleFullScreen: isFullScreen
                ? "Leave Fullscreen"
                : "Fullscreen",
              // rowsPerPage: "Reihen pro Seite",
            }}
            // search field
            muiSearchTextFieldProps={{
              placeholder: "Search for Device",
              InputProps: {
                sx: {
                  borderRadius: 30,
                },
              },
              sx: { minWidth: "280px" },
              variant: "outlined",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default DeviceTable;
