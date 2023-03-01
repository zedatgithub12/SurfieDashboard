import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Customers } from "./pages/Customers";
import { Notifications } from "./pages/Notifications";
import { Users } from "./pages/Users";
import Support from "./pages/Support";
import Emaills from "./pages/Emaills";



function App() {
  return (
    <Router>
      <Sidebar />
      <Routes exact path="/customers">
      
        <Route path="/customers" element={<Customers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
        <Route path="/emails" element={<Emaills />} />

      </Routes>
    </Router>
  );
}

export default App;
