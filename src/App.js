import React, { useEffect, useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers } from "./pages/Customers";
import { Notifications } from "./pages/Notifications";
import { Users } from "./pages/Users";
import Support from "./pages/Support";
import Emaills from "./pages/Emaills";
import CustomerDetail from "./pages/CustomerDetail";
import CreateAccount from "./pages/CreateAccount";
import ChangePassword from "./pages/ChangePassword";
import Signin from "./pages/Signin";

// (function () {

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }

//         form.classList.add('was-validated')
//       }, false)
//     })
// })()

function App() {
  const getToken = sessionStorage.getItem("token");

  useEffect(() => {
  
  }, [getToken]);

  return (
    <Router>
      {getToken ? (
        <div>
        
          <Routes exact path="/">
          
            <Route path="/login" element={<Signin />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Support />} />
            <Route path="/emails" element={<Emaills />} />
            <Route path="/customerdetail" element={<CustomerDetail />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </div>
      ) : (
        <Signin />
      )}
    </Router>
  );
}

export default App;
