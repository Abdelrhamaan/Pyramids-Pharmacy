import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Pagination,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../authcontext/AuthContext";
import NavBar from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";

export default function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refillSuccess, setRefillSuccess] = useState("");
  const [quantities, setQuantities] = useState({}); // Store quantities for each medication

  const itemsPerPage = 5; // Adjust as needed
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchMedications = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/pharmacy/medications/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setMedications(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token might be expired or invalid, logout user
          logout();
        } else {
          console.error("Error fetching medications:", error);
        }
      }
    };

    fetchMedications();
  }, [page, accessToken, navigate, logout]);

  const handleRefill = async (medication) => {
    const quantity = quantities[medication.id] || 1; // Default to 1 if no quantity is specified
    try {
      await axios.post(
        `http://127.0.0.1:8000/pharmacy/refill-request/`,
        { medication: medication.id, quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const totalPrice = (medication.price * quantity).toFixed(2); // Calculate total price
      setRefillSuccess(
        `Refill requested successfully! ${quantity} x ${medication.name} for $${totalPrice}.`
      );

      // Clear the quantity input for this medication
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [medication.id]: "",
      }));
    } catch (error) {
      console.error("Error requesting refill:", error);
      setRefillSuccess("Failed to request refill.");
    }
  };

  const handleQuantityChange = (medicationId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicationId]: value,
    }));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Medication List
        </Typography>
        {refillSuccess && (
          <Typography
            variant="body1"
            align="center"
            color={refillSuccess.includes("successfully") ? "green" : "red"}
            gutterBottom
          >
            {refillSuccess}
          </Typography>
        )}
        <Grid container spacing={2}>
          {medications.map((medication) => (
            <Grid item xs={12} sm={6} key={medication.id}>
              <Box
                border={1}
                borderRadius={2}
                padding={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">{medication.name}</Typography>
                <Typography variant="body2">
                  {medication.description}
                </Typography>
                <Typography variant="body2">${medication.price}</Typography>
                <TextField
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={quantities[medication.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(medication.id, e.target.value)
                  }
                  sx={{ marginTop: 1, width: "50%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRefill(medication)}
                  sx={{ marginTop: 1 }}
                >
                  Request Refill
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Box>
      </Box>
    </>
  );
}
