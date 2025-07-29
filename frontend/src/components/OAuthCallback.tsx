import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      login();
      navigate("/"); // Redirect to home or dashboard
    } else {
      // navigate("/login"); // Something went wrong
    }
  }, [searchParams, navigate, login]);

  return <p>Redirecting...</p>;
};

export default OAuthCallback;
