import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import logo from "../assets/BioCare_Diagnostics_Logo.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const errors = { email: "", password: "" };

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validate();
    if (!isValid) {
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with your real auth call, e.g.
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password, remember }),
      // });
      // if (!res.ok) throw new Error("Invalid email or password.");
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl px-8 py-10">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logo}
            alt="BioCore Diagnostics"
            className="h-14 w-auto object-contain mb-2"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-slate-900">
            Sign in to Patient Portal
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Access your clinical reports and history
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.email
                    ? "border-red-300 focus:ring-red-500/40 focus:border-red-500"
                    : "border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-red-500 mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-800"
              >
                Password
              </label>
              <button
                type="button"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: "" }));
                  }
                }}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.password
                    ? "border-red-300 focus:ring-red-500/40 focus:border-red-500"
                    : "border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-xs text-red-500 mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/40"
            />
            <span className="text-sm text-slate-600">Remember for 30 days</span>
          </label>

          {error && (
            <p className="text-sm text-red-500 -mt-1">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            {submitting ? "Signing in..." : "Sign In"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="border-t border-slate-100 my-6" />

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <button
    type="button"
    onClick={onNavigateToRegister}
    className="font-semibold text-slate-900 hover:text-emerald-600"
  >
            Register Now
          </button>
        </p>

        <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mt-8">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            HIPAA Compliant
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
}