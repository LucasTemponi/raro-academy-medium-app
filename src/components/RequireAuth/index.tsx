import {useState,useEffect} from 'react'
import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom';

export const RequireAuth: React.FC = () => {

    const [isAuthenticated, setAuthenticated] = useState(true);

    useEffect(() => {
      setAuthenticated(localStorage.getItem("access_token") !== null);
    }, []);
  
    if (!isAuthenticated) {
      return <Navigate to="/" />
    }
  
    return <Outlet />;
  }