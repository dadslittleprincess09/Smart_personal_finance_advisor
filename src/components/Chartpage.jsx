import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import "./ChartPage.css";
const ChartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expenseData = location.state?.expenseData || [];
  const savings = location.state?.savings || 0;
  const category = location.state?.category || "N/A";
  const [selectedCategories, setSelectedCategories] = useState(
    expenseData.map((item) => item.name)
  );

  const toggleCategory = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const filteredData = expenseData.filter((item) =>
    selectedCategories.includes(item.name)
  );

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
    "#607d8b",
  ];

  // Pie chart
  const pieData = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        label: "Expenses",
        data: filteredData.map((item) => item.value),
        backgroundColor: colors.slice(0, filteredData.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  // Bar + Line Chart
  const barData = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        type: "bar",
        label: "Expenses",
        data: filteredData.map((item) => item.value),
        backgroundColor: colors.slice(0, filteredData.length),
      },
      {
        type: "line",
        label: "Expense Trend",
        data: filteredData.map((item) => item.value),
        borderColor: "#000",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: "#000",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...filteredData.map((item) => item.value)) + 100,
        grid: { color: "#c1babaff", borderColor: "#000" },
      },
      x: { grid: { color: "#a3a1a1ff", borderColor: "#000" } },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
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
  className="btn btn-outline-success shadow-sm"
  onClick={() =>
    navigate("/aiassistence", {
      state: {
        expenseData: expenseData,
        savings: savings,
        category: category,
      },
    })
  }
>
  <i className="bi bi-robot me-2"></i> AI Assistance
</button>

        </div>

        {/* Main Content */}
        <div className="col" style={{ paddingLeft: "30px" }}>
          <h2 className="text-center mb-4">Financial Dashboard</h2>
          <div className="card shadow-sm p-4" style={{ height: "540px" }}>
            <div className="row mb-4">
              {/* Pie Chart + Filters */}
              <div className="col-md-4">
                <div className="card shadow-sm p-3" style={{ height: "490px" }}>
                  <div
                    className="mb-3 p-2 border rounded"
                    style={{ maxHeight: "120px", overflowY: "auto" }}
                  >
                    {expenseData.map((item) => (
                      <div className="form-check" key={item.name}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={item.name}
                          checked={selectedCategories.includes(item.name)}
                          onChange={() => toggleCategory(item.name)}
                        />
                        <label className="form-check-label" htmlFor={item.name}>
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div  className="pie-section">
                    <h6 className="text-center mb-3">Expense Distribution</h6>
                    <Pie data={pieData} options={pieOptions} height={260} />
                  </div>
                </div>
              </div>

              {/* Bar + Line Graph with Total Cards */}
              <div className="col-md-8">
                <div
                  className="card shadow-sm p-3 position-relative"
                  style={{ height: "490px" }}
                >
                  {/* Totals as Cards */}
                  <div className="d-flex justify-content-center mb-3 gap-3">
                    <div
                      className="card text-center shadow-sm"
                      style={{ width: "180px", backgroundColor: "#e3f2fd" }}
                    >
                      <div className="card-body p-2">
                        <h6 className="card-title text-primary">
                          Total Expense
                        </h6>
                        <h5 className="fw-bold mb-0">
                          ₹
                          {filteredData
                            .reduce(
                              (sum, item) => sum + Number(item.value || 0),
                              0
                            )
                            .toLocaleString()}
                        </h5>
                      </div>
                    </div>
                    <div
                      className="card text-center shadow-sm"
                      style={{
                        width: "180px",
                        backgroundColor:
                          category === "Healthy"
                            ? "#e8f5e9"
                            : category === "Moderate"
                            ? "#fffde7"
                            : "#ffebee",
                      }}
                    >
                      <div className="card-body p-2">
                        <h6 className="card-title fw-semibold">
                          Financial Health
                        </h6>
                        <h5
                          className={`fw-bold mb-0 ${
                            category === "Healthy"
                              ? "text-success"
                              : category === "Moderate"
                              ? "text-warning"
                              : "text-danger"
                          }`}
                        >
                          {category}
                        </h5>
                      </div>
                    </div>

                    <div
                      className="card text-center shadow-sm"
                      style={{ width: "180px", backgroundColor: "#fff3e0" }}
                    >
                      <div className="card-body p-2">
                        <h6 className="card-title text-warning">
                          Current Savings
                        </h6>
                        <h5 className="fw-bold mb-0">
                          ₹{savings.toLocaleString()}
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* Graph + Legend */}
                  <div className="d-flex barchart"  style={{ height: "350px" }}>
                    {/* Bar Chart */}
                    <div style={{ flex: 3 }}>
                      <h6 className="text-center mb-2">Expense Overview</h6>
                      <Bar data={barData} options={barOptions} height={300} />
                    </div>

                    {/* Legend on Right */}
                    <div
                      style={{
                        flex: 1,
                        paddingLeft: "20px",
                        borderLeft: "1px solid #ddd",
                        overflowY: "auto",
                      }}
                    >
                      <h6 className="text-center mb-2">Categories</h6>
                      <div
                        className="d-flex flex-column"
                        style={{ gap: "6px", fontSize: "13px" }}
                      >
                        {filteredData.map((item, i) => (
                          <div key={i} className="d-flex align-items-center">
                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                backgroundColor: colors[i],
                                marginRight: "8px",
                                borderRadius: "2px",
                              }}
                            ></div>
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
