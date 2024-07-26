import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import {
  rutDeviceIconImg,
  teltonikaNetworksIconImg,
  userLoginAvatarIconImg,
} from "../../assets/export-imgs";
import { ILogin } from "../../utils/types";
import { useLoginUserMutation } from "../../services/user.service";
import {
  LoginUserInitialValues,
  validationSchemaLogin,
} from "../../utils/inits-and-validations";
import "./Login.css";

// Define helper text styles
const helperTxtStyles = {
  sx: {
    paddingTop: "6px",
    color: "red",
    textAlign: "center",
  },
};

//Login user component
const Login = () => {
  //destructure and get loginUser func and other props from custom hook
  const { loginUser, isLoading, loginText, error } = useLoginUserMutation();

  //handle login submit
  const handleSubmit = async ({ username, password }: ILogin) => {
    loginUser({ username, password });
  };
  return (
    <Formik
      validateOnChange={false}
      initialValues={LoginUserInitialValues}
      validationSchema={validationSchemaLogin}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const { values, handleChange } = props;
        return (
          <div className="wrapper">
            <div className="container">
              <div className="img-container">
                <img src={teltonikaNetworksIconImg} alt="Teltonika Networks" />
                <img src={rutDeviceIconImg} alt="RUT Device" />
                <p style={{ fontFamily: "Arial", color: "#0071c5" }}>
                  <i> We help you connect,</i>
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    color: "#0071c5",
                    lineHeight: 3,
                  }}
                >
                  <i> we also help you automate</i>
                </p>
              </div>
              <div className="login-content">
                <Form id="login-form" className="login-form">
                  <img
                    id="user-avatar-icon"
                    src={userLoginAvatarIconImg}
                    alt="Avatar"
                  />
                  <h2
                    id="sign-in-text"
                    style={{
                      color: "#3c4748",
                      fontFamily: "Arial",
                      fontSize: "2.2rem",
                    }}
                  >
                    Sign in 🔑
                  </h2>

                  <div id="input-div-1" className="input-div">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <TextField
                      placeholder="Username*"
                      id="username"
                      name="username"
                      type="text"
                      variant="standard"
                      autoComplete="off"
                      FormHelperTextProps={helperTxtStyles}
                      helperText={<ErrorMessage name="username" />}
                      value={values.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div id="input-div-2" className="input-div">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <TextField
                      id="password"
                      name="password"
                      placeholder="Password*"
                      autoComplete="off"
                      type="password"
                      variant="standard"
                      FormHelperTextProps={helperTxtStyles}
                      helperText={<ErrorMessage name="password" />}
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    id="err-div"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {error && (
                      <span
                        id="login-err"
                        style={{
                          color: "red",
                          marginTop: 20,
                          fontFamily: "Arial",
                        }}
                      >
                        {error}
                      </span>
                    )}
                    <input type="submit" className="btn" value="Login" />
                  </div>

                  {isLoading && (
                    <div
                      id="load-icon-div"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                          color: "#0284c7",
                          animationDuration: "700ms",
                          [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: "round",
                          },
                        }}
                        size={20}
                        thickness={6}
                      />
                      <span
                        id="login-text"
                        style={{ marginLeft: "9px", fontFamily: "Arial" }}
                      >
                        {loginText}
                      </span>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
export default Login;
