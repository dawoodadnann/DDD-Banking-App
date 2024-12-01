import React, { useState } from "react";
import "./PortfolioPage.css";
import FooterComponent from "../Compo/FooterComponent"
import { Link } from "react-router-dom"; // Import Link to handle routing

const PortfolioPage = () => {
  localStorage.clear();
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


      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About D-Pay Bank</h2>
        <p>
         Dpay is a modern banking solution designed to simplify your financial life. With secure money transfers, bill payments, card management, and real-time balance updates, we empower you to take full control of your finances. Our innovative platform integrates advanced fraud detection and seamless transaction verification to ensure your banking experience is safe, efficient, and hassle-free. At Dpay, we’re committed to delivering smarter, faster, and more secure financial services tailored to your needs.
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

      

         {/* Footer */}
         <FooterComponent />
    </div>
  );
};

export default PortfolioPage;
