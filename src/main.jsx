import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msal";

const rootEl = document.getElementById("root");
rootEl.innerHTML = '<div style="padding:16px;font-family:system-ui">Loading…</div>';

(async () => {
  await msalInstance.initialize();
  
  try {
    await msalInstance.handleRedirectPromise();
  } catch (e) {
    console.warn("MSAL redirect error (safe to ignore in demo):", e);
  }

  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0 && !msalInstance.getActiveAccount()) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  createRoot(rootEl).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
})();