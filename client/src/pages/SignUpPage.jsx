import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import "../styles/login.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUser, { error }] = useMutation(ADD_USER);
  // Incase we want to change navBar to not show login/signup when logged in
  const [validated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = "Please enter your username";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await createUser({
          variables: { ...formData },
        });
        Auth.login(data.addUser.token);
        alert("Account created!");
      } catch (err) {
        console.error(err);
        alert(err);
      }
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleClear = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="outerContainer w-full h-screen flex justify-center flex-col items-center p-4">
      <h1 className="fade-in-box">Sign Up</h1>
      <form
        className="signUpForm login-border padding-20 fade-in-box"
        onSubmit={handleSubmit}
      >
        <label className="tracking-wider sm:text-2xl">
          Username:
          <br />
          <input
            placeholder=" username"
            className="my-2 p-2 border-2 rounded-lg"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}
        </label>
        <br />
        <label className="tracking-wider sm:text-2xl">
          Email:
          <br />
          <input
            placeholder=" email"
            className="my-2 p-2 border-2 rounded-lg"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </label>
        <br />
        <label className="tracking-wider sm:text-2xl">
          Password:
          <br />
          <input
            placeholder=" password"
            className="my-2 p-2 border-2 rounded-lg"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </label>
        <br />
        <label className="tracking-wider sm:text-2xl">
          Confirm Password:
          <br />
          <input
            placeholder=" password"
            className="my-2 p-2 border-2 rounded-lg"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && (
            <span className="error">{formErrors.confirmPassword}</span>
          )}
        </label>
        <br />
        <div className="flex space-evenly gap-10">
          <button
            className="button-background button-background:hover border-2 rounded-lg px-10 py-3 my-2 mx-auto flex flex-center"
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="button-background button-background:hover border-2 rounded-lg px-10 py-3 my-2 mx-auto flex flex-center"
            type="button"
            onClick={handleClear}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
