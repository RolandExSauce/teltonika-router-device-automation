import {
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { alpha, styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
// import { IRouterDetailsProps } from "../types";
import { useState } from "react";
import "./style.css";

//display router details and edit
const RouterDetails: React.FC<any> = (props) => {
//const RouterDetails: React.FC<IRouterDetailsProps> = (props) => {
  const {
    handleConfigStatus,
    router,
    updateResultFields,
    handleChange,
    handleUpdate,
  } = props; //get props
  const [readOnly, setReadOnly] = useState<boolean>(true);

  //switch green
  const GreenRedSwitch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "primary",
  })(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: router.routerIsConfigured ? green[600] : red[600],
      "&:hover": {
        backgroundColor: alpha(
          router.routerIsConfigured ? green[600] : red[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: router.routerIsConfigured ? green[600] : red[600],
    },
  }));

  return (
    <Stack sx={{ margin: "auto", alignItems: "center" }} spacing={3}>
      <Box className="router-details-three-div">
        <Stack spacing={3} className="child">
          <TextField
            label="Serialnummer"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="serialNumber"
            name="serialNumber"
            value={router?.serialNumber || ""}
            placeholder=""
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />
          <TextField
            label="Router SSID"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="routerSSID"
            name="routerSSID"
            value={router?.routerSSID || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />

          <TextField
            label="SIM ID"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="simID"
            name="simID"
            value={router?.simID || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />

          <TextField
            label="IMEI"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="IMEI"
            name="IMEI"
            value={router?.IMEI || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />

          <TextField
            label="LAN MAC"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="LAN_MAC"
            name="LAN_MAC"
            value={router?.LAN_MAC || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />
        </Stack>

        <Stack spacing={3} className="child">
          {/* /********************************* */}

          <Stack direction="row" spacing={1}>
            <TextField
              label="Default admin PW"
              variant="outlined"
              autoComplete="off"
              fullWidth
              id=""
              name="defaultPassword"
              value={router?.defaultPassword || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              type={
                router?.defaultPassword === "Nicht vorhanden"
                  ? "text"
                  : "password"
              }
              sx={{ width: 230 }}
              inputProps={{
                style: {
                  color:
                    router?.defaultPassword === "Nicht vorhanden"
                      ? "red"
                      : "#318CE7",
                },
                readOnly: readOnly,
                disabled: readOnly,
              }}
            />
            <Tooltip title="kopieren" arrow>
              <Button
                onClick={async () => {
                  if (router?.defaultPassword) {
                    await navigator.clipboard.writeText(router.defaultPassword);
                  }
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>

          {/* /********************************* */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="Default WLAN PW"
              variant="outlined"
              autoComplete="off"
              fullWidth
              id="wifiPasswordDefault"
              name="wifiPasswordDefault"
              value={router?.wifiPasswordDefault || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              type={
                router?.wifiPasswordDefault === "Nicht vorhanden"
                  ? "text"
                  : "password"
              }
              sx={{ width: 230 }}
              inputProps={{
                style: {
                  color:
                    router?.wifiPasswordDefault === "Nicht vorhanden"
                      ? "red"
                      : "#318CE7",
                },
                readOnly: readOnly,
                disabled: readOnly,
              }}
            />
            <Tooltip title="kopieren" arrow>
              <Button
                onClick={async () => {
                  if (router?.wifiPasswordDefault) {
                    await navigator.clipboard.writeText(
                      router.wifiPasswordDefault
                    );
                  }
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>

          {/* /********************************* */}

          <Stack direction="row" spacing={1}>
            <TextField
              label="Aktuelles admin PW"
              variant="outlined"
              autoComplete="off"
              fullWidth
              id="newUserPassword"
              name="newUserPassword"
              value={router?.newUserPassword || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              type={
                router?.newUserPassword === "Nicht vorhanden"
                  ? "text"
                  : "password"
              }
              sx={{ width: 230 }}
              inputProps={{
                style: {
                  color:
                    router?.newUserPassword === "Nicht vorhanden"
                      ? "red"
                      : "#318CE7",
                },
                readOnly: readOnly,
                disabled: readOnly,
              }}
            />
            <Tooltip title="kopieren" arrow>
              <Button
                onClick={async () => {
                  if (router?.newUserPassword) {
                    await navigator.clipboard.writeText(router.newUserPassword);
                  }
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>
          {/* /********************************* */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="Aktualles WLAN PW"
              variant="outlined"
              autoComplete="off"
              id="wifiPassword"
              name="wifiPassword"
              value={router?.wifiPassword || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              type={
                router?.wifiPassword === "Nicht vorhanden" ? "text" : "password"
              }
              sx={{ width: 230 }}
              inputProps={{
                style: {
                  color:
                    router?.wifiPassword === "Nicht vorhanden"
                      ? "red"
                      : "#318CE7",
                },
                readOnly: readOnly,
                disabled: readOnly,
              }}
            />
            <Tooltip title="kopieren" arrow>
              <Button
                onClick={async () => {
                  if (router?.wifiPassword) {
                    await navigator.clipboard.writeText(router.wifiPassword);
                  }
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>
          {/* /********************************* */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="Aktualles root PW"
              variant="outlined"
              autoComplete="off"
              fullWidth
              id="newRootPassword"
              name="newRootPassword"
              onChange={handleChange}
              value={router?.newRootPassword || ""}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 230 }}
              inputProps={{
                style: {
                  color:
                    router?.newRootPassword === "Nicht vorhanden"
                      ? "red"
                      : "#318CE7",
                },
                readOnly: readOnly,
                disabled: readOnly,
              }}
              type={
                router?.newRootPassword === "Nicht vorhanden"
                  ? "text"
                  : "password"
              }
            />
            <Tooltip title="kopieren" arrow>
              <Button
                onClick={async () => {
                  if (router?.newRootPassword) {
                    await navigator.clipboard.writeText(router.newRootPassword);
                  }
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>
        </Stack>

        {/* FIXME: Switch */}

        <Stack spacing={3} className="child">
          {/* display only if router has been found  */}
          {router.routerSSID && (
            <Stack direction={"row"} spacing={2}>
              <GreenRedSwitch
                id="routerIsConfigured"
                value={"routerIsConfigured"}
                onChange={handleConfigStatus}
                checked={router.routerIsConfigured as boolean}
                disabled={readOnly}
                inputProps={{ color: "red" }}
              />
              <Typography
                style={{ marginTop: 7, fontWeight: "bold", color: "#002D62" }}
              >
                {router.routerIsConfigured ? (
                  <span style={{ color: "green" }}>ist konfiguriert</span>
                ) : (
                  <span style={{ color: "red" }}>nicht konfiguriert</span>
                )}
              </Typography>
            </Stack>
          )}

          <TextField
            label="Router IP Adresse"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="ipAdress"
            name="ipAdress"
            value={router?.ipAdress || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />

          <TextField
            label="Gerät Art"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="deviceKind"
            name="deviceKind"
            value={router?.deviceKind || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />
          <TextField
            label="Gerät ID"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="deviceId"
            name="deviceId"
            value={router?.deviceId || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />
          <TextField
            label="Gerät Aufsteller"
            variant="outlined"
            autoComplete="off"
            fullWidth
            id="deviceBuilder"
            name="deviceBuilder"
            value={router?.deviceBuilder || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { color: "#318CE7" },
              readOnly: readOnly,
              disabled: readOnly,
            }}
          />
        </Stack>
      </Box>

      {/* update router messages */}
      {updateResultFields.success && (
        <Typography sx={{ color: "green", fontSize: 20, marginTop: 0 }}>
          {updateResultFields.success}
        </Typography>
      )}
      {updateResultFields.failure && (
        <Typography sx={{ color: "red", fontSize: 20, marginTop: 0 }}>
          {updateResultFields.failure}
        </Typography>
      )}

      {readOnly ? (
        <Button
          variant="contained"
          onClick={() => {
            //only toggle if value not empty
            if (
              router.serialNumber ||
              router.routerSSID ||
              router.simID ||
              router.IMEI ||
              router.LAN_MAC ||
              router.defaultPassword ||
              router.wifiPasswordDefault ||
              router.newUserPassword ||
              router.wifiPassword ||
              router.newRootPassword ||
              router.routerIsConfigured ||
              router.ipAdress ||
              router.deviceKind ||
              router.deviceId ||
              router.deviceBuilder
            ) {
              setReadOnly((prev) => !prev);
            }
          }}
          style={{ borderRadius: 50, height: 60, width: 280 }}
        >
          <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
            Daten bearbeiten
          </Typography>
          <ModeEditIcon />
        </Button>
      ) : (
        <Stack direction={"row"} spacing={3}>
          <Button
            variant="contained"
            onClick={async () => {
              await handleUpdate();
              setReadOnly((prev) => !prev);
            }}
            style={{ borderRadius: 50, height: 60, width: 280 }}
          >
            <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
              Daten updaten
            </Typography>
            <ModeEditIcon />
          </Button>

          <Button
            variant="contained"
            style={{ borderRadius: 50, height: 60, width: 140 }}
            onClick={() => {
              setReadOnly((prev) => !prev);
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>abbrechen</Typography>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
export default RouterDetails;
