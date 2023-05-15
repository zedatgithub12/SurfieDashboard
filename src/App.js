import React, { useEffect } from "react";

import "./App.css";
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
import { AuthContext } from "./components/Context";
import Home from "./pages/Home";
import ChapaDetail from "./pages/ChapaDetail";
import Partners from "./pages/partners";
import ViewPartner from "./pages/partners/viewpartners";

function App() {
  const [loged, setLoged] = React.useState(false);

  const authContext = React.useMemo(
    () => ({
      SignIn: async (user, token) => {
        try {
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(user));
          setLoged(true);
        } catch (e) {
          console.log(e);
        }
      },

      SignOut: async () => {
        localStorage.clear();
        setLoged(false);
      },

      getToken: async () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
      },

      getUser: async () => {
        const userString = localStorage.getItem("user");
        const userDetails = JSON.parse(userString);
        return userDetails;
      },
    }),
    []
  );

  useEffect(() => {
    var tokens = localStorage.getItem("token");

    if (tokens !== null) {
      setLoged(true);
    }
    return () => {};
  }, [loged]);

  return (
    <AuthContext.Provider value={authContext}>
      <Router>
        {loged ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/viewpartners" element={<ViewPartner />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Support />} />
            <Route path="/emails" element={<Emaills />} />
            <Route path="/customerdetail" element={<CustomerDetail />} />
            <Route path="/chapadetail" element={<ChapaDetail />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/login" element={<Signin />} />
          </Routes>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
