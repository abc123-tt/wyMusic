import axios from "axios";
const instance = axios.create({
  baseURL: "https://tq.lven.online/",
  // https://tq.lven.online/ 
  // http://localhost:3000
  timeout: 3000,
});

export default instance;


