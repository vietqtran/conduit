import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormFieldset from "../../FormFieldset";
import { useAuth } from "../../../context/AuthContext";
import userLogin from "../../../services/userLogin";

function LoginForm({ onError }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await userLogin(form);
      if (authData) {
        setAuthState(authData);
        navigate("/");
      } 
    } catch (error) {
      const errorMessage = error.message || "An error occurred during login";
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
          type="email"
          name="email"
          required
          placeholder="Email"
          value={form.email}
          handler={inputHandler}
          autoFocus
        />
        <FormFieldset
          name="password"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          handler={inputHandler}
          minLength="5"
        />
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;