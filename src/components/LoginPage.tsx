import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "../../src/styles/LoginPage.scss";
import reactLogo from "../assets/react.svg";
import { useStore } from "../state/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useStore(); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/products";
    }
  }, []);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    return re.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email no válido");
      return;
    }
    if (!validatePassword(password)) {
      setError("Contraseña no válida");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    if (email !== 'test@factumex.com' || password !== 'Factumex1!') {
      setError("Correo electrónico o contraseña incorrectos");
      return;
    }
  
    login(); 
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify({ email, password }),
      "secret key 123"
    ).toString();
    localStorage.setItem("user", ciphertext);
    
    window.location.href = "/products";
  };

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }, 5 * 60 * 1000); 

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      setTimeout(() => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }, 5 * 60 * 1000); 
    };

    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
    };
  }, []);

  return (
    <>
      <a href="">
        <img
          src={reactLogo}
          className="logo react img-default"
          alt="React logo"
        />
      </a>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          autoComplete="off"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          autoComplete="off"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          autoComplete="off"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default LoginPage;