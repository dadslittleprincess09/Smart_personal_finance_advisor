import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Main Footer */}
      <div className=" mt-2 p-4" style={{ backgroundColor: "#409e56ff", color: "white", padding: "8px"}}>
        <div className="text-center mb-2">
          <h5 className="mb-3 fs-5">Smart Personal Financial Advisor</h5>
          <p className='fs-6'>
            SmartFinance helps you track spending, manage budgets,
            analyze habits, and make smarter financial decisions.
          </p>
        </div>

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-3">
  <h5 className="me-1 mb-2 mb-md-0 fs-6 fw-bold">Contact :</h5>
  <div>
    <span className="">
      <a href="mailto:support@smartfinance.com" className="text-white text-decoration-none fw-bold">support@smartfinance.com , </a>
    </span>
    <span className="me-1 fw-bold">+91 9876543210 ,</span>
    <span className='fw-bold'>Hyderabad, India</span>
  </div>
</div>

  
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-2 border-top border-secondary text-dark " style={{ backgroundColor: "#409e56ff", color: "white", padding: "8px" }} >
        © 2025 SmartFinance.
      </div>
    </div>
  );
};

export default Footer;
