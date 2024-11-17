import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Update with your backend URL

const getMedications = async () => {
  const response = await axios.get(`${API_BASE_URL}/pharmacy/medications/`);
  return response.data;
};

const requestRefill = async (medicationId, quantity) => {
  const response = await axios.post(
    `${API_BASE_URL}/pharmacy/refill_requests/`,
    {
      medication: medicationId,
      quantity,
    }
  );
  return response.data;
};

export { getMedications, requestRefill };
