// src/pages/Login.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Usuario o contraseña incorrectos ❌");
      console.error(error);
    } else {
      setErrorMsg("");
      navigate("/dashboard"); 
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>Login con Supabase</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "200px" }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "200px" }}
          />

          <button type="submit">Entrar</button>
        </form>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </div>
  );
}