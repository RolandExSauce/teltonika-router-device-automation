import { Device, Query } from '../generated/gql/graphql';
import { GET_DEVICES_QUERY } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { client } from '../auth/apolloClient';


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


//custom hook for sending config device mutation request
export const useConfigDeviceMutation = () => {
  //config and add router mutation
  // const [configAndMaybeAddDeviceInDB] = useMutation<Mutation>(
  //   CONFIG_DEVICE_MUTATION,
  //   {
  //     fetchPolicy: "no-cache",
  //     onCompleted: ({ configAndMaybeAddDeviceInDB }) => {
  //       if (configAndMaybeAddDeviceInDB?.__typename === "StatusAfterConfig") {
  //         //update error messages
  //         setConfig({
  //           showConfigGears: false, //cuz we done
  //           configTxts: {
  //             ...config.configTxts,
  //             configStatus: "Konfiguration fertig",
  //             configRunOrDone: configAndMaybeAddDeviceInDB.successMsg,
  //           },
  //         });
  //       } else if (configAndMaybeAddDeviceInDB?.__typename === "GraphqlError") {
  //         //update error messages
  //         setConfig({
  //           showConfigGears: false,
  //           configTxts: {
  //             ...config.configTxts,
  //             configStatus: "Fehlgeschlagen...",
  //             configRunOrDone: configAndMaybeAddDeviceInDB.customError,
  //           },
  //         });
  //       }

  //       //reset everything
  //       setTimeout(() => {
  //         setRouterData(initialValuesRouter);
  //         setInputReceived("");
  //         setConfig(routerConfigStatus);
  //       }, 4000);
  //     },

  //     onError: (err) => {
  //       setConfig({
  //         showConfigGears: false,
  //         configTxts: {
  //           ...config.configTxts,
  //           configStatus: "Fehlgeschlagen...",
  //           configRunOrDone: err.message,
  //         },
  //       });

  //       setTimeout(() => {
  //         setRouterData(initialValuesRouter);
  //         setInputReceived("");
  //         setConfig(routerConfigStatus);
  //       }, 4000);
  //     },

  //     refetchQueries: [GET_DEVICES_QUERY, "GetRouters"],
  //   }
  // );

}