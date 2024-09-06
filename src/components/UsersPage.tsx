import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const UsersPage: React.FC = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user") !== null;
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const ciphertext = localStorage.getItem("user");
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setUser(JSON.parse(originalText));
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      "secret key 123"
    ).toString();
    localStorage.setItem("user", ciphertext);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div>
          <label style={{ color: "white", fontSize: "18px", padding: "10px" }}>
            {" "}
            <b>Email:</b>{" "}
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{
              margin: "10px",
              padding: "5px",
              fontSize: "16px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          />
        </div>
      ) : (
        <p style={{ color: "white", padding: "10px", fontSize: "18px" }}>
          <b>Email</b>: {user.email}
        </p>
      )}
      {editing ? (
        <button
          onClick={handleSave}
          style={{ backgroundColor: "green", color: "white", padding: "10px" }}
        >
          Guardar
        </button>
      ) : (
        <button
          onClick={handleEdit}
          style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
        >
          Editar
        </button>
      )}
    </div>
  );
};

export default UsersPage;
