import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const Export = ({ onExport }) => (
  <button
    onClick={onExport}
    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
  >
    Export CSV
  </button>
);

Export.propTypes = {
  onExport: PropTypes.func.isRequired,
};

function downloadCSV(data, licenses, showUnknown) {
  if (showUnknown) {
    // Exporting the Unknown Licenses data
    const csv = data.map((row) => ({
      Date: new Date(row.access_date).toLocaleString("en-GB", {
        timeZone: "UTC",
      }),
      "License Number": row.license_number || "Unknown",
      Image: row.image_source,
    }));

    const csvContent = [
      ["Date", "License Number", "Image"],
      ...csv.map((row) => [row.Date, row["License Number"], row.Image]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    exportToCSV(csvContent, "unknown_licenses.csv");
  } else {
    // Exporting the Entrance Exit data
    const csv = data.map((row) => ({
      Date: new Date(row.access_date).toLocaleString("en-GB", {
        timeZone: "UTC",
      }),
      "License plate number": getLicensePlateNumber(row, licenses),
      Status:
        row.access_type === 1
          ? "In"
          : row.access_type === 2
          ? "Out"
          : "Don't Know",
      Images: row.image_source,
    }));

    const csvContent = [
      ["Date", "License plate number", "Status", "Images"],
      ...csv.map((row) => [
        row.Date,
        row["License plate number"],
        row.Status,
        row.Images,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    exportToCSV(csvContent, "entrance_exit.csv");
  }
}

// Helper function to handle the actual export to CSV
function exportToCSV(csvContent, fileName) {
  const bom = "\uFEFF"; // Add BOM to support UTF-8
  const blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getLicensePlateNumber(row, licenses) {
  const license = licenses.find((lic) => lic.id === row.license_id);
  return license ? license.license_number || "" : "Unknown"; // If license number is null or undefined, replace with an empty string
}

function TableListEntranceExit() {
  const [data, setData] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnknown, setShowUnknown] = useState(false);
  const [unknownData, setUnknownData] = useState([]);

  const fetchHistoryData = useCallback(() => {
    axios
      .get("https://10.0.28.18:8001/api/history")
      .then((response) => {
        setData(response.data);
        if (!searchTerm) {
          setFilteredData(response.data);
        } else {
          applyFilter(response.data, searchTerm);
        }
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
      });
  }, [searchTerm]);

  const fetchLicenseData = useCallback(() => {
    axios
      .get("https://10.0.28.18:8001/api/licensePlates")
      .then((response) => {
        setLicenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching license data:", error);
      });
  }, []);

  const fetchUnknownData = useCallback(() => {
    axios
      .get("https://10.0.28.18:8001/api/getAllUnknown")
      .then((response) => {
        setUnknownData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching unknown license data:", error);
      });
  }, []);

  useEffect(() => {
    fetchHistoryData();
    fetchLicenseData();
    fetchUnknownData();

    const intervalId = setInterval(() => {
      fetchHistoryData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchHistoryData, fetchLicenseData, fetchUnknownData]);

  useEffect(() => {
    const updatedColumns = showUnknown
      ? [
          {
            name: "Date",
            selector: (row) =>
              new Date(row.access_date).toLocaleString("en-GB", {
                timeZone: "UTC",
              }),
            sortable: true,
          },
          {
            name: "License Number",
            selector: (row) => row.license_number || "Unknown",
            sortable: true,
          },
          {
            name: "Image",
            cell: (row) => (
              <a
                href={row.image_source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                Image
              </a>
            ),
            ignoreRowClick: true,
          },
        ]
      : [
          {
            name: "Date",
            selector: (row) =>
              new Date(row.access_date).toLocaleString("en-GB", {
                timeZone: "UTC",
              }),
            sortable: true,
          },
          {
            name: "License plate number",
            selector: (row) => getLicensePlateNumber(row, licenses),
            sortable: true,
          },
          {
            name: "Status",
            selector: (row) => {
              switch (row.access_type) {
                case 1:
                  return "In";
                case 2:
                  return "Out";
                default:
                  return "Don't Know";
              }
            },
            sortable: true,
          },
          {
            name: "Images",
            cell: (row) => (
              <a
                href={row.image_source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                Images
              </a>
            ),
            ignoreRowClick: true,
          },
        ];

    setColumns(updatedColumns);
  }, [licenses, showUnknown]);

  const applyFilter = (data, term) => {
    const filteredResult = data.filter((row) => {
      const formattedDate = new Date(row.access_date)
        .toLocaleString("en-GB", { timeZone: "UTC" })
        .toLowerCase()
        .trim();
      const licensePlate = getLicensePlateNumber(row, licenses).toLowerCase();
      const status =
        row.access_type === 1
          ? "in"
          : row.access_type === 2
          ? "out"
          : "don't know";

      return (
        formattedDate.includes(term) ||
        licensePlate.includes(term) ||
        status.includes(term)
      );
    });

    setFilteredData(filteredResult);
  };

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearchTerm(term);
    applyFilter(data, term);
  };

  const actions = (
    <div className="flex items-center space-x-2">
      <Export
        onExport={() => downloadCSV(showUnknown ? unknownData : filteredData, licenses, showUnknown)}
      />
      <input
        type="text"
        onChange={handleFilter}
        placeholder="Search..."
        value={searchTerm}
        className="border-2 border-blue-500 rounded-md p-2 text-sm"
      />
      <button
        onClick={() => setShowUnknown((prev) => !prev)}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded text-sm"
      >
        {showUnknown ? "Show Entrance Exit" : "Show Unknown Licenses"}
      </button>
    </div>
  );
  

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
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
        borderRight: "none",
      },
    },
  };

  return (
    <>
      <div className="mb-5 mt-5"></div>
      <div className="ml-5 mr-5 mt-2 drop-shadow-xl">
        <div className="flex justify-end mb-5">{actions}</div>
        <DataTable
          title={showUnknown ? "Unknown Licenses" : "Entrance Exit"}
          columns={columns}
          data={showUnknown ? unknownData : filteredData}
          pagination
          customStyles={customStyles}
        />
      </div>
    </>
  );
}

export default TableListEntranceExit;
