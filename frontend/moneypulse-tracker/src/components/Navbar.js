import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Navbar() {
  // Check if the user is signed in
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the user token from storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-5 items-center bg-[#0d0d0d]/90 text-zinc-300 border-b border-zinc-700 shadow-2xl shadow-zinc-800">
      <h1 className="text-4xl font-bold logo">MoneyPulse</h1>
      <ul className="flex gap-5">
        {/* using interpolation to render the if conditional. If users is signed in, render Home, Dashboard, and sign out button. if not, render Home, Login, and Signup nav links */}
        {isUserSignedIn ? (
          <>
            <li className="translate-y-2">
              <Link to="/">Home</Link>
            </li>
            <li className="translate-y-2">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Button variant="outlined" onClick={handleSignOut}>
                Sign Out
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
