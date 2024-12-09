import { useState, useEffect } from 'react';
import './Dashboard.css'; // Import the CSS file
import { Navigate, useNavigate } from 'react-router-dom';

export default function Dashboard  () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const UserData = localStorage.getItem('signupData');
    
    if (UserData) {
        const Data = JSON.parse(UserData);
        setUser({
          username: Data.name,
          email: Data.email,
        });
      }
  }, []);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    localStorage.removeItem('loggedInData');
    console.log('Logging out...');
    navigate("/login");
  };


  const handlePayment = (planId) => {
    fetch("http://localhost:3001/api/payment-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId }),
    })
      .then((response) => response.json())
      .then((order) => {
        if (order && order.id) {
          const options = {
            key: "rzp_test_eGbNLYUHTjvuHa", 
            amount: order.amount, 
            currency: "INR",
            order_id: order.id, 
            handler: function (response) {
              alert("Payment Successful");
              console.log(response);

              if (planId === 'plan_PVBLv1Q3JEmuI0') {
                navigate('/success-dynamic'); 
              } else if (planId === 'plan_PVBMP8GvQMJ69f') {
                navigate('/success-economic'); 
              } else if (planId === 'plan_PVBN3LFR5TWaZo') {
                navigate('/success-prime'); 
              }
            },
            prefill: {
              name: "Customer Name",
              email: "customer@example.com",
              contact: "1234567890",
            },
            notes: {
              address: "Customer Address",
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open(); // Open the Razorpay checkout modal
        }
      })
      .catch((error) => {
        console.error("Error creating order", error);
      });
  };

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="title">Home</div>
        <div className="profile-icon" onClick={handleDropdownToggle}>
          <span>👤</span>
        </div>
        {dropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item">UserName : {user.username}</div>
            <div className="dropdown-item">UserEmail : {user.email}</div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="buttons-container">
          <button onClick={() => handlePayment('plan_PVBLv1Q3JEmuI0')} className="payment-button dynamic-payment">
            Dynamic Payment - ₹500
          </button>
          <button onClick={() => handlePayment('plan_PVBMP8GvQMJ69f')} className="payment-button economic-payment">
            Economic Payment - ₹200
          </button>
          <button onClick={() => handlePayment('plan_PVBN3LFR5TWaZo')} className="payment-button prime-payment">
            Prime Payment - ₹500
          </button>
        </div>
      </main>
    </div>
  );
};

