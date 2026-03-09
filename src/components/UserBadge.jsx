// src/components/UserBadge.jsx
import { useEffect, useMemo } from "react";
import { useMsal } from "@azure/msal-react";

function initialsOf(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase())
    .join("");
}

export default function UserBadge() {
  const { instance, accounts } = useMsal();

  // Ensure we have an active account
  useEffect(() => {
    if (!instance.getActiveAccount() && accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  const account = useMemo(
    () => instance.getActiveAccount() || accounts[0] || null,
    [accounts, instance]
  );

  if (!account) return null;

  // MSAL account has idTokenClaims with useful attributes
  const claims = account.idTokenClaims || {};
  const name =
    claims.name ||
    account.name ||
    claims.given_name ||
    claims.preferred_username ||
    "Signed in";
  const email =
    claims.preferred_username ||
    claims.email ||
    account.username;

  const handleSignOut = async () => {
    await instance.logoutRedirect();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
        {initialsOf(name)}
      </div>
      <div className="leading-tight">
        <div className="text-sm font-medium text-slate-900">{name}</div>
        <div className="text-xs text-slate-600">{email}</div>
      </div>
      <button
        onClick={handleSignOut}
        className="ml-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:shadow-sm"
      >
        Sign out
      </button>
    </div>
  );
}
