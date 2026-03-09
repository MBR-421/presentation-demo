import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msal";

const rootEl = document.getElementById("root");
rootEl.innerHTML = '<div style="padding:16px;font-family:system-ui">Loading…</div>';

(async () => {
  // Ensure MSAL is ready and processes the auth response
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise();

  // Set an active account if we already have one (common after redirect)
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
