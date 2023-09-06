import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import axios from "axios";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/users/register").then((res) => {
      setUsers("");
    });
  };

  // Handle Sign Up Form
  const handleSignup = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/register", {
        email,
        username,
        password,
      })
      .then(() => {
        setEmail("");
        setUsername("");
        setPassword("");
        fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  return (
    // Main Parent div
    <div className="w-full h-[415px] md:flex flex-col md:flex-row md:w-full md:h-screen">
      {/* Left div */}
      <div className="md:w-[50%] h-[100%]  ">
        <img
          className="w-[100%] h-[100%] object-top-[10px] object-cover md:w-[100%] md:h-screen md:object-cover"
          src="https://images.unsplash.com/photo-1583512603834-01a3a1e56241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fG1vbmV5fGVufDB8MXwwfHx8Mg%3D%3D&auto=format&fit=crop&w=800&q=60"
        />
      </div>
      {/* Right div */}
      <div className="h-[100%] md:w-[50%] md:h-[100%] flex flex-col bg-zinc-200  ">
        <FormControl
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="h-[100%] md:w-[100%] md:h-[100%] flex flex-col justify-center items-center "
          onSubmit={handleSignup}
        >
          <h2 className="text-4xl p-7 font-bold logo">SIGN UP</h2>
          <TextField
            required
            id="outlined-Email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            Sign Up
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default SignUp;
