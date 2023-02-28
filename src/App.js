import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers } from "./pages/Customers";
import { Notifications } from "./pages/Notifications";
import { Users } from "./pages/Users";
import Support from "./pages/Support";
function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;
