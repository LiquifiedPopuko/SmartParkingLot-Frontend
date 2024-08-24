import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const columns = [
  {
    name: "Times",
    selector: (row) => row.times,
    sortable: true,
  },
  {
    name: "Busy spots",
    selector: (row) => row.busySpots,
    sortable: true,
  },
  {
    name: "Total spots",
    selector: (row) => row.totalSpots,
    sortable: true,
  },
  {
    name: "Images",
    cell: (row) => (
      <a href={row.imageSource} target="_blank" className="text-blue-700">
        Images
      </a>
    ),
    selector: (row) => row.imageSource,
  },
];

const downloadCSV = (data) => {
  const csvContent = [
    ["Times", "Busy spots", "Total spots", "Image"],
    ...data.map((row) => [row.times, row.busySpots, row.totalSpots, row.imageSource]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  // Add BOM to support UTF-8
  const bom = "\uFEFF";
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "Parking_Space.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Export = ({ onExport }) => (
  <button onClick={onExport} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
    Export CSV
  </button>
);

Export.propTypes = {
  onExport: PropTypes.func.isRequired,
};

function TableListParkingSpace() {
  const [optionList, setOptionList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [avgBusySpots, setAvgBusySpots] = useState(0);
  const [maxBusySpotTime, setMaxBusySpotTime] = useState("-");
  const [minBusySpotTime, setMinBusySpotTime] = useState("-");
  const [recordData, setRecordData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/detection")
      .then((response) => {
        const result = response.data;
        setOptionList(result);
        setRecordData(result);
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
    setData([]);
    setAvgBusySpots(0);
    setMaxBusySpotTime("-");
    setMinBusySpotTime("-");
  };

  const handleButtonClick = () => {
    if (selectedDate) {
      const selectedData = optionList.filter(
        (entry) => entry.detection_date.substring(0, 10) === selectedDate
      );

      const processedData = selectedData.map((entry) => {
        const time = entry.detection_date.substring(11, 16); // Extract HH:MM from detection_date
        return {
          times: time,
          busySpots: entry.no_of_cars,
          totalSpots: entry.no_of_empty,
          imageSource: entry.image_source,
        };
      });

      setData(processedData);

      // Calculate average busy spots, max busy spot time, and min busy spot time
      const totalBusySpots = processedData.reduce(
        (total, entry) => total + entry.busySpots,
        0
      );
      const averageBusySpots = totalBusySpots / processedData.length;

      let maxBusySpot = -Infinity;
      let minBusySpot = Infinity;
      let maxTime = "";
      let minTime = "";

      processedData.forEach((entry) => {
        if (entry.busySpots > maxBusySpot) {
          maxBusySpot = entry.busySpots;
          maxTime = entry.times;
        }
        if (entry.busySpots < minBusySpot) {
          minBusySpot = entry.busySpots;
          minTime = entry.times;
        }
      });

      setAvgBusySpots(averageBusySpots);
      setMaxBusySpotTime(maxTime);
      setMinBusySpotTime(minTime);
    } else {
      setData([]);
      setAvgBusySpots(0);
      setMaxBusySpotTime("-");
      setMinBusySpotTime("-");
    }
  };

  const handleFilter = (e) => {
    const filterData = recordData.filter((row) =>
      row.times.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.busySpots.toString().includes(e.target.value) ||
      row.totalSpots.toString().includes(e.target.value)
    );
    setData(filterData);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#98FB98",
        fontSize: "15px",
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        color: "#333",
        textAlign: "center",
        borderRight: "none", // remove the right border of the last cell
      },
    },
  };

  return (
    <>
      <div className="mb-5 mt-5"></div>
      <div className="grid grid-cols-2 h-[909px]">
        <div className="ml-5">
          <div className="flex justify-between mb-5 pb-5 items-center border-b border-gray-200">
            <h2 className="text-xl">Parking Space</h2>
            {data.length > 0 && (
              <div className="flex items-center space-x-2">
                <Export onExport={() => downloadCSV(data)} />
                <input
                  type="text"
                  onChange={handleFilter}
                  placeholder="Search..."
                  className="border-2 border-blue-500 rounded-md p-2 text-sm"
                />
              </div>
            )}
          </div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            noDataComponent="There are no records to display"
          />
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="w-[500px] bg-white p-8 rounded-lg border-2 border-gray-950">
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
                Average busy spots today:{" "}
                <span className="text-blue-500">
                  {avgBusySpots.toFixed(2)}
                </span>
              </h2>
              <p className="text-lg font-bold mb-2 text-gray-800">
                Most busy spot at:{" "}
                <span className="text-blue-500">{maxBusySpotTime}</span>
              </p>
              <p className="text-lg font-bold mb-2 text-gray-800">
                Least busy spot at:{" "}
                <span className="text-blue-500">{minBusySpotTime}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableListParkingSpace;
