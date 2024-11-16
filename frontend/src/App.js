import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import CreateBook from "./components/book/CreateBook";
import MedicationList from "./components/medications/MedicationList";
import Dashboard from "./pages/RefillDashboard";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import NavBar from "./components/navbar/NavBar";
import CreateMedicine from "./components/medications/CreateMedicine";

import { Box } from "@mui/material";
import Register from "./components/register/Register";
import { AuthProvider } from "./components/authcontext/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="medications"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <MedicationList />
              </Box>
            }
          />
          <Route
            path="/medicines/create"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <CreateMedicine />
              </Box>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <Dashboard />
              </Box>
            }
          />

          <Route path="login/" element={<Login />} />
          <Route path="logout/" element={<Logout />} />
          <Route path="signup/" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
