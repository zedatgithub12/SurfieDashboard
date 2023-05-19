import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";
const Auths = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
};

export default Auths;
