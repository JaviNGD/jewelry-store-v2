import axios from "axios";

// Set the base URL for the axios requests based on the environment (development or production) 
// if the environment is development, the base URL is set to "http://localhost:5000"
// if the environment is production, the base URL is set to "/"
axios.defaults.baseURL = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "/";