// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// Proxy endpoint to handle CORS issues
app.post("/api/shorten", async (req, res) => {
  try {
    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      req.body
    );
    res.json(response.data); // Forward the response from CleanURI to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server running on http://localhost:${port}`);
});
