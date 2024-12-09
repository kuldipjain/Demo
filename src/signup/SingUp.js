import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "./SingUp.css";

export default function SingUpForm() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate(); // React Router's navigate function

  // Validation schema
  const validate = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup.string().email("Invalid email address").required("Email is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match.")
      .required("Please confirm your password."),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  });

  // Handle form submission
  const onSubmit = (data) => {
    const storedData = localStorage.getItem("signupData");
  
    if (storedData) {
      const { email } = JSON.parse(storedData);
      if (email === data.email) {
        alert("User already exists! Please login.");
        navigate("/login"); // Redirect to login page
        return;
      }
    }
  
    localStorage.setItem("signupData", JSON.stringify(data));
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/login"); // Redirect to login page
    }, 2000);
  };

  return (
    <>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <h2>Signup</h2>

          <div className="form-group">
            <label>Name</label>
            <input type="text" {...register("name")} placeholder="Enter your name" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email")} placeholder="Enter your email" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} placeholder="Enter your password" />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label>Re-enter Password</label>
            <input type="password" {...register("rePassword")} placeholder="Re-enter your password" />
            {errors.rePassword && <p className="error">{errors.rePassword.message}</p>}
          </div>

          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="success-popup">
            <p>Signup Successful! Redirecting to login...</p>
          </div>
        )}
      </div>
    </>
  );
}
