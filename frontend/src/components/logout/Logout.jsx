import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Are you sure you want to log out?
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
}
