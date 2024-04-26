import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="bg-base-300">
    
    <App />
    </div>
  </Provider>,
);

