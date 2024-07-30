import {
  MRT_Localization,
  MRT_Row,
  MRT_TableOptions,
} from "material-react-table";
import { Device } from "../../generated/gql/graphql";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  SvgIcon,
  Tooltip,
} from "@mui/material";

import { styleObjectsTableOptions } from "./tools/style-objects";
import { editPencilIconImg, noResultIconImg } from "../../assets/export-imgs";
import {
  deleteIconSVG,
  downloadIconSVG,
  notAllowedIconSVG,
  restoreBackupIconSVG,
  saveIconSVG,
} from "../../assets/export-svgs";
import OpButton from "../Global/OpButton";

// Set up table with the options
export const getTableOptions = (
  isAdminOrRoot: boolean,
  tableDataLength: number,
  isFullScreen: boolean,
  handleClickOpen: (row: MRT_Row<Device>) => void
): Partial<MRT_TableOptions<Device>> => {
  const {
    localizationStyles,
    renderRowActions,
    renderTopToolbarCustomActions,
    renderEditRowDialogContent,
  } = styleObjectsTableOptions;

  // Localization settings
  const localization: Partial<MRT_Localization> = {
    toggleFullScreen: isFullScreen
      ? "Leave Fullscreen mode"
      : "Fullscreen mode",
    // Image to display if no records
    noRecordsToDisplay: (
      <span style={localizationStyles}>
        <img
          style={{
            maxHeight: "450px",
            maxWidth: "100%",
          }}
          src={noResultIconImg}
          alt="No results"
        />
      </span>
    ) as unknown as string,
  };

  return {
    editDisplayMode: "modal",
    enableEditing: isAdminOrRoot,
    enableColumnFilters: false,
    state: { isFullScreen },
    initialState: {
      density: "compact",
      //Hide some columns except for admins
      columnVisibility: {
        isConfigured: isAdminOrRoot,
        routerPassShell: isAdminOrRoot,
        shellUser: isAdminOrRoot,
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        muiTableHeadCellProps: { align: "center" },
        size: 80,
      },
    },
    enableDensityToggle: false, // Maybe set this to true?
    enableRowActions: true,
    positionActionsColumn: "first",
    enableColumnOrdering: true,

    // Row actions: If edit icon button is clicked and delete icon button is clicked
    renderRowActions: ({ row, table }) => (
      <div style={renderRowActions.divStyle}>
        <Tooltip arrow placement="left" title="Edit">
          <button
            style={renderRowActions.buttonStyle}
            onClick={() => table.setEditingRow(row)}
          >
            <img
              src={editPencilIconImg}
              alt="Edit"
              style={{ width: "37px", height: "37px" }}
            />
          </button>
        </Tooltip>

        <Tooltip arrow placement="right" title="Delete">
          <button
            style={renderRowActions.buttonStyle}
            onClick={() => handleClickOpen(row)}
          >
            <SvgIcon component={deleteIconSVG} inheritViewBox />
          </button>
        </Tooltip>
      </div>
    ),

    // Custom actions on top of table: search bar, column visibility,
    //also our download excel/backup file button are here
    renderTopToolbarCustomActions: () => (
      <div style={renderTopToolbarCustomActions.divStyle}>
        <OpButton
          opButtonTxt="Download Excel file"
          handleClick={() => console.log("implement")}
          disabled={!tableDataLength}
          buttonIcon={downloadIconSVG}
          buttonIsDynamic={true}
          typeButtonIfDynamic="DOWNLOAD"
        />
        <OpButton
          opButtonTxt="Create Backup"
          handleClick={() => console.log("implement")}
          disabled={!tableDataLength}
          buttonIcon={restoreBackupIconSVG}
          buttonIsDynamic={true}
          typeButtonIfDynamic="BACK"
        />
      </div>
    ),

    //When Edit modal is opened, we customize some things
    renderEditRowDialogContent: ({ table, internalEditComponents }) => (
      <div style={renderEditRowDialogContent.divStyle}>
        <DialogTitle style={renderEditRowDialogContent.dialogTitle}>
          Edit Device Info
        </DialogTitle>
        <DialogContent sx={renderEditRowDialogContent.dialogContent}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <OpButton
            opButtonTxt="CANCEL"
            handleClick={() => table.setEditingRow(null)}
            disabled={!tableDataLength}
            buttonIcon={notAllowedIconSVG}
            buttonIsDynamic={false}
          />
          <OpButton
            opButtonTxt="SAVE"
            handleClick={() => table.setEditingRow(null)}
            disabled={!tableDataLength}
            buttonIcon={saveIconSVG}
            buttonIsDynamic={false}
          />
        </DialogActions>
      </div>
    ),
    localization,
  };
};
