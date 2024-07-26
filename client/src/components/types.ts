import { Router } from "../generated/gql/graphql";
import { SelectChangeEvent } from "@mui/material/Select";

//bootstrap profile dialog props
interface BootStrapDialogProps {
  open: boolean;
  onClose: () => void;
}

//sidebar props
interface SidebarProps {
  collapsed: boolean;
  toggled: boolean;
  onBackdropClick: () => void;
  handleCollapsedChange: () => void;
}

//get only necessary fields from type "Router"
type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;


//must be passed when configuring router (to store in database)
type GetTypesForInputs = OptionalExceptFor<
  Router,
  | "serialNumber"
  | "routerSSID"
  | "dfltRouterPass"
  | "dfltWifiPass"
  | "IMEI"
  | "LAN_MAC"
>;

//for router search and router udpate
type GetTypesOnSearch = OptionalExceptFor<
  Router,
  | "serialNumber"
  | "IMEI"
  | "LAN_MAC"
  | "dfltRouterPass"
  | "dfltWifiPass"
  | "routerPassWeb"
  | "wifiPass"
  | "routerPassShell"
  | "isConfigured"
  | "ipAdress"
>;

//extend GetTypes For Inputs interface
interface IRouterInput extends GetTypesForInputs {
  inputQR_CODE?: string; //if user decides to scan
}

//props passed between searchAndUpdate and RouterDetails component
interface IRouterDetailsProps {
  router: GetTypesOnSearch; //data coming back when searched, will be updated as well
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => Promise<void>; //handle data change
  handleUpdate: () => Promise<void>;
  //messages of search qery
  updateResultFields: {
    success: string;
    failure: string;
  };
  handleConfigStatus: () => void; //for toggling switch true or false, for isConfigured status of router
}

type FileTypes = 'FIRMWARE' | 'SDK' | 'RUTVERSION';

//props for ExistingFiles and RUTVersionSelect components
interface DropDownSelectProps {
  selectFor?: FileTypes
  onChange: (e: SelectChangeEvent) => void;
}

//props for UploadFirmware and UploadSDK functional components
interface UploadFileProps {
  uploadButtonFor: FileTypes,
  fileIsUploaded: boolean;
  error: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetInputRef: React.RefObject<HTMLInputElement> // on reset if the same file is uploaded, then set input value temporarely to "" to trigger visual effects
}

//props for SelectConfigType component
interface SelectConfigTypeProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


interface InputCheckProps {
  label?: string; 
  useFiles: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


interface ConfigStepsDropDownProps {
  handleAccordionChange: (e: React.SyntheticEvent, expanded: boolean) => void;
  expanded: boolean;
}


//init values for config route
const initialValuesRouter: IRouterInput = {
  inputQR_CODE: "",


  deviceInfo: {
    modell: '',


    wifiSSID: '',
    webUser: 'admin', //change if not admin
    passForWebUser: '',
    passWifi: '',
    serialNumber: '',
    SIMID: '',
    IMEI: '',
    LAN_MAC: '',


    configStatus: {

    }
  },
  generateNewCredentials: false,
  options: {
    kindOfConfig: 'Option1',
    updateFirmware: true,
    updateSDK: false
  }

};

//for config router status widgets
type IConfStatus = {
  showConfigGears?: boolean;
  configTxts?: {
    configStatus?: string;
    configRunOrDone?: string;
  };
};

//##################################################################
interface ILogin {
  username: string;
  password: string;
  showPassword: boolean;
}

//init login values
const LoginUserInitialValues: ILogin = {
  username: "",
  password: "",
  showPassword: false,
};

//type for user permissions
type authRulesTypes = {
  downloadRouterList: (string | JSX.Element)[];
  searchRouters: (string | JSX.Element)[];
  editRouters: (string | JSX.Element)[];
  deleteRouters: (string | JSX.Element)[];
  configRouters: (string | JSX.Element)[];


  //FIXME: rules regarding other users
  // viewUsers: (string | JSX.Element)[];
  // createUsers: (string | JSX.Element)[];
  // updateUsers: (string | JSX.Element)[];
  // deleteUsers: (string | JSX.Element)[];

}[];

//for swapping y and z in decode.qr.ts (QR code decoder)
type IChar = {
  [key: string]: string;
};

// for AutoSteps.tsx file 
interface ITodoStep {
  stepName?: string | JSX.Element;
  imgSrc: string;
  todo?: JSX.Element;
}

//enum containing all device modells
enum DeviceModell {
  RUT200 = 'RUT200',
  RUT230 = 'RUT230',
  RUT240 = 'RUT240',
  RUT260 = 'RUT260',
  RUT300 = 'RUT300',
  RUT360 = 'RUT360',
  RUT901 = 'RUT901',
  RUT906 = 'RUT906',
  RUT950 = 'RUT950',
  RUT951 = 'RUT951',
  RUT955 = 'RUT955',
  RUT956 = 'RUT956',
}




export { LoginUserInitialValues, initialValuesRouter };
export type {
  ConfigStepsDropDownProps,
  DropDownSelectProps,
  SelectConfigTypeProps,
  InputCheckProps,
  BootStrapDialogProps,
  SidebarProps,
  authRulesTypes,
  GetTypesOnSearch,
  IConfStatus,
  IRouterInput,
  IRouterDetailsProps,
  UploadFileProps,
  ILogin,
  IChar,
  ITodoStep,
  DeviceModell
};
