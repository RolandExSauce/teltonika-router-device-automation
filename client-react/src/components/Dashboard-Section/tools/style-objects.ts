import { CSSProperties } from "react";


//style object for TableOptions.tsx 
export const styleObjectsTableOptions = {
    localizationStyles: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "80vw",
        boxSizing: "border-box",
        overflow: "hidden",
        margin: 10,
        padding: 10,
    } as CSSProperties,

    renderRowActions: {
        divStyle: {
            display: "flex",
            flexWrap: "nowrap",
            gap: "20px",
        } as CSSProperties,
        buttonStyle: {
            border: "none",
            background: "none",
            margin: 5,
            cursor: "pointer",
        } as CSSProperties,
    },

    renderTopToolbarCustomActions: {
        divStyle: {
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            padding: "0.5rem",
        } as CSSProperties,
    },

    renderEditRowDialogContent: {
        divStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            width: "680px",
            maxWidth: "100%",
            padding: 20,
            margin: "0 auto",
            boxSizing: "border-box",
            overflow: "hidden",
        } as CSSProperties,
        dialogTitle: {
            borderBottom: "thick double #32a1ce",
            width: "100%",
            marginBottom: 30,
            paddingBottom: 20,
        } as CSSProperties,
        dialogContent: {
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            width: "350px",
            overflow: "auto",
        } as CSSProperties,
    },
};

