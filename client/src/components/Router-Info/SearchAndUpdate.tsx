//mui stuff
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box, Button, Typography } from "@mui/material";
import { GET_ROUTERS_QUERY, SEARCH_ROUTER_QUERY } from "../../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Mutation, Query } from "../../generated/gql/graphql";
import { useState } from "react";
import RouterDetails from "./RouterDetails";
import { GetTypesOnSearch } from "../types";
import { UPDATE_ROUTER_MUTATION } from "../../graphql/device.mutations";
import "./style.css";

//init empty fields
const updateRouterInitials: GetTypesOnSearch = {
  serialNumber: "",
  routerSSID: "",
  simID: "",
  IMEI: "",
  LAN_MAC: "",
  defaultPassword: "",
  wifiPasswordDefault: "",
  newUserPassword: "",
  wifiPassword: "",
  newRootPassword: "",
  routerIsConfigured: false,
  ipAdress: "",
  deviceKind: "",
  deviceId: "",
  deviceBuilder: "",
};

//Search and update Router Component
const SearchAndUpdate: React.FC = () => {
  const [criteria, setCriteria] = useState<string>(""); //criteria by which router is searched
  const [updateSSID, setUpdateSSID] = useState<string>(""); //keep track of current ssid which has been found, to correctly update the router
  const [searchData, setSearchData] =
    useState<GetTypesOnSearch>(updateRouterInitials); //initial value for search data/will be display in RouterDetails Component and updated at the same time using props
  const [searchError, setSearchError] = useState<string>(""); //error when search fails

  //set messages on update router graphql operation
  const updateResult = {
    success: "",
    failure: "",
  };
  const [updateOpMsgs, setUpdateOpMsgs] = useState(updateResult);

  /* Graphql  operations */
  const [searchRouter] = useLazyQuery<Query>(SEARCH_ROUTER_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ searchRouter }) => {
      if (searchRouter.__typename === "Router") {
        setUpdateSSID(searchRouter.routerSSID);
        setSearchData(searchRouter);
      } else if (searchRouter.__typename === "GraphqlError") {
        setUpdateSSID("");
        setSearchData(updateRouterInitials);
        setSearchError(searchRouter.customError);
      }
    },
  });

  //update router mutation
  const [updateRouter] = useMutation<Mutation>(UPDATE_ROUTER_MUTATION, {
    fetchPolicy: "network-only",
    onCompleted: ({ updateRouter }) => {
      if (updateRouter.__typename === "UpdateRouterResponse") {
        setUpdateOpMsgs({
          ...updateOpMsgs,
          success: updateRouter.routerUpdateResponse,
        });
      } else if (updateRouter.__typename === "GraphqlError") {
        setUpdateOpMsgs({
          ...updateOpMsgs,
          failure: updateRouter.customError,
        });
      }

      //reset everything
      setTimeout(() => {
        setCriteria("");
        setUpdateSSID("");
        setUpdateOpMsgs(updateResult);
        setSearchData(updateRouterInitials);
        setSearchError("");
      }, 3000);
    },
    refetchQueries: [{ query: GET_ROUTERS_QUERY }],
  });
  /******************************************************************************* */

  //handle router search
  const handleRouterSearch = async () => {
    await searchRouter({
      variables: {
        optionalSearchParam: criteria,
      },
    });
  };

  //handle router update
  const handleRouterUpdate = async () => {
    setUpdateOpMsgs(updateResult); //just reset to be safe
    if (updateSSID) {
      //update fields
      await updateRouter({
        variables: {
          updateInput: {
            ssidOfRouterToUpdate: updateSSID, //ssid of router to update
            //fields
            newSerialNumber: searchData.serialNumber,
            newRouterSSID: searchData.routerSSID,
            newSimID: searchData.simID,
            newIMEI: searchData.IMEI,
            newLAN_MAC: searchData.LAN_MAC,
            newDefaultAdminPassword: searchData.defaultPassword,
            newDefaultWifiPassword: searchData.wifiPasswordDefault,
            newAdminPassword: searchData.newUserPassword,
            newWifiPassword: searchData.wifiPassword,
            newRootPassword: searchData.newRootPassword,
            changeRouterIsConfiguredStatus: searchData.routerIsConfigured,
            newIpAdress: searchData.ipAdress,
            newDeviceKind: searchData.deviceKind,
            newDeviceId: searchData.deviceId,
            newDeviceBuilder: searchData.deviceBuilder,
          },
        },
      });
    }
  };

  //handle search with enter key as well
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.code === "Enter" && handleRouterSearch();
  };

  //on delete reset some stuff
  const handleDelete = () => {
    setCriteria("");
    setUpdateSSID("");
    setSearchData(updateRouterInitials);
    setSearchError("");
  };

  //toggle is configured status
  const handleChangeConfigStatus = async () => {
    setSearchData({
      ...searchData,
      routerIsConfigured: !searchData.routerIsConfigured,
    });
  };

  //update the search object
  const handleFieldChanges = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box className="info">
        <Typography sx={{ fontWeight: "bold", marginBottom: 6 }} variant="h5">
          Du kannst deinen Router mit folgenden Informationen finden:
          <br />
          <br />
          <span style={{ color: "green" }}>
            Gerät ID, Ip Adresse, Serialnummer, Sim ID oder Router SSID
          </span>
        </Typography>

        <Stack direction={"row"} spacing={3}>
          <TextField
            autoComplete="off"
            placeholder="Gib einer der Suchkriterien um deinen Router zu finden"
            variant="outlined"
            style={{ width: 600 }}
            value={criteria}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setCriteria(e.target.value.trimStart().trimEnd());
              if (!e.target.value) {
                handleDelete(); //when no value, reset
              }
            }}
            sx={{
              margin: "12px",
              "& fieldset": {
                borderRadius: "30px",
              },

              "& .MuiInputBase-input": {
                color: "rgb(10, 10, 10)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {criteria ? (
                    <Button onClick={handleDelete}>
                      <ArrowBackIcon />
                    </Button>
                  ) : (
                    <Button>
                      <SearchIcon />
                    </Button>
                  )}
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  {criteria ? (
                    <Button onClick={handleDelete}>
                      <CloseIcon />
                    </Button>
                  ) : undefined}
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            onClick={handleRouterSearch}
            style={{ borderRadius: 50, height: "70%", marginTop: 7 }}
          >
            Suchen
          </Button>
        </Stack>
        <Typography sx={{ fontWeight: "bold", marginTop: 4 }} variant="h5">
          Ergebnis der Suche:{" "}
          {updateSSID ? (
            <span style={{ color: "green" }}>Router wurde gefunden</span>
          ) : (
            <span style={{ color: "red" }}>{searchError}</span>
          )}
        </Typography>
      </Box>
      <RouterDetails
        router={searchData}
        handleConfigStatus={handleChangeConfigStatus}
        handleChange={handleFieldChanges}
        handleUpdate={handleRouterUpdate}
        updateResultFields={updateOpMsgs}
      />
    </>
  );
};
export default SearchAndUpdate;
