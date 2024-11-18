import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import NavBar from "../components/navbar/NavBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // <-- Import ArcElement for Pie/Doughnut
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../components/authcontext/AuthContext";
import { useNavigate } from "react-router-dom";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // <-- Register ArcElement for Pie/Doughnut charts
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [refillStats, setRefillStats] = useState([]);
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL =
    window.ENV?.REACT_APP_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;
  console.log("base_url", API_BASE_URL);
  console.log("window.ENV", window.ENV);
  console.log(
    "process.env.REACT_APP_API_BASE_URL",
    process.env.REACT_APP_API_BASE_URL
  );
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchRefillStats = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/pharmacy/refill-stats/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRefillStats(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        } else {
          console.error("Error fetching refill stats:", error);
        }
      }
    };

    fetchRefillStats();
  }, [accessToken, navigate, logout]);

  // Prepare the data for the chart
  const chartData = {
    labels: refillStats.map((stat) => stat.medication__name), // Medication names
    datasets: [
      {
        label: "Refill Requests",
        data: refillStats.map((stat) => stat.total), // Total refill count for each medication
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar chart color (you will override this later)
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Refill Requests per Medication",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} Refill(s)`;
          },
        },
      },
    },
  };

  const pieColors = ["#FF6384", "#36A2EB", "#FFCE56"];
  const doughnutColors = ["#FF5733", "#33FF57", "#3357FF"];
  const barColors = ["#FF5733", "#33FF57", "#3357FF"];

  // Update chart data with different colors for each chart
  const updatedBarData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        backgroundColor: barColors, // Bar chart colors
      },
    ],
  };

  const updatedPieData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        backgroundColor: pieColors, // Pie chart colors
      },
    ],
  };

  const updatedDoughnutData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        backgroundColor: doughnutColors, // Doughnut chart colors
      },
    ],
  };

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard - Refill Requests
        </Typography>

        {/* Wrapper for Pie and Doughnut charts */}
        <Box
          display="flex"
          justifyContent="space-between" // Space them out horizontally
          width="100%"
          mt={4}
        >
          {/* Pie chart */}
          <Box width="45%" height="600px">
            {" "}
            {/* Increased height for Pie */}
            <Pie
              data={updatedPieData}
              options={chartOptions}
              width="100%"
              height="100%"
            />
          </Box>

          {/* Doughnut chart */}
          <Box width="45%" height="600px">
            {" "}
            {/* Increased height for Doughnut */}
            <Doughnut
              data={updatedDoughnutData}
              options={chartOptions}
              width="100%"
              height="100%"
            />
          </Box>
        </Box>

        {/* Bar chart under Pie and Doughnut charts */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          ml={20}
          width="70%"
          height="100%"
        >
          <Bar
            data={updatedBarData}
            options={chartOptions}
            width="60%"
            height="30%"
          />
        </Box>
      </Box>
    </>
  );
}
