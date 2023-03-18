import React from 'react';
import {useNavigate} from 'react-router-dom';



export default function AuthUser() {
    const navigate = useNavigate();
    const getToken =()=>{
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken;
    }

    const getUser =()=>{
      const userString = sessionStorage.getItem('user');
      const userDetails = JSON.parse(userString);
      return userDetails;
    }


  const [token, setToken] = React.useState(getToken());
  const [user, setUser] = React.useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate('/customers');
  }

  const logout =()=>{
    sessionStorage.clear();
    navigate('/login');
  }


  return {
    setToken: saveToken,
    token, 
    user,
    getToken,
    logout,
   };
}
