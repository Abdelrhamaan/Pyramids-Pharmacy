import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/accounts/login/",
        {
          email,
          password,
        }
      );
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#e0f7fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Please login to continue
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "1.5rem",
              padding: "0.8rem",
              fontSize: "1rem",
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "1.5rem" }}
        >
          Don't have an account?{" "}
          <MuiLink href="/signup" variant="body2" color="primary">
            Sign up here
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
}
