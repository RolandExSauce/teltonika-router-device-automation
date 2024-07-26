import { gql } from "@apollo/client";

//login user
const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($loginInput: loginInput!) {
    loginUser(loginInput: $loginInput) {
      ... on User {
          username
          password
          verified
          role
          userDep
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;

// create user 
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: createUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ... on Success {
        successMsg
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;

//update other user (root)
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: updateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ... on Success {
        successMsg
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;

//as a layer of verification before user can access ressources
const USER_UPDATE_SELF_MUTATION = gql`
  mutation UpdateSelf($updateSelfInput: updateSelfInput!) {
    updateSelf(updateSelfInput: $updateSelfInput) {
      ... on Success {
        successMsg
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;

//delete user
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($usernameOfToDeleteUser: String!) {
    deleteUser(usernameOfToDeleteUser: $usernameOfToDeleteUser) {
      ... on Success {
        successMsg
      }
      ... on GraphqlError {
        customError
      }
    }
  }
`;


export {
    USER_UPDATE_SELF_MUTATION,
    LOGIN_USER_MUTATION,
    CREATE_USER_MUTATION,
    UPDATE_USER_MUTATION,
    DELETE_USER_MUTATION
}