import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function EditLicensePlateForm({ id, isVisible, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    license_number: "",
    province_id: "",
  });

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    axios.get("https://10.0.28.18:8001/api/province")
        .then((response) => {
            console.log("Provinces fetched:", response.data.result);
            setProvinces(response.data.result); // Updated to match the response structure
        })
        .catch((error) => {
            console.error("Error fetching provinces:", error);
        });
}, []);

useEffect(() => {
    console.log("Provinces fetched:", provinces);
}, [provinces]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  // Fetch existing data when the id changes
  useEffect(() => {
    if (id) {
      axios
        .get(`https://10.0.28.18:8001/api/licensePlates/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching license plate data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://10.0.28.18:8001/api/editLicense/${id}`, formData)
      .then(() => {
        fetchData(); // Refresh the table data
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating license plate:", error);
      });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit License Plate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Province</label>
            <select name="province_id" value={formData.province_id} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                                                <option value="">Select a province</option>
                                                {provinces.length > 0 ? (
                                                    provinces.map(province => (
                                                        <option key={province.id} value={province.id}>{province.province}</option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>No provinces available</option>
                                                )}
                                            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Save & Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditLicensePlateForm.propTypes = {
    id: PropTypes.number.isRequired,  // Adjusted to number if necessary
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };
  

export default EditLicensePlateForm;
