import React, { useState } from "react";
import useRegister from "../../hooks/useRegister";
import Button from "../../components/Ui/Button";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { FaEnvelope, FaImage, FaKey, FaUserCircle } from "react-icons/fa";

const Register = () => {
  const {
    registrationStatus,
    registrationData,
    errors,
    handleInputChange,
    handleSubmit,
  } = useRegister();
  const [isVenueManager, setIsVenueManager] = useState(false);

  const handleVenueManagerToggle = () => {
    setIsVenueManager(!isVenueManager);
  };

  return (
    <div>
      <SEO
        title="Register | Holidaze"
        description="Join Holidaze, a global community of travelers and hosts. Discover unique homes and experiences around the world, or rent out your own."
      />
      <main className="min-h-screen flex items-center dark:text-white justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="h1 mt-6 text-center font-extrabold  uppercase">
              Register
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="venueManager"
                  name="venueManager"
                  checked={registrationData.venueManager}
                  onChange={(e) => {
                    handleInputChange({
                      target: {
                        name: "venueManager",
                        value: e.target.checked,
                      },
                    });
                    handleVenueManagerToggle();
                  }}
                  className="switch-checkbox visually-hidden"
                />
                <label
                  htmlFor="venueManager"
                  className={`switch-label ${
                    registrationData.venueManager ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`switch-slider ${
                      registrationData.venueManager
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></span>
                </label>
                <div className="ml-2">
                  {isVenueManager
                    ? "Register as Venue Manager"
                    : "Register as Customer"}
                </div>
              </div>
            </div>

            <div className="space-y-6  max-w-md mx-auto">
              <div className="space-y-6  max-w-md mx-auto">
                <div>
                  <label className="mb-2 text-sm  block">User Name</label>
                  <div>
                    <div className="relative flex items-center">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        required
                        className="input"
                        onChange={handleInputChange}
                        value={registrationData.name}
                      />
                      <div className="absolute left-4">
                        <FaUserCircle className="text-gray-400" />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm">{errors.name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 text-sm block">Email</label>
                <div>
                  <div className="relative flex items-center">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input"
                      onChange={handleInputChange}
                      value={registrationData.email}
                    />
                    <div className="absolute left-4">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-2 text-sm block">Password</label>
                <div>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="input"
                      onChange={handleInputChange}
                      value={registrationData.password}
                    />

                    <div className="absolute left-4">
                      <FaKey className="text-gray-400" />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="mb-2 text-sm  block">Avatar</label>
              <div>
                <div className="relative flex items-center">
                  <input
                    id="avatar"
                    name="avatar"
                    type="avatar"
                    className="input"
                    onChange={handleInputChange}
                    value={registrationData.avatar}
                  />

                  <div className="absolute left-4">
                    <FaImage className="text-gray-400" />
                  </div>
                </div>
                {errors.avatar && (
                  <p className="text-red-600 text-sm">{errors.avatar}</p>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" className="button">
                Register
              </Button>
            </div>
          </form>

          {registrationStatus === "success" && (
            <div className="fixe w-full mx-auto inset-0 flex items-center justify-center">
              <div className="bg-gray-100 opacity-80  dark:opacity-100 p-6 rounded-md max-w-md w-full shadow-md">
                <span className="p text-primary text-center  mb-4">
                  Registration successful!
                </span>{" "}
                <Link
                  to="/login"
                  className="px-4 text-center shadow text-primary border"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {registrationStatus === "failure" && (
            <p className="text-red-600 text-center">
              Registration failed. Please select an option.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Register;
