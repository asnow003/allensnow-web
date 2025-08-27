import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { IntlProvider } from "react-intl";

import English from "./assets/strings/en-US.json";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyA4zboYKqiRz5S4A2seZWcC5v_oqzKdFpo",
  authDomain: "allensnowcom.firebaseapp.com",
  projectId: "allensnowcom",
  storageBucket: "allensnowcom.appspot.com",
  messagingSenderId: "24515259412",
  appId: "1:24515259412:web:a1fa95ddf11f9fe39c0b01",
  measurementId: "G-VD1MQXTCCL",
};

const locale = navigator.language;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

logEvent(analytics, "notification_received");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <IntlProvider locale={locale} messages={English}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
