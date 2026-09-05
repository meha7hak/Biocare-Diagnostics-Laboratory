import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react";
import logo from "../assets/BioCare_Diagnostics_Logo.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

export default function CreateAccount({ onNavigateToSignIn }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.fullName.trim()) {
      errors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 2) {
      errors.fullName = "Enter your full name.";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }

    if (!form.password) {
      errors.password = "Password is required.";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      errors.password = "Include at least one uppercase letter and one number.";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      // TODO: replace with your real registration call, e.g.
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName: form.fullName,
      //     email: form.email,
      //     phone: form.phone,
      //     password: form.password,
      //   }),
      // });
      // if (!res.ok) {
      //   const data = await res.json().catch(() => ({}));
      //   throw new Error(data.message || "Could not create account.");
      // }
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Dr. Jane Doe",
      icon: User,
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "jane.doe@clinic.com",
      icon: Mail,
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      icon: Phone,
      autoComplete: "tel",
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl px-8 py-10">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={logo}
            alt="BioCore Diagnostics"
            className="h-14 w-auto object-contain mb-2"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-slate-900">Create Account</h2>
          <p className="text-sm text-slate-400 mt-1">
            Join BioCore for advanced clinical management.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {fields.map(({ name, label, type, placeholder, icon: Icon, autoComplete }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id={name}
                  type={type}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange(name)}
                  aria-invalid={!!fieldErrors[name]}
                  aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    fieldErrors[name]
                      ? "border-red-300 focus:ring-red-500/40 focus:border-red-500"
                      : "border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500"
                  }`}
                />
              </div>
              {fieldErrors[name] && (
                <p id={`${name}-error`} className="text-xs text-red-500 mt-1">
                  {fieldErrors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange("password")}
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
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-xs text-red-500 mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                aria-invalid={!!fieldErrors.confirmPassword}
                aria-describedby={
                  fieldErrors.confirmPassword ? "confirmPassword-error" : undefined
                }
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.confirmPassword
                    ? "border-red-300 focus:ring-red-500/40 focus:border-red-500"
                    : "border-slate-200 focus:ring-emerald-500/40 focus:border-emerald-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p id="confirmPassword-error" className="text-xs text-red-500 mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Family members are optional and can be added later.</span>
          </div>

          {error && <p className="text-sm text-red-500 -mt-1">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            {submitting ? "Creating account..." : "Create Account"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="font-semibold text-slate-900 hover:text-emerald-600"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}