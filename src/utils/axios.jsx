import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZmODI3N2U0NjJiYmNiMTBjNzVkOWVmOGNlM2VlYiIsInN1YiI6IjY2MzI4ZTgzODEzY2I2MDEyNDg2N2EwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PXjxBfxpJfqtXe1VlSh0oxNzSr8eQQhT12Iov8GXEEY",
  },
});

export default instance;
