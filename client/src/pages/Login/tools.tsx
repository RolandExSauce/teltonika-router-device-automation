import * as Yup from "yup";
import { makeStyles as makeStylesCore } from "@material-ui/core/styles";

//some style
export const useStylesForm = makeStylesCore((theme) => ({
  textField: {
    "& p": {
      marginTop: 20,
      color: "#e32636",
      fontSize: 15,
    },
  },
  
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

//yup validation
export const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});
