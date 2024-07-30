import { Device, Mutation, Query } from '../generated/gql/graphql';
import { GET_DEVICES_QUERY } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { client } from '../auth/apolloClient';
import { useMutation } from '@apollo/client';
import { CONFIG_DEVICE_MUTATION } from '../graphql/device.mutations';


//custom hook for "get devices" query
export const useGetDevicesQuery = (setTableData: React.Dispatch<React.SetStateAction<Device[]>>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observableQuery = client.watchQuery<Query>({
      query: GET_DEVICES_QUERY,
      fetchPolicy: 'cache-and-network', //or change to 'network-only' based on your needs
    });

    //subscribe to query
    const subscription = observableQuery.subscribe({
      next: ({ data }) => {
        setLoading(false); //set loading false when there's data
        const { getDevices } = data;
        if (getDevices.__typename === 'DevicesSuccess') {
          setTableData(getDevices.devices || []);
        } else if (getDevices.__typename === 'GraphqlError') {
          console.error(`FETCH_DEVICES=${getDevices.customError}`);
          setError(getDevices.customError);
        }
      },
      error: (err) => {
        setLoading(false);
        // console.error(err.message);
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      },
    });

    //Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setTableData]);
  return { loading, error };
};





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
  // });

  const useDeleteDeviceMutation = () => {


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
  //   refetchQueries: [{ query: GET_ROUTERS_QUERY }],
  // });




  }










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
  //   refetchQueries: [{ query: GET_ROUTERS_QUERY }],
  // });







































// Custom hook for sending config device mutation request
export const useConfigDeviceMutation = () => {
  // State to handle configuration status messages and loading state
  const [configStatus, setConfigStatus] = useState({
    showSpinningConfigGears: false,
    configStatus: "",
    configRunOrDone: "",
  });

    // State to handle device data
    const [deviceData, setDeviceData] = useState<Device[]>([]); // Define your initial device data structure

  // Default initial state for device data
  const initialDeviceData = {} as Device[]; // Define your initial device data structure
  const deviceConfigStatus = {
    showSpinningConfigGears: false,
    configStatus: "",
    configRunOrDone: "",
  };

  // config and add router mutation
  const [configAndMaybeAddDeviceInDB] = useMutation<Mutation>(
    CONFIG_DEVICE_MUTATION,
    {
      fetchPolicy: "network-only",
      onCompleted: ({ configAndMaybeAddDeviceInDB }) => {
        if (configAndMaybeAddDeviceInDB?.__typename === "StatusAfterConfig") {
          // Update status messages for successful configuration
          setConfigStatus({
            showSpinningConfigGears: false,
            configStatus: "Konfiguration fertig",
            configRunOrDone: configAndMaybeAddDeviceInDB.successMsg,
          });
        } else if (configAndMaybeAddDeviceInDB?.__typename === "GraphqlError") {
          // Update status messages for configuration failure
          setConfigStatus({
            showSpinningConfigGears: false,
            configStatus: "Configuration failed...",
            configRunOrDone: configAndMaybeAddDeviceInDB.customError,
          });
        }

        // Reset state after a short delay
        setTimeout(() => {
          setDeviceData(initialDeviceData);
          setConfigStatus(deviceConfigStatus);
        }, 4000);
      },

      onError: (err) => {
        // Log the error (optional) and update status messages
        console.error("Configuration error:", err);
        setConfigStatus({
          showSpinningConfigGears: false,
          configStatus: "Configuration failed...",
          configRunOrDone: err.message, // Use err.message for the error message
        });

        // Reset state after a short delay
        setTimeout(() => {
          setDeviceData(initialDeviceData);
          setConfigStatus(deviceConfigStatus);
        }, 4000);
      },
      refetchQueries: [GET_DEVICES_QUERY, "GetRouters"], // Ensure fresh data after mutation
    }
  );

  //return the mutation function and status state
  return {
    configAndMaybeAddDeviceInDB,
    configStatus,
  };
};