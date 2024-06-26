import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import GuideCarsChart from "../components/GuideCarsChart";
import GuideEntranceExit from "../components/GuideEntranceExit";
import GuideLicensePlate from "../components/GuideLicensePlate";
import GuideParkingSpace from "../components/GuideParkingSpace";

const HowToUsePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
        try {
          const authToken = localStorage.getItem("token");
          if (!authToken) {
            // Redirect to login page if token is missing
            navigate("/login")
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
            navigate("/login")
          } else {
            // Other error occurred, log it
            localStorage.removeItem("token");
            navigate("/login")
            console.error("Error fetching user data:", error);
          }
        }
      };
      

    getUsers();
  }, []);

  const [currentView, setCurrentView] = useState('cards'); // Manage current view state

  const handleReadMore = (view) => {
    setCurrentView(view); // Set the current view to the selected component
  };

  const handleBack = () => {
    setCurrentView('cards'); // Set the view back to cards overview
  };



  return (
    <>
      <Navbar />
      {currentView !== 'cards' && (
        <div className="flex justify-start ml-6 mt-4">
          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      )}
      <div className="text-center text-5xl mb-5">
        {currentView === 'cards' && <h1 className="mt-10 mb-5">Guide</h1>}
        {currentView === 'cards' ? (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-[1000px]">
              {/* Cars Chart Card */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto text-left flex flex-col justify-between h-full">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">Cars Chart</div>
                  <p className="text-gray-700 text-base">
                    This page shows a graph of the number of cars in the parking lot each day.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2 mb-3">
                  <button
                    onClick={() => handleReadMore('GuideCarsChart')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Read More
                  </button>
                </div>
              </div>

              {/* Parking Space Card */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto text-left flex flex-col justify-between h-full">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">Parking Space</div>
                  <p className="text-gray-700 text-base">
                    This page shows the number of available parking spaces and has a capture of the parking space at that time.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2 mb-3">
                  <button
                    onClick={() => handleReadMore('GuideParkingSpace')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Read More
                  </button>
                </div>
              </div>

              {/* License Plate Card */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto text-left flex flex-col justify-between h-full">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">License Plate</div>
                  <p className="text-gray-700 text-base">
                    This page shows a list of license plate registrations that are registered in the database.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2 mb-3">
                  <button
                    onClick={() => handleReadMore('GuideLicensePlate')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Read More
                  </button>
                </div>
              </div>

              {/* Entrance Exit Card */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto text-left flex flex-col justify-between h-full">
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">Entrance Exit</div>
                  <p className="text-gray-700 text-base">
                    This page shows a list of history entry and exit in the parking lot.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2 mb-3">
                  <button
                    onClick={() => handleReadMore('GuideEntranceExit')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10">
            {currentView === 'GuideCarsChart' && <GuideCarsChart />}
            {currentView === 'GuideParkingSpace' && <GuideParkingSpace />}
            {currentView === 'GuideLicensePlate' && <GuideLicensePlate />}
            {currentView === 'GuideEntranceExit' && <GuideEntranceExit />}
          </div>
        )}
      </div>
    </>
  );
};

export default HowToUsePage;
