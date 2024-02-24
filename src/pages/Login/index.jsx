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
      <div className="min-h-screen flex items-center dark:text-white justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className=" h1 mt-6 text-center font-extrabold uppercase">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6  max-w-md mx-auto">
              <div>
                <label className="mb-2 text-sm block">Email</label>
                <div>
                  <div className="relative flex items-center">
                    <input
                      data-cy="email-input"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input"
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
                <label className="mb-2 text-sm block">Password</label>
                <div>
                  <div className="relative flex items-center">
                    <input
                      data-cy="password-input"
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="input"
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
              <Button
                type="submit"
                value="login"
                data-cy="login-button"
                className="button"
              >
                Log In
              </Button>
            </div>
          </form>

          {loginStatus === "success" && (
            <p id="successful" className="text-green-600 text-center">
              Login successful!
            </p>
          )}

          {loginStatus === "failure" && (
            <p id="failed" className="text-red-600 text-center">
              Login failed. Please check your email or password.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
