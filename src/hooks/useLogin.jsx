import { useState, useEffect } from "react";
import { loginUser } from "../services/auth/Login";
import { getProfile } from "./useProfile";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
      localStorage.setItem("isVenueManager", profileCall.venueManager);

      localStorage.setItem("UserData", JSON.stringify(profileCall));
      navigate("/profile");
      window.location.reload();
    } else {
      setLoginStatus("failure");
    }
  };

  return {
    loginStatus,
    loginData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

export default useLogin;
