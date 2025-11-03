import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const [financialData, setFinancialData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("financialData");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setFinancialData(parsed);
      }
    }
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = [...new Set(financialData.map((d) => d.Year))];

  const getMonthNumber = (monthName) => {
    const index = monthNames.findIndex(
      (m) => m.toLowerCase() === monthName.toLowerCase()
    );
    return index >= 0 ? index + 1 : monthName;
  };

  const filteredData =
    selectedYear && selectedMonth
      ? financialData.filter((d) => {
          const monthValue = String(d.Month).trim();
          return (
            String(d.Year) === String(selectedYear) &&
            (monthValue === String(getMonthNumber(selectedMonth)) ||
              monthValue.toLowerCase().startsWith(selectedMonth.toLowerCase()))
          );
        })
      : [];

  const expenseFields = [
    "Rent/Housema",
    "Loan_Payment",
    "Insurance",
    "Groceries",
    "Transport",
    "Eating_Out",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Education",
    "Miscellaneous",
  ];

  useEffect(() => {
    setSelectedCategories(expenseFields);
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const colors = [
    "#4caf50",
    "#ff9800",
    "#2196f3",
    "#9c27b0",
    "#f44336",
    "#00bcd4",
    "#ffc107",
    "#8bc34a",
    "#e91e63",
    "#795548",
    "#009688",
  ];

  if (!financialData.length) {
    return (
      <div className="text-center mt-5">
        <h4>No financial data available to visualize.</h4>
        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/fileuploading")}
        >
          Upload Excel File
        </button>
      </div>
    );
  }

  const rows = filteredData;
  const expenseData = expenseFields.map((field) => {
    const value = rows.reduce((sum, r) => sum + (parseFloat(r[field]) || 0), 0);
    return { name: field, value };
  });

  const filteredExpenses = expenseData.filter((e) =>
    selectedCategories.includes(e.name)
  );

  const totalIncome = rows.reduce(
    (sum, r) => sum + (parseFloat(r.Monthly_Income) || 0),
    0
  );

  const totalExpense = filteredExpenses.reduce((sum, e) => sum + e.value, 0);
  const savings = totalIncome - totalExpense;

  const healthCategory =
    savings > totalIncome * 0.2
      ? "Healthy"
      : savings > totalIncome * 0.05
      ? "Moderate"
      : "Critical";

  const pieData = {
    labels: filteredExpenses.map((e) => e.name),
    datasets: [
      {
        label: "Expenses",
        data: filteredExpenses.map((e) => e.value),
        backgroundColor: colors.slice(0, filteredExpenses.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: filteredExpenses.map((e) => e.name),
    datasets: [
      {
        label: "Expenses (₹)",
        data: filteredExpenses.map((e) => e.value),
        backgroundColor: colors.slice(0, filteredExpenses.length),
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div
          className="d-flex flex-column p-3 bg-light shadow-sm"
          style={{
            width: "220px",
            borderRight: "2px solid #ccc",
            minHeight: "100vh",
          }}
        >
          <button className="btn btn-success mb-3 shadow-sm">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </button>
          <button
  className="btn btn-outline-success mb-2 shadow-sm"
  onClick={() =>
    navigate("/aiassistence", {
      state: {
        expenseData: filteredExpenses,  // all selected category expense values
        savings: savings,               // calculated savings
        category: selectedCategories,   // list of chosen categories
      },
    })
  }
>
  <i className="bi bi-robot me-2"></i> AI Assistance
</button>

          <button
            className="btn btn-outline-success shadow-sm"
            onClick={() => navigate("/fileuploading")}
          >
            <i className="bi bi-upload me-2"></i> Upload Data
          </button>
        </div>

        {/* Main Content */}
        <div className="col" style={{ paddingLeft: "30px" }}>
          <h2 className="text-center mb-4 text-success">📊 Financial Dashboard</h2>

          {/* Filters */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <div>
              <label className="form-label fw-semibold">Select Year</label>
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setSelectedMonth("");
                }}
              >
                <option value="">-- Select Year --</option>
                {years.map((y, i) => (
                  <option key={i} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label fw-semibold">Select Month</label>
              <select
                className="form-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={!selectedYear}
              >
                <option value="">-- Select Month --</option>
                {monthNames.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Show Data or No Data Message */}
          {selectedYear && selectedMonth ? (
            rows.length > 0 ? (
              <>
                {/* Summary Cards */}
                <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                  <div className="card text-center shadow-sm" style={{ width: "180px", backgroundColor: "#e3f2fd" }}>
                    <div className="card-body p-2">
                      <h6 className="card-title text-primary">Total Expense</h6>
                      <h5 className="fw-bold mb-0">₹{totalExpense.toLocaleString()}</h5>
                    </div>
                  </div>

                  <div
                    className="card text-center shadow-sm"
                    style={{
                      width: "180px",
                      backgroundColor:
                        healthCategory === "Healthy"
                          ? "#e8f5e9"
                          : healthCategory === "Moderate"
                          ? "#fffde7"
                          : "#ffebee",
                    }}
                  >
                    <div className="card-body p-2">
                      <h6 className="card-title">Financial Health</h6>
                      <h5
                        className={`fw-bold mb-0 ${
                          healthCategory === "Healthy"
                            ? "text-success"
                            : healthCategory === "Moderate"
                            ? "text-warning"
                            : "text-danger"
                        }`}
                      >
                        {healthCategory}
                      </h5>
                    </div>
                  </div>

                  <div className="card text-center shadow-sm" style={{ width: "180px", backgroundColor: "#fff3e0" }}>
                    <div className="card-body p-2">
                      <h6 className="card-title text-warning">Current Savings</h6>
                      <h5 className="fw-bold mb-0">₹{savings.toLocaleString()}</h5>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="card shadow-sm p-3" style={{ height: "600px" }}>
                  <h5 className="text-center mb-3">Expense Analysis</h5>

                  {/* Checkbox filters */}
                  <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                    {expenseFields.map((cat, i) => (
                      <div key={i} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          id={`cat-${i}`}
                        />
                        <label className="form-check-label" htmlFor={`cat-${i}`}>
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Charts and Legend Layout */}
                  <div className="row h-100">
                    {/* Pie Chart */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                      <h6 className="mb-2">Expense Distribution</h6>
                      <div style={{ width: "100%", height: "400px" }}>
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                    </div>

                    {/* Bar Chart + Legends on Right */}
                    <div className="col-md-8 d-flex flex-row align-items-start justify-content-between">
                      <div style={{ width: "75%", height: "400px" }}>
                        <h6 className="text-center mb-2">Category-wise Expenses</h6>
                        <Bar data={barData} options={barOptions} />
                      </div>

                      {/* Legends */}
                      <div
                        style={{
                          width: "25%",
                          paddingLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          height: "400px",
                          overflowY: "auto",
                        }}
                      >
                        <h6 className="text-center mb-2">Legend</h6>
                        {filteredExpenses.map((e, i) => (
                          <div key={i} className="d-flex align-items-center mb-2">
                            <div
                              style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: colors[i],
                                marginRight: "8px",
                                borderRadius: "3px",
                              }}
                            ></div>
                            <span style={{ fontSize: "14px" }}>{e.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center mt-5">
                <h5 className="text-danger">
                  ⚠️ No data found for {selectedMonth} {selectedYear}.
                </h5>
                <p className="text-muted">Try selecting another month or upload data again.</p>
                <button
                  className="btn btn-outline-success mt-3"
                  onClick={() => navigate("/fileuploading")}
                >
                  📁 Upload Data
                </button>
              </div>
            )
          ) : (
            <p className="text-center text-muted mt-4">
              Please select both <strong>Year</strong> and <strong>Month</strong> to view your data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
