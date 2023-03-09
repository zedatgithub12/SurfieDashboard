import React, { Component, useEffect } from 'react';

import "../App.css";
import Sidebar from "../components/Sidebar";
import { BrowserRouter as Router, Routes, Route,NavLink  } from "react-router-dom";
import { Customers } from "../pages/Customers";
import { Notifications } from "../pages/Notifications";
import { Users } from "../pages/Users";
import Support from "../pages/Support";
import Emaills from "../pages/Emaills";
import CustomerDetail from "../pages/CustomerDetail";
import CreateAccount from "../pages/CreateAccount";
import ChangePassword from "../pages/ChangePassword";
import Signin from "../pages/Signin";


const Navigations =()=> {
 
     return (
            <Router>
             <Sidebar /> 
             <p>Navigations</p>
              <Routes exact path="/">
                <Route path="/" element={<Signin />} />
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
              
              
            </Router>
          );
    }


export default Navigations;