import { useState, useEffect } from "react";

import usePOST from "./UsePost";
import { registerUrl } from "../api";

/**
 * Custom React hook for managing user registration functionality.
 * @returns {{
 *   selectedOption: any,
 *   setSelectedOption: (option: any) => void,
 *   registrationStatus: string|null,
 *   registrationData: {
 *     venueManager: boolean,
 *     name: string,
 *     email: string,
 *     password: string,
 *     avatar: string
 *   },
 *   errors: Object,
 *   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   isLoading: boolean
 * }} An object containing selected option, functions to set selected option, registration status, registration data, error messages,
 * input change handler, form submission handler, and loading status.
 */

const useRegister = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    venueManager: false,
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  const [touchedFields, setTouchedFields] = useState({});

  const { isLoading, isError, postRequest } = usePOST();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
    // Mark the field as touched
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  useEffect(() => {
    // Validation checks only if the field has been touched
    if (Object.keys(errors).length > 0) {
      const newErrors = {};

      if (
        touchedFields.name &&
        (!registrationData.name ||
          !/^[a-zA-Z0-9_]+$/.test(registrationData.name))
      ) {
        newErrors.name =
          "Name must only contain letters, numbers, and underscores";
      }

      if (
        touchedFields.email &&
        (!registrationData.email ||
          (!registrationData.email.endsWith("stud.noroff.no") &&
            !registrationData.email.endsWith("noroff.no")))
      ) {
        newErrors.email =
          "Email must be a valid stud.noroff.no or noroff.no address";
      }

      if (
        touchedFields.password &&
        (!registrationData.password || registrationData.password.length < 8)
      ) {
        newErrors.password = "Password must be at least 8 characters long";
      }

      if (
        touchedFields.avatar &&
        registrationData.avatar &&
        !isValidURL(registrationData.avatar)
      ) {
        newErrors.avatar = "Avatar URL must be a valid URL";
      }

      setErrors(newErrors);
    }
  }, [registrationData, touchedFields, selectedOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setRegistrationStatus("failure");
      return;
    }

    try {
      const data = await postRequest(registerUrl, registrationData);
      if (data.success) {
        setRegistrationStatus("success");
        console.log(data.success);
      } else {
        console.error("Registration failed:", data.error);
        setRegistrationStatus("failure");
        setErrors({ message: data.error });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationStatus("failure");
      if (isError) {
        console.error("An error occurred during POST request:", error);
      }
    }
  };

  return {
    selectedOption,
    setSelectedOption,
    registrationStatus,
    registrationData,
    errors,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
};

export default useRegister;
