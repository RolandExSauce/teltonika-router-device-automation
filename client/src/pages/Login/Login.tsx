import "./login.css";
import lohinAutomateSide from "../../assets/images/rutSeriesAutomations.png";
import loginBg from "../../assets/images/loginBg.png";
import { ILogin, LoginUserInitialValues } from "../../components/types.ts";
import { Mutation } from "../../generated/gql/graphql.ts";
import { useStylesForm, validationSchemaLogin } from "./tools.tsx";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ErrorMessage, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../../auth/authContext.tsx";
import { LOGIN_USER_MUTATION } from "../../graphql/user.mutation.ts";

function Login() {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //styles from makestyles
  const classes = useStylesForm();

  //states
  const [isLoading, setIsLoading] = useState(false);
  const [loginText, setLoginText] = useState("");
  const [error, setError] = useState<string>("");

  //login user mutation
  const [loginUser] = useMutation<Mutation>(LOGIN_USER_MUTATION, {
    fetchPolicy: "no-cache",
    onCompleted: ({ loginUser }) => {
      console.log(loginUser);
      if (loginUser?.__typename === "UserResponse") {
        setIsLoading(true);
        setLoginText("You are being logged in...");
        setCurrentUser(loginUser.user);

        setTimeout(() => {
          setIsLoading(false);
          setLoginText("");
          navigate("/");
        }, 1500);
        //if user exist, navigate to "/ (router dashboard)"
      } else if (loginUser?.__typename === "GraphqlError") {
        setError(loginUser.customError);
        setLoginText("");
      }
    },
  });

  //preventing default of eye icon
  const handleMouseDownPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  //trigger useMutation hook on submit
  const onSubmit = async ({ username, password }: ILogin) => {
    await loginUser({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
    });
  };

  return (
    <Box
      className="container"
      style={{ backgroundImage: `url(${loginBg})`, height: "100%" }}
    >
      <Formik
        validateOnChange={false}
        initialValues={LoginUserInitialValues}
        validationSchema={validationSchemaLogin}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { values, handleChange, setFieldValue } = props;
          return (
            <Box className="login-container">
              <Box className="image-container">
                <img src={lohinAutomateSide} alt="background" />
              </Box>
              <Box className="form-container">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      margin: "0px 0px 12px 0px",
                      fontFamily: "Lilita One",
                      textAlign: "center",
                      color: "#0555A4",
                    }}
                  >
                    Authorization required
                  </Typography>
                  <Avatar style={{ marginTop: 15, marginBottom: 25 }}>
                    <LockOutlinedIcon
                      fontSize="large"
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#0f4d92",
                        padding: 30,
                      }}
                    />
                  </Avatar>
                </Box>

                <Form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    placeholder="Username*"
                    variant="outlined"
                    fullWidth
                    classes={{ root: classes.textField }}
                    helperText={<ErrorMessage name="username" />}
                    autoComplete="off"
                    value={values.username}
                    id="username"
                    name="username"
                    onChange={handleChange}
                    inputProps={{
                      style: { fontSize: 20 },
                      maxLength: 20,
                    }}
                    sx={{
                      width: "85%",
                      input: {
                        "&::placeholder": {
                          color: "#0a639e",
                          opacity: 1,
                        },
                        paddingBottom: 2.5,
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: 35,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle
                            sx={{
                              color: "#0284c7",
                              marginBottom: 1.5,
                            }}
                            fontSize="large"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={values.password}
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password*"
                    classes={{ root: classes.textField }}
                    helperText={<ErrorMessage name="password" />}
                    autoComplete="off"
                    inputProps={{
                      style: { fontSize: 20 },
                      maxLength: 20,
                    }}
                    sx={{
                      width: "85%",
                      marginTop: "20px",
                      input: {
                        "&::placeholder": {
                          color: "#0a639e",
                          opacity: 1,
                        },
                        paddingBottom: 3,
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: 35,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon
                            fontSize="large"
                            sx={{
                              color: "#0284c7",
                              marginBottom: 1.5,
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                "showPassword",
                                !values.showPassword
                              );
                            }}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <VisibilityOff
                                sx={{
                                  color: "#0284c7",
                                }}
                              />
                            ) : (
                              <Visibility
                                sx={{
                                  color: "#0284c7",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <>
                    {error && (
                      <span style={{ color: "red", marginTop: 20 }}>
                        {error}
                      </span>
                    )}

                    {isLoading && (
                      <Stack direction={"row"} sx={{ marginTop: 5 }}>
                        <CircularProgress
                          variant="indeterminate"
                          disableShrink
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "light"
                                ? "#0284c7"
                                : "#0284c7",
                            animationDuration: "700ms",
                            [`& .${circularProgressClasses.circle}`]: {
                              strokeLinecap: "round",
                            },
                          }}
                          size={20}
                          thickness={6}
                        />
                        <Typography sx={{ marginLeft: "9px" }}>
                          {loginText}
                        </Typography>
                      </Stack>
                    )}
                  </>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "60%",
                      marginTop: 3,
                      height: 60,
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Lilita One",
                      backgroundColor: "#0284c7",
                      ":hover": {
                        bgcolor: "#003366",
                        color: "white",
                      },
                    }}
                  >
                    <span style={{ marginRight: 10 }}>Login</span>
                    <LockOpenIcon style={{ width: 28, height: 28 }} />
                  </Button>
                </Form>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default Login;
