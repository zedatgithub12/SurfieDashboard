import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers } from "./pages/Customers";
import { Notifications } from "./pages/Notifications";
import { Users } from "./pages/Users";
import Support from "./pages/Support";
import Terminated from "./pages/Terminated";
import Active from "./pages/Active";
import Pending from "./pages/Pending";
import Expired from "./pages/Expired";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
        <Route path="/active" element={<Active/>}/>
        <Route path="/pending" element={<Pending/>}/>
        <Route path="/expired" element={<Expired/>}/>
        <Route path="/terminal" element={<Terminated/>}/>
      </Routes>
    </Router>
  );
}

export default App;
