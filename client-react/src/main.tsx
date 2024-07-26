import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client"; //provider for apollo
import { Provider } from "react-redux"; //provider for redux
import { client } from "./auth/apolloClient.ts";
import { persistor, store } from "./auth/redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
