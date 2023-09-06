import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import axios from "axios";

function Login() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/users/register", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {})
      .catch((error) => {
        console.log("Unable to fetch user expenses");
      });
  };

  // Handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    // Main Parent div
    <div className="w-full h-[415px] md:flex flex-col md:flex-row md:w-full md:h-screen ">
      {/* Left Div */}
      <div className="md:w-[50%] h-[100%] ">
        <img
          className="w-[100%] h-[100%] object-top-[10px] object-cover md:w-[100%] md:h-screen md:object-cover"
          src="https://images.unsplash.com/photo-1583512603834-01a3a1e56241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG1vbmV5fGVufDB8MXwwfHx8Mg%3D%3D&auto=format&fit=crop&w=800&q=60"
        />
      </div>
      {/* Right */}
      <div className="h-[100%] md:w-[50%] md:h-[100%] flex flex-col bg-zinc-200 ">
        <FormControl
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="h-[100%]  md:w-[100%] md:h-[100%] flex flex-col justify-center items-center "
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl p-7 font-bold logo">LOGIN</h2>

          <TextField
            required
            id="outlined-Username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="outlined" type="submit">
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default Login;
