import { gql } from "@apollo/client";


//get routers
const GET_DEVICES_QUERY = gql`
query GetDevices {
  getDevices {
    ... on DevicesSuccess {
      devices {
        modell
        wifiSSID
        webUser
        passForWebUser
        passWifi

        deviceFieldsOptional {
          shellUser
          passForShellUser
          serialNumber
          SIMID
          IMEI
          LAN_MAC
        }
        configStatus {
          lastUsedFirmwareFile
          lastUsedSDKFile
          deviceIsConfigured
          importedFromCSV
          lastUpdatedAt
        }
      }
    }
    ... on GraphqlError {
      customError
    }
  }
}
`;

// //create backupfile for csv
// const BACKUP_ROUTERS_QUERY = gql`
//   query CreateBackUp {
//     backupDATA {
//       ... on BackUpStatus {
//         backUpCreated
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
// `;

// //search router, only roots
// const SEARCH_ROUTER_QUERY = gql`
//   query SearchRouter($optionalSearchParam: String!) {
//     searchRouter(optionalSearchParam: $optionalSearchParam) {
//       ... on Router {
//           modell
//           serialNumber
//           routerSSID
//           webUser
//           shellUser
//           dfltRouterPass
//           dfltWifiPass
//           IMEI
//           LAN_MAC
//           wifiPass
//           routerPassWeb
//           routerPassShell
//           ipAdress
//           isConfigured
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
// `;


// /*user queries ***************************************************************/

// // reusable user fragment 
// const FRAGMENT_USER = gql`fragment UserParts on User {
//       username
//       role
//       userDep
// }
// `;

//logout user
const LOGOUT_USER_QUERY = gql`
  query LogoutUser {
    logoutUser
  }
`;


//get users query
const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      ... on UsersSuccess {
        users {    
          username
          password
          verified
          role
          userDep
        }
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;





// //get users
// const GET_USERS_QUERY = gql`
//   query GetUsers {
//     getUsers {
//       ... on UsersSuccess {
//         users {
//           ...UserParts
//         }
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
//   ${FRAGMENT_USER}
// `;








// // search user 
// const SEARCH_USER_QUERY = gql`
//   query SearchUser($usernameOfToSearchUser: String!) {
//     searchUser(usernameOfToSearchUser: $usernameOfToSearchUser) {
//       ... on User {
//         ...UserParts
//       }
//       ... on GraphqlError {
//         customError
//       }
//     }
//   }
//   ${FRAGMENT_USER}
// `;

export {
  GET_DEVICES_QUERY,
  //   GET_ROUTERS_QUERY,
  // BACKUP_ROUTERS_QUERY,
  //   SEARCH_ROUTER_QUERY,

  /* user queries *******/
  GET_USERS_QUERY,
  LOGOUT_USER_QUERY,
}