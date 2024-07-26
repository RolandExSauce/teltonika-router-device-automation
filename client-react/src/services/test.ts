// export const useGetDevicesQuery = (setTableData: React.Dispatch<React.SetStateAction<Device[]>>) => (
//     useQuery<Query>(GET_DEVICES_QUERY, {
//       onCompleted: ({ getDevices }) => {
//         if (getDevices.__typename === 'DevicesSuccess') {
//           setTableData(getDevices.devices || []);
//         } else if (getDevices.__typename === 'GraphqlError') {
//           console.error(`FETCH_DEVICES=${getDevices.customError}`);
//         }
//       },
//       onError: (err) => {
//         console.error(err.message);
//         setTimeout(() => {
//           // Handle error reset if needed
//         }, 3000);
//       },
//     })
//   );