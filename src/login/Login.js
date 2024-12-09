import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "./Login.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  // Validation schema
  const validate = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  });

  // Handle login submission
  const onSubmit = (data) => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      const { email, password } = JSON.parse(storedData);

      if (email === data.email && password === data.password) {
        // Set login data in localStorage
        localStorage.setItem("loggedInData", JSON.stringify({ email: data.email }));

        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard or home page
      } else {
        setLoginError("Invalid email or password.");
      }
    } else {
      setLoginError("No user found. Please signup first.");
    }
  };

  return (
    <div className="login-page">
    <div className="login-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {loginError && <p className="error">{loginError}</p>}

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
    </div>
  );
}
