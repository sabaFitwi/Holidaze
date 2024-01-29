import { useState, useEffect } from "react";

//import { useNavigate } from "react-router-dom";
import usePOST from "./UsePost";
import { registerUrl } from "../services/api";

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
  //const navigate = useNavigate();
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
  }, [registrationData, errors, touchedFields, selectedOption]);

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
        // Navigate or perform any actions after successful registration
      } else {
        console.error("Registration failed:", data.error);
        setRegistrationStatus("failure");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationStatus("failure");
      if (isError) {
        // Handle error states here
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
