import React, { useState } from "react";
import "./PortfolioPage.css";
import { Link } from "react-router-dom"; // Import Link to handle routing

const PortfolioPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      text: "D-Pay Bank made my business transactions so much easier! Highly recommend their services.",
      author: "Sarah A."
    },
    {
      text: "Their online banking portal is secure and user-friendly, making bill payments a breeze.",
      author: "Ali K."
    },
    {
      text: "Excellent customer service and reliable interbank transfers!",
      author: "John D."
    },
    {
      text: "I trust D-Pay Bank for all my financial needs. Truly innovative solutions!",
      author: "Maria L."
    }
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to D-Pay Bank</h1>
          <p>Your Trusted Financial Partner</p>
          <a href="#about" className="cta-button">
            Learn More
          </a>
        </div>
      </section>

      {/* Button Section */}
      <section className="button-section py-8">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          <Link to="/portfolio" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Portfolio
            </button>
          </Link>
          <Link to="/login" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link to="/signup" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Signup
            </button>
          </Link>
          <Link to="/billing" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Billing
            </button>
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Dashboard
            </button>
          </Link>
          <Link to="/loan" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Loan
            </button>
          </Link>
          <Link to="/help" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Help
            </button>
          </Link>
          <Link to="/cards" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Cards
            </button>
          </Link>
          <Link to="/manager-dashboard" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Manager Dashboard
            </button>
          </Link>
          <Link to="/money-transfer" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Money Transfer
            </button>
          </Link>
          <Link to="/managerlogin" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Manager Login
            </button>
          </Link>
          <Link to="/managersignup" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Manager Signup
            </button>
          </Link>
          <Link to="/managerapproval" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Manager Approval
            </button>
          </Link>
          <Link to="/managerupdate" className="btn btn-primary">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Manager Update
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About D-Pay Bank</h2>
        <p>
          D-Pay Bank, headquartered in Karachi, provides cutting-edge solutions
          for individuals and businesses alike. Our vision is to lead innovation
          in the financial sector.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Loans</h3>
            <p>Flexible loan services tailored to your needs.</p>
          </div>
          <div className="service-item">
            <h3>Bank Transfers</h3>
            <p>Secure and fast transfers across the globe.</p>
          </div>
          <div className="service-item">
            <h3>Bill Payments</h3>
            <p>Pay your bills easily through our online portal.</p>
          </div>
          <div className="service-item">
            <h3>Secure Payments</h3>
            <p>Ensure the highest level of security for all your payments.</p>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section id="reviews" className="reviews-section">
        <h2>User Reviews</h2>
        <div className="review-carousel">
          <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>"{review.text}"</p>
                <span>- {review.author}</span>
              </div>
            ))}
          </div>
          <button className="carousel-button left-arrow" onClick={prevSlide}>←</button>
          <button className="carousel-button right-arrow" onClick={nextSlide}>→</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <p>Email: support@dpaybank.com</p>
          <p>Phone: +92 21 111 222 333</p>
          <p>Address: D-Pay Bank, FAST NUCES Main Campus, Karachi, Pakistan</p>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
