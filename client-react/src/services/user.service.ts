import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_USER_MUTATION } from "../graphql/user.mutation";
import { Mutation } from "../generated/gql/graphql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure, loginStart } from "../auth/redux/authSlice";
import { ILogin, IUser } from "../utils/types";
import { useAppDispatch } from "../auth/redux/hooks";

//custom mutation hook for login user mutation
const useLoginUserMutation = () => {
    const navigate = useNavigate(); // navigation with useNavigate hook
    const dispatch = useAppDispatch(); // use dispatch function from Redux store

    const [isLoading, setIsLoading] = useState(false);
    const [loginText, setLoginText] = useState("");
    const [error, setError] = useState<string>("");

    const [loginUser] = useMutation<Mutation>(LOGIN_USER_MUTATION, {
        fetchPolicy: "no-cache",
        onCompleted: ({ loginUser }) => {
            if (loginUser?.__typename === "User") {
                setLoginText("You are being logged in...");
                const user: IUser = {
                    username: loginUser.username,
                    role: loginUser.role,
                    userDep: loginUser.userDep,
                    verified: loginUser.verified
                };
                dispatch(loginSuccess(user));
                setTimeout(() => {
                    setIsLoading(false);
                    setLoginText("");
                    navigate("/dashboard");
                }, 1500);
            } else if (loginUser?.__typename === "GraphqlError") {
                const errorMsg = loginUser.customError;
                setError(errorMsg);
                setLoginText("");
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
                dispatch(loginFailure(errorMsg));
            }


        },
        onError: (err: ApolloError) => {
            setTimeout(() => {
                setIsLoading(false);
            }, 300); //we will briefly show loading circular progress even when login fails
            let errorMsg = "An unknown error occurred";
            if (err.networkError) {
                const errMsg = err.networkError.message;
                errorMsg =
                    errMsg.includes("404") || errMsg.includes("Failed to fetch")
                        ? "Server not available"
                        : err.networkError.message;
            } else if (err.graphQLErrors) {
                errorMsg = `GraphQL error: ${err.graphQLErrors
                    .map((error) => error.message)
                    .join(", ")}`;
            }
            setError(errorMsg);
            setLoginText("");
            dispatch(loginFailure(errorMsg));
        },
    });

    const handleLogin = async ({ username, password }: ILogin) => {
        setIsLoading(true);
        dispatch(loginStart()); //call dispatch start action from redux
        await loginUser({
            variables: {
                loginInput: {
                    username,
                    password
                }
            }
        });
    };
    return { loginUser: handleLogin, isLoading, loginText, error };
};

export { useLoginUserMutation };
