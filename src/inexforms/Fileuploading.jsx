import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function Fileuploading() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("financialData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setData(jsonData);
      localStorage.setItem("financialData", JSON.stringify(jsonData));

      e.target.value = ""; // Reset to allow same file re-upload
    };
    reader.readAsBinaryString(file);
  };

  // Handle clear data
  const handleClear = () => {
    setData([]);
    setFileName("");
    localStorage.removeItem("financialData");
  };

  // Navigate to Dashboard
  const handleVisualize = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div
        className="bg-white rounded p-4 shadow"
        style={{
          maxWidth: "90%",
          margin: "40px auto",
        }}
      >
        <h5 className="text-center text-success mb-3">
          📁 Upload Financial Data
        </h5>

        {/* Upload Section */}
        <div className="text-center mb-3">
          <input
            type="file"
            accept=".xlsx, .xls"
            id="fileInput"
            onChange={handleFileUpload}
            className="form-control mb-3"
          />
          {fileName && (
            <p className="text-secondary small">
              <strong>Uploaded:</strong> {fileName}
            </p>
          )}

          <div className="d-flex justify-content-center gap-3">
            {data.length > 0 && (
              <>
                <button className="btn btn-primary" onClick={handleVisualize}>
                  📊 Visualize Data
                </button>
                <button className="btn btn-danger" onClick={handleClear}>
                  🗑️ Clear Data
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sample Table before upload */}
        {data.length === 0 && (
          <div className="text-center">
            <p className="text-muted mb-2">
              Your Excel file should follow this column format:
            </p>
            <div
              className="table-responsive p-3 border rounded bg-light"
              style={{ marginTop: "10px" }}
            >
              <table className="table table-bordered table-hover text-center align-middle">
                <thead className="table-success">
                  <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Monthly_Income</th>
                    <th>Income_Type</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Dependent</th>
                    <th>City_Tier</th>
                    <th>Rent/Housema</th>
                    <th>Loan_Payment</th>
                    <th>Insurance</th>
                    <th>Groceries</th>
                    <th>Transport</th>
                    <th>Eating_Out</th>
                    <th>Entertainment</th>
                    <th>Utilities</th>
                    <th>Healthcare</th>
                    <th>Education</th>
                    <th>Miscellaneous</th>
                    <th>Desire_Savings</th>  
                  </tr>
                </thead>
                <tbody>
                  {[...Array(4)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array(20)
                        .fill("")
                        .map((_, colIndex) => (
                          <td key={colIndex}></td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table Section */}
        {data.length > 0 && (
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-success">
                <tr>
                  {Object.keys(data[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
