import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function CarsChart() {
  const [option, setOption] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: []
    }
  });

  const [serie, setSerie] = useState([
    {
      name: "cars",
      data: []
    }
  ]);

  const [avgCars, setAvgCars] = useState(0);
  const [maxCarsHours, setMaxCarsHours] = useState("-");
  const [minCarsHours, setMinCarsHours] = useState("-");
  const [optionList, setOptionList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchData = () => {
    axios
      .get("https://10.0.28.18:8001/api/detection")
      .then((response) => {
        const result = response.data;
        setOptionList(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setAvgCars(0);
    setMaxCarsHours("-");
    setMinCarsHours("-");
  };

  const handleButtonClick = () => {
    if (selectedDate) {
      const selectedDateObject = optionList.filter(
        (day) => day.detection_date.split("T")[0] === selectedDate
      );
  
      if (selectedDateObject.length > 0) {
        const hourlyData = {};
  
        selectedDateObject.forEach((entry) => {
          // Extract the hour portion directly from the string without any date conversion
          const hour = entry.detection_date.split("T")[1].substring(0, 2) + ":00";
          if (!hourlyData[hour]) {
            hourlyData[hour] = 0;
          }
          hourlyData[hour] += entry.no_of_cars;
        });
  
        // Get sorted hours
        const hours = Object.keys(hourlyData).sort((a, b) => a.localeCompare(b));
        const cars = hours.map((hour) => hourlyData[hour]);
  
        setOption({
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: hours
          }
        });
  
        setSerie([
          {
            name: "cars",
            data: cars
          }
        ]);
  
        const totalCars = cars.reduce((total, amount) => total + amount, 0);
        const averageCars = totalCars / cars.length;
  
        const maxCars = Math.max(...cars);
        const minCars = Math.min(...cars);
        const maxTimes = hours.filter((hour, index) => cars[index] === maxCars);
        const minTimes = hours.filter((hour, index) => cars[index] === minCars);
  
        setAvgCars(averageCars);
        setMaxCarsHours(maxTimes.join(", "));
        setMinCarsHours(minTimes.join(", "));
      } else {
        setAvgCars(0);
        setMaxCarsHours("-");
        setMinCarsHours("-");
      }
    } else {
      setAvgCars(0);
      setMaxCarsHours("-");
      setMinCarsHours("-");
    }
  };
  

  return (
    <>
      <div className="grid grid-cols-2 mt-10">
        <div className="bg-gray-100 p-5 rounded-lg ml-10">
          <Chart options={option} series={serie} type="bar" />
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="w-[500px] bg-white p-8 rounded-lg border-2 border-gray-950 ">
            <div className="inline-block relative w-64">
              <input
                type="date"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ml-5"
              onClick={handleButtonClick}
              disabled={!selectedDate}
            >
              Select Date
            </button>
            <div className="mt-5 p-5 border-t border-gray-200">
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Average cars today:{" "}
                <span className="text-blue-500">{avgCars.toFixed(2)}</span>
              </h2>
              <p className="text-lg font-bold mb-2 text-gray-800">
                Most cars at:{" "}
                <span className="text-blue-500">{maxCarsHours}</span>
              </p>
              <p className="text-lg font-bold mb-2 text-gray-800">
                Least cars at:{" "}
                <span className="text-blue-500">{minCarsHours}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarsChart;
