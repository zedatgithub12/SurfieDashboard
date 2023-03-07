import axios from "axios";

export default function AuthUser() {
    
  var http = axios.create({
    baseUrl: "http://127.0.0.1:8000/api",
    headers: {
        Accept: "application.json",
      "Content-Type": "application/json",
    },
  });
  return { http };
}
