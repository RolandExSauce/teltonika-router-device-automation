import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
//import "./index.css";
import { client } from "./auth/apolloClient.ts";
import { ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "./auth/authContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

//Main component, render to DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
