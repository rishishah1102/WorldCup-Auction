import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://auction-backend-worldcup.vercel.app/",
});

export default instance;
