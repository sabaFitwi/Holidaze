import React from "react";

import useLogin from "../../hooks/useLogin";
import Button from "../../components/Ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

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
                    class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                    onChange={handleInputChange}
                    value={loginData.email}
                  />

                  <div className="absolute left-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
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
                    class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                    onChange={handleInputChange}
                    value={loginData.password}
                  />

                  <div className="absolute left-4">
                    <FontAwesomeIcon icon={faKey} className="text-gray-400" />
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
              className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
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
  );
};

export default Login;
