
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";

  const Forms = () => {
    const navigate = useNavigate();

    // All form states
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [incomeType, setIncomeType] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [dependents, setDependents] = useState("");
    const [cityTier, setCityTier] = useState("");
    const [rent, setRent] = useState("");
    const [loan, setLoan] = useState("");
    const [insurance, setInsurance] = useState("");
    const [groceries, setGroceries] = useState("");
    const [transport, setTransport] = useState("");
    const [eatingOut, setEatingOut] = useState("");
    const [entertainment, setEntertainment] = useState("");
    const [utilities, setUtilities] = useState("");
    const [healthcare, setHealthcare] = useState("");
    const [education, setEducation] = useState("");
    const [miscellaneous, setMiscellaneous] = useState("");
    const [desiredSavings, setDesiredSavings] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = {
        monthlyIncome,
        dependents,
        rent,
        loan,
        insurance,
        groceries,
        transport,
        eatingOut,
        entertainment,
        utilities,
        healthcare,
        education,
        miscellaneous,
        desiredSavings,
        age,
        gender,
        cityTier,
      };
      // try {
      //   const response = await fetch("http://127.0.0.1:5000/predict", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });

      //   if (!response.ok)
      //     throw new Error(`HTTP error! Status: ${response.status}`);

      //   const res = await response.json();
      //   const prediction = res.result;

        const expenseData = [
          { name: "Rent", value: parseFloat(rent) },
          { name: "Loan", value: parseFloat(loan) },
          { name: "Insurance", value: parseFloat(insurance) },
          { name: "Groceries", value: parseFloat(groceries) },
          { name: "Transport", value: parseFloat(transport) },
          { name: "Eating Out", value: parseFloat(eatingOut) },
          { name: "Entertainment", value: parseFloat(entertainment) },
          { name: "Utilities", value: parseFloat(utilities) },
          { name: "Healthcare", value: parseFloat(healthcare) },
          { name: "Education", value: parseFloat(education) },
          { name: "Miscellaneous", value: parseFloat(miscellaneous) },
        ];
        const income = parseFloat(monthlyIncome);
        const desired = parseFloat(desiredSavings);
        const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
        const savings = income - totalExpense;

        let category = "";
        if (savings < 0) category = "Poor";
        else if (savings < desired) category = "Moderate";
        else category = "Healthy";

        navigate("/chart", { state: { expenseData,category,totalExpense,savings } });

        //   navigate("/chart", { state: { expenseData, prediction } });
        // } catch (error) {
        //   console.error("Error connecting to backend:", error);
        //   // alert(
        //   //   "❌ Failed to connect to backend. Make sure Flask is running on port 5000."
        //   // );
        // }
    };

    return (
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Personal Finance Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Income and Personal Info */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Monthly Income</label>
              <input
                type="number"
                className="form-control shadow-sm"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="Enter monthly income"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Income Type</label>
              <select
                className="form-select shadow-sm"
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
                required
              >
                <option value="">Select Income Type</option>
                <option value="Business">💼 Business</option>
                <option value="Salary">💰 Salary</option>
                <option value="Student">🎓 Student</option>
                <option value="Retail">🏪 Retail</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="number"
                className="form-control shadow-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select shadow-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="1">👨 Male</option>
                <option value="1">👩 Female</option>
                <option value="1">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Dependents</label>
              <input
                type="number"
                className="form-control shadow-sm"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                placeholder="Enter number of dependents"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">City Tier</label>
              <select
                className="form-select shadow-sm"
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value)}
                required
              >
                <option value="">Select City Tier</option>
                <option value="2">🏙️ Metropolitan</option>
                <option value="1">🌆 Urban</option>
                <option value="0">🌇 Semi Urban</option>
              
              </select>
            </div>

            {/* Expense Inputs */}
            {[
              ["Rent/House Maintenance", rent, setRent],
              ["Loan Repayment", loan, setLoan],
              ["Insurance", insurance, setInsurance],
              ["Groceries", groceries, setGroceries],
              ["Transport", transport, setTransport],
              ["Eating Out", eatingOut, setEatingOut],
              ["Entertainment", entertainment, setEntertainment],
              ["Utilities", utilities, setUtilities],
              ["Healthcare", healthcare, setHealthcare],
              ["Education", education, setEducation],
              ["Miscellaneous", miscellaneous, setMiscellaneous],
              ["Desired Savings", desiredSavings, setDesiredSavings],
            ].map(([label, value, setter], i) => (
              <div className="col-md-6" key={i}>
                <label className="form-label fw-semibold">{label}</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success shadow-sm px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default Forms;
