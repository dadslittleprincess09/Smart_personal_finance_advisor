
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

        const expenseData = [
          { name: "Rent", value: parseFloat(rent)||0 },
          { name: "Loan", value: parseFloat(loan)||0 },
          { name: "Insurance", value: parseFloat(insurance)||0 },
          { name: "Groceries", value: parseFloat(groceries)||0 },
          { name: "Transport", value: parseFloat(transport)||0 },
          { name: "Eating Out", value: parseFloat(eatingOut)||0 },
          { name: "Entertainment", value: parseFloat(entertainment)||0 },
          { name: "Utilities", value: parseFloat(utilities)||0 },
          { name: "Healthcare", value: parseFloat(healthcare)||0 },
          { name: "Education", value: parseFloat(education)||0 },
          { name: "Miscellaneous", value: parseFloat(miscellaneous)||0 },
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
                
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select shadow-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                
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
                
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">City Tier</label>
              <select
                className="form-select shadow-sm"
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value)}
                
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
