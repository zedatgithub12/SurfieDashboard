import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./components/Context";
import MainRoute from "./Routes";
import Auths from "./Routes/Auths";

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
      <Router>{loged ? <MainRoute /> : <Auths />}</Router>
    </AuthContext.Provider>
  );
}

export default App;
