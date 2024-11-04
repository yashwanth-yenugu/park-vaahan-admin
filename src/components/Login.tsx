import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn, Car } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!email || !email.includes("@")) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!password || password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (!hasError) {
      login({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-indigo-600">
            Park Vaahan Admin
          </h1>
          <h2 className="mt-2 text-lg text-gray-600">
            Sign in to your dashboard
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <LogIn className="h-5 w-5" />
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
