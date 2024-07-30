import { SelectChangeEvent } from "@mui/material/Select";
import { DeviceInfo } from "../../../generated/gql/graphql";
import { IInputFieldsArr } from "../../../utils/types";

//handle file change
const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "firmware" | "sdk",
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement>
) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
        if (inputRef.current) inputRef.current.value = "";
        const extension = file.name.split(".").pop()?.toLowerCase();
        const validExtension = fileType === "firmware" ? "bin" : "gz";

        if (extension === validExtension) {
            setIsUploaded(true);
            setFile(file);
            setError(null);
        } else {
            setError(`Please select a .${validExtension} file.`);
            setTimeout(() => setError(null), 5000);
        }
    }
};

//handle input checkbox change
const handleCheckBoxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setCheckBoxInputChange: React.Dispatch<React.SetStateAction<boolean>>
) => setCheckBoxInputChange(event.target.checked);


//handle drop down select change
const handleDropDownSelectChange = (
    event: SelectChangeEvent,
    setDropDownSelectItem: React.Dispatch<React.SetStateAction<string>>
) => setDropDownSelectItem(event.target.value);


//when user decides to type data manuelly instead of scanning
const handleInputFieldsManuellyTypedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setInputFieldsArr: React.Dispatch<React.SetStateAction<IInputFieldsArr[]>>,
    setDataFieldsObj: React.Dispatch<React.SetStateAction<DeviceInfo>>
) => {
    const { name, value } = e.target;
    setInputFieldsArr((prev) =>
        prev.map((field) =>
            field.id === name ? { ...field, value: value } : field
        )
    );
    setDataFieldsObj((prev) => ({
        ...prev,
        deviceFieldsMust: {
            ...prev.deviceFieldsMust,
            [name]: value,
        },
        deviceFieldsOptional: {
            ...prev.deviceFieldsOptional,
            [name]: value,
        },
    }));
};

export {
    handleFileChange,
    handleCheckBoxInputChange,
    handleDropDownSelectChange,
    handleInputFieldsManuellyTypedChange
}