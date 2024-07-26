import { Box, Stack } from "@mui/material";
import { authRulesTypes } from "../types";
import React, { Fragment } from "react";

//display authorizations of user
export const AuthRules: React.FC<{ authRules: authRulesTypes }> = (props: {
  authRules: authRulesTypes;
}) => {
  const ruleSet = props.authRules.map((authRules, index) => {
    return (
      <Box key={index}>
        <Stack direction={"row"} spacing={1} style={{ marginBottom: 10 }}>
          {authRules.downloadRouterList[index]}
          <span style={{ fontFamily: "Arial" }}>
            {authRules.downloadRouterList[index + 1]}
          </span>
        </Stack>
        <Stack direction={"row"} spacing={1} style={{ marginBottom: 10 }}>
          {authRules.searchRouters[index]}
          <span style={{ fontFamily: "Arial" }}>
            {authRules.searchRouters[index + 1]}
          </span>
        </Stack>

        <Stack direction={"row"} spacing={1} style={{ marginBottom: 10 }}>
          {authRules.editRouters[index]}
          <span style={{ fontFamily: "Arial" }}>
            {authRules.editRouters[index + 1]}
          </span>
        </Stack>

        <Stack direction={"row"} spacing={1} style={{ marginBottom: 10 }}>
          {authRules.deleteRouters[index]}
          <span style={{ fontFamily: "Arial" }}>
            {authRules.deleteRouters[index + 1]}
          </span>
        </Stack>
        <Stack direction={"row"} spacing={1} style={{ marginBottom: 10 }}>
          {authRules.configRouters[index]}
          <span style={{ fontFamily: "Arial" }}>
            {authRules.configRouters[index + 1]}
          </span>
        </Stack>
      </Box>
    );
  });
  return <Fragment>{ruleSet}</Fragment>;
};

//explanation => get inside each rule, its a key with a opposite value of an array,
//first value is the term: yes or no depending on role but yes or no are depicted as svg icons,
// second value in arr, thus index + 1, is the description of the rule
