
import axios from "axios";
import Navbar from "../components/Navbar"
import TableListParkingSpace from "../components/TableListParkingSpace"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function NumberParkingPage()
{
  const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
              const authToken = localStorage.getItem("token");
              if (!authToken) {
                // Redirect to login page if token is missing
                navigate("/admin");
                return;
              }
              const response = await axios.get("http://13.214.18.38:8000/api/auth", {
                headers: {
                  Authorization: `Bearer ${authToken}` // Fix: Added space after 'Bearer'
                }
              })
              console.log("user data", response.data);
              console.log(authToken);
            } catch (error) {
              // Handle errors
              console.log("error", error);
              if (error.response && error.response.status === 401) {
                // Token is invalid or expired, remove token from localStorage and redirect to login page
                localStorage.removeItem("token");
                navigate("/admin");
              } else {
                // Other error occurred, log it
                localStorage.removeItem("token");
                navigate("/admin");
                console.error("Error fetching user data:", error);
              }
            }
          };
          
    
        getUsers();
      }, []);
    return(
        <>
           <Navbar/>
           <TableListParkingSpace/>
        </>

    )
}

export default NumberParkingPage