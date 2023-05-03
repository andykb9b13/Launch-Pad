import React, { useState } from "react";

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = "Please enter your name";
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
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        console.log(event, "this is form data");
      // Handle form submission logic here
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
    <div>
      <h1>User SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {formErrors.username && <span className="error">{formErrors.username}</span>}
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
        </label>
        <br />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={ handleClear }>Cancel</button>
      </form>
    </div>
  );
}

export default SignUp;
