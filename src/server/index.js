import axios from "axios";
const instance = axios.create({
  baseURL: "https://tq.lven.fun/",
  timeout: 3000,
  
});

export default instance;
