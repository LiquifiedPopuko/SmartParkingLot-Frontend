import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';

const Export = ({ onExport }) => (
    <button onClick={onExport} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
        Export CSV
    </button>
);

Export.propTypes = {
    onExport: PropTypes.func.isRequired
};

function downloadCSV(data, licenses) {
    if (licenses.length === 0) {
        console.error("License data is not available.");
        return;
    }

    const csv = data.map(row => ({
        Date: new Date(row.access_date).toLocaleString('en-GB', { timeZone: 'UTC' }),
        "License plate number": getLicensePlateNumber(row, licenses),
        Status: row.access_type === 1 ? 'In' : row.access_type === 2 ? 'Out' : "Don't Know",
        Images: row.image_source
    }));

    const csvContent = [
        ['Date', 'Time', 'License plate number', 'Status', 'Images'],
        ...csv.map(row => [row.Date, row["License plate number"], row.Status, row.Images])
    ]
    .map(e => e.join(","))
    .join("\n");

    // Add BOM to support UTF-8
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "entrance_exit.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getLicensePlateNumber(row, licenses) {
    const license = licenses.find(lic => lic.id === row.license_id);
    return license ? license.license_number || '' : 'Unknown'; // If license number is null or undefined, replace with an empty string
}


function TableListEntranceExit() {
    const [data, setData] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchHistoryData = useCallback(() => {
        axios
            .get("http://13.214.18.38:8000/api/history")
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching history data:", error);
            });
    }, []);

    const fetchLicenseData = useCallback(() => {
        axios
            .get("http://13.214.18.38:8000/api/licensePlates")
            .then((response) => {
                setLicenses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching license data:", error);
            });
    }, []);

    useEffect(() => {
        fetchHistoryData();
        fetchLicenseData();
    }, [fetchHistoryData, fetchLicenseData]);

    useEffect(() => {
        const updatedColumns = [
            {
                name: 'Date',
                selector: row => new Date(row.access_date).toLocaleString('en-GB', { timeZone: 'UTC' }),
                sortable: true,
            },
            {
                name: 'License plate number',
                selector: row => {
                    const license = licenses.find(lic => lic.id === row.license_id);
                    return license ? license.license_number || '' : 'Unknown'; // If license_number is null or undefined, replace with an empty string
                },
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => {
                    switch (row.access_type) {
                        case 1:
                            return 'In';
                        case 2:
                            return 'Out';
                        default:
                            return "Don't Know";
                    }
                },
                sortable: true,
            },
            {
                name: 'Images',
                cell: row => (
                    <a href={row.image_source} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                        Images
                    </a>
                ),
                ignoreRowClick: true,
            }
        ];
        setColumns(updatedColumns);
    }, [licenses]);

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredResult = data.filter(row =>
            new Date(row.access_date).toLocaleString('en-GB', { timeZone: 'UTC' }).toLowerCase().includes(searchTerm) ||  // Filter by date
            (row.license_number && row.license_number.toLowerCase().includes(searchTerm)) || // Filter by license plate number
            (licenses.find(lic => lic.id === row.license_id) || {}).license_number.toLowerCase().includes(searchTerm) ||
            (licenses.find(lic => lic.id === row.license_id) || {}).province.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filteredResult);
    };

    const actions = (
        <div className="flex items-center space-x-2">
            <Export onExport={() => downloadCSV(filteredData, licenses)} />
            <input
                type="text"
                onChange={handleFilter}
                placeholder="Search..."
                className="border-2 border-blue-500 rounded-md p-2 text-sm"
            />
        </div>
    );

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
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
                <div className="flex justify-end mb-5">
                    {actions}
                </div>
                <DataTable
                    title="Entrance Exit"
                    columns={columns}
                    data={filteredData}
                    pagination
                    customStyles={customStyles}
                />
            </div>
        </>
    );
}

export default TableListEntranceExit;
