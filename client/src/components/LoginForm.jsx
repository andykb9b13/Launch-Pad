import React, { useState } from "react";

import Auth from '../utils/auth';
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginUser, {error}] = useMutation(LOGIN_USER);
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
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        try {
          const { data } = await loginUser({
            variables: { ...formData },
          });
          Auth.login(data.loginUser.token);
        } catch (err) {
          console.error(err);
          alert(err);
        }
        setFormData({
          username: "",
          email: "",
          password: "",
        });
    }
  };

  const handleClear = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setFormErrors({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center p-4'>
      <form className='border-4 border-[var(--lime)] rounded-lg flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6' onSubmit={handleSubmit}>
        <label className='text-[var(--red)] tracking-wider sm:text-2xl'> 
          Username : 
          <input placeholder=' username' className='bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2' type="text" name="username" value={formData.username} onChange={handleChange} />
          {formErrors.username && <span className="error">{formErrors.username}</span>}
        </label>
        <br />
        <label className='text-[var(--red)] tracking-wider sm:text-2xl'>
          Email :
          <input placeholder=' email' className='bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2' type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </label>
        <br />
        <label className='text-[var(--red)] tracking-wider sm:text-2xl'>
          Password :
          <input placeholder=' password' className='bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2' type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </label>
        <br />
        <div className='flex'>
        <button className='bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--lime)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center' type="submit">Sign In</button>
        <button className='bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--red)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center' type="button" onClick={ handleClear }>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;