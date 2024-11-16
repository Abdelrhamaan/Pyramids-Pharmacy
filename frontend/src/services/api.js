import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/pharmacy"; // Update with your backend URL

const getMedications = async () => {
  const response = await axios.get(`${API_BASE_URL}/medications/`);
  return response.data;
};

const requestRefill = async (medicationId, quantity) => {
  const response = await axios.post(`${API_BASE_URL}/refill_requests/`, {
    medication: medicationId,
    quantity,
  });
  return response.data;
};

export { getMedications, requestRefill };
