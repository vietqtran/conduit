import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import userSignUp from "../../../services/userSignUp";

function SignUpForm({ onError }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await userSignUp(form);
      if (authData) {
        setAuthState(authData);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred during sign up";
      onError(errorMessage);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormFieldset
          name="username"
          required
          placeholder="Your Name"
          value={form.username}
          handler={inputHandler}
        />
        <FormFieldset
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          handler={inputHandler}
        />
        <FormFieldset
          name="password"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          handler={inputHandler}
        />
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;