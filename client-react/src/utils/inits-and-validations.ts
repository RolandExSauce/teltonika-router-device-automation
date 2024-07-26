import * as Yup from "yup";
import { ILogin } from "./types";


//yup validation
export const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
});


//init login values
export const LoginUserInitialValues: ILogin = {
    username: "",
    password: "",
};

