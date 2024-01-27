import React from "react";
import useRegister from "../../hooks/useRegister";
import Button from "../../components/Ui/Button";

const Register = () => {
  const {
    registrationStatus,
    registrationData,
    errors,
    handleInputChange,
    handleSubmit,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Register as:</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="venueManager"
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: "venueManager",
                          value: e.target.checked,
                        },
                      })
                    }
                    checked={registrationData.venueManager}
                  />
                  <span className="ml-2">Venue Manager</span>
                </label>
              </div>
            </div>
          </div>

          <div class="space-y-6  max-w-md mx-auto">
            <div class="space-y-6  max-w-md mx-auto">
              <div>
                <labe class="mb-2 text-sm text-black block">Your Name</labe>
                <div>
                  <div class="relative flex items-center">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                      onChange={handleInputChange}
                      value={registrationData.name}
                    />
                    <div class="absolute left-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22px"
                        height="22px"
                        fill="#bbb"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <labe class="mb-2 text-sm text-black block">Your Email</labe>
              <div>
                <div class="relative flex items-center">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                    onChange={handleInputChange}
                    value={registrationData.email}
                  />
                  <div class="absolute left-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22px"
                      height="22px"
                      fill="#bbb"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <labe class="mb-2 text-sm text-black block">Your Email</labe>
              <div>
                <div class="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                    onChange={handleInputChange}
                    value={registrationData.password}
                  />

                  <div class="absolute left-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22px"
                      height="22px"
                      fill="#bbb"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M298.789 313.693c-12.738 8.492-27.534 12.981-42.789 12.981-15.254 0-30.05-4.489-42.788-12.981L3.409 173.82A76.269 76.269 0 0 1 0 171.403V400.6c0 26.278 21.325 47.133 47.133 47.133h417.733c26.278 0 47.133-21.325 47.133-47.133V171.402a75.21 75.21 0 0 1-3.416 2.422z"
                        data-original="#000000"
                      />
                      <path
                        d="m20.05 148.858 209.803 139.874c7.942 5.295 17.044 7.942 26.146 7.942 9.103 0 18.206-2.648 26.148-7.942L491.95 148.858c12.555-8.365 20.05-22.365 20.05-37.475 0-25.981-21.137-47.117-47.117-47.117H47.117C21.137 64.267 0 85.403 0 111.408a44.912 44.912 0 0 0 20.05 37.45z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <labe class="mb-2 text-sm text-black block">Avatar</labe>
            <div>
              <div class="relative flex items-center">
                <input
                  id="avatar"
                  name="avatar"
                  type="avatar"
                  class="pr-4 pl-14 py-2.5 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#007bff]"
                  onChange={handleInputChange}
                  value={registrationData.avatar}
                />

                <div class="absolute left-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                    fill="#bbb"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M298.789 313.693c-12.738 8.492-27.534 12.981-42.789 12.981-15.254 0-30.05-4.489-42.788-12.981L3.409 173.82A76.269 76.269 0 0 1 0 171.403V400.6c0 26.278 21.325 47.133 47.133 47.133h417.733c26.278 0 47.133-21.325 47.133-47.133V171.402a75.21 75.21 0 0 1-3.416 2.422z"
                      data-original="#000000"
                    />
                    <path
                      d="m20.05 148.858 209.803 139.874c7.942 5.295 17.044 7.942 26.146 7.942 9.103 0 18.206-2.648 26.148-7.942L491.95 148.858c12.555-8.365 20.05-22.365 20.05-37.475 0-25.981-21.137-47.117-47.117-47.117H47.117C21.137 64.267 0 85.403 0 111.408a44.912 44.912 0 0 0 20.05 37.45z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </Button>
          </div>
        </form>

        {registrationStatus === "success" && (
          <p className="text-green-600 text-center">Registration successful!</p>
        )}

        {registrationStatus === "failure" && (
          <p className="text-red-600 text-center">
            Registration failed. Please select an option.
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
