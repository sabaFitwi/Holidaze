import React from "react";

import useLogin from "../../hooks/useLogin";
import Button from "../../components/Ui/Button";
import SEO from "../../components/SEO";
import { FaEnvelope, FaKey } from "react-icons/fa";

const Login = () => {
  const {
    loginStatus,
    loginData,
    errors,
    touchedFields,
    handleInputChange,
    handleSubmit,
  } = useLogin();

  return (
    <div>
      <SEO
        title="Login | Holidaze"
        description="Log in to your Holidaze account. Access your bookings, manage your profile, and plan your next adventure."
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6  max-w-md mx-auto">
              <div>
                <labe className="mb-2 text-sm text-black block">Email</labe>
                <div>
                  <div className="relative flex items-center">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      class="input"
                      onChange={handleInputChange}
                      value={loginData.email}
                    />

                    <div className="absolute left-4">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                  {errors.email && touchedFields.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <labe className="mb-2 text-sm text-black block">Password</labe>
                <div>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      class="input"
                      onChange={handleInputChange}
                      value={loginData.password}
                    />

                    <div className="absolute left-4">
                      <FaKey className="text-gray-400" />
                    </div>
                  </div>
                </div>
                {errors.password && touchedFields.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <div>
              <Button type="submit" className="button">
                Log In
              </Button>
            </div>
          </form>

          {loginStatus === "success" && (
            <p className="text-green-600 text-center">Login successful!</p>
          )}

          {loginStatus === "failure" && (
            <p className="text-red-600 text-center">
              Login failed. Please check your credentials.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
