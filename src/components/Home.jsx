  import React from "react";
  import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
  const Home = () => {
    return (
      <div>
      
        {/* Hero Section */}
        <section className=" text-dark text-center py-5"style={{ backgroundColor: "#409e56ff", color: "white", padding: "8px" }} >
          <div className="container">
            <h1 className="display-4">Smart Personal Finance Advisor</h1>  
            <p className="lead">Track your income, expenses, and make smarter financial decisions effortlessly.</p>
            <Link to="/forms" className="btn btn-light btn-lg mt-3">Get Started</Link>
            <Link to="/fileuploading" className="btn btn-light btn-lg mt-3 ms-3">Through file</Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Features</h2>
            <div className="row text-center">
              <div className="col-sm-12 col-md-12 col-lg-4 mb-4 ">
                <div className="card h-100 shadow border border-0">
                  <div className="card-body">
                    <h5 className="card-title text-success">Expense Tracking</h5>
                    <p className="card-text">Keep track of all your spending categories easily.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 mb-4">
                <div className="card h-100 shadow border border-0">
                  <div className="card-body">
                    <h5 className="card-title text-success">Budget Planning</h5>
                    <p className="card-text">Plan monthly budgets and stick to your financial goals.</p>
                  </div>
                </div>
              </div>
              <div className=" col-sm-12 col-md-12 col-lg-4 mb-4">
                <div className="card h-100 shadow border border-0">
                  <div className="card-body">
                    <h5 className="card-title text-success">Smart Insights</h5>
                    <p className="card-text">Receive recommendations based on your spending habits.</p>
                  </div>
                </div>
              </div>
                </div>
                <div className="row text-center">
              <div className="col-sm-12 col-md-12 col-lg-4 mb-4 ">
                <div className="card h-100 shadow border border-0">
                  <div className="card-body">
                    <h5 className="card-title text-success">Reports & Analytics</h5>
                    <p className="card-text">Visualize your spending trends and insights with easy charts.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 mb-4">
                <div className="card h-100 shadow border border-0">
                  <div className="card-body">
                    <h5 className="card-title text-success">Smart Financial Assistantance</h5>
                    <p className="card-text">Plan monthly budgets and stick to your financial goals.</p>
                  </div>
                </div>
              </div>
               <div className="col-sm-12 col-md-12 col-lg-4 mb-4">
        <div className="card h-100 shadow border-0">
          <div className="card-body">
            <h5 className="card-title text-success">Saving Goals</h5>
            <p className="card-text">Set short and long-term saving goals easily.</p>
          </div>
        </div>
      </div>
                </div>

           
  
          </div>
        </section>

        
      </div>
    );
  };

  export default Home;
