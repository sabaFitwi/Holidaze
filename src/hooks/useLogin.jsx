import { useState, useEffect } from "react";
import { loginUser } from "../services/auth/Login";
//import { saveToLocalStorage } from "../context/localStorage";
import { getProfile } from "./useProfile";

const useLogin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    const newErrors = {};

    if (
      !loginData.email ||
      (!loginData.email.endsWith("stud.noroff.no") &&
        !loginData.email.endsWith("noroff.no"))
    ) {
      newErrors.email =
        "Email must be a valid stud.noroff.no or noroff.no address";
    }

    if (!loginData.password || loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
  }, [loginData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const resp = await loginUser({ email, password });
    const resp = await loginUser({
      email: loginData.email,
      password: loginData.password,
    });

    console.log(resp);

    if ("accessToken" in resp) {
      localStorage.setItem("Token", resp["accessToken"]);
      localStorage.setItem("UserData", JSON.stringify(resp));
      localStorage.setItem("isLoggedIn", true);

      const profileCall = await getProfile();
      localStorage.setItem("UserData", JSON.stringify(profileCall));
      window.location.href = "/profile";
    } else {
      setLoginStatus(true);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const data = await loginUser(loginData);

  //     console.log(data);

  //     if (data.success) {
  //       setLoginStatus(true);
  //     } else {
  //       console.error("Login failed:", data.message);
  //       setLoginStatus("failure");
  //     }
  //     saveToLocalStorage("accessToken", data.accessToken);
  //     saveToLocalStorage("name", data.name);
  //     saveToLocalStorage("venueManager", data.venueManager);
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     setLoginStatus("failure");
  //   }
  // };

  return {
    loginStatus,
    loginData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

export default useLogin;
