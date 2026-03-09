import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { motion } from "framer-motion";

export default function Login() {
  const { instance } = useMsal();
  const isAuthed = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/app";

  useEffect(() => {
    // If user is already signed in (e.g., after redirect), go to the app
    if (isAuthed) navigate(from, { replace: true });
  }, [isAuthed, from, navigate]);

  const handleLogin = async () => {
    // Request only OIDC basics; avoid offline_access unless you want refresh tokens
    await instance.loginRedirect({ scopes: ["openid", "profile", "email"] });
  };

  return (
    <div className="min-h-dvh relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur p-8 shadow-[0_10px_30px_-10px_rgba(15,23,42,.12)]"
      >
        <p className="text-[11px] uppercase tracking-widest text-sky-700/80 text-center">Matt Rose - Core Systems & Innovation<br />
        Presentation</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-2 text-slate-600">Single sign-on with your organisation account.</p>
        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 shadow-sm hover:shadow transition"
        >
          Continue with Microsoft
        </button>
        <button
  onClick={() => navigate('/app?demo=true')}
  className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 text-sm hover:shadow transition"
>
  View demo (no login required)
</button>
      </motion.div>
    </div>
  );
}
