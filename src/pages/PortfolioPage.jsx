import React, {useState} from "react";
import "./PortfolioPage.css";

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

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About D-Pay Bank</h2>
        <p>
          {/* D-Pay Bank is a modern financial institution based in Karachi,
          providing cutting-edge solutions for individuals and businesses alike.
          Our vision is to lead innovation in the financial sector. */}
          D-Pay Bank, headquartered in the bustling city of Karachi, is a
          leading financial institution in Pakistan, providing innovative
          banking solutions to both individuals and businesses. Established with
          a vision to bridge the gap between traditional banking and modern
          financial technologies, D-Pay Bank offers a range of services,
          including loans, interbank transactions, bill payments, secure
          payments, and online banking. Our commitment to trust, security, and
          convenience sets us apart. Leveraging cutting-edge technology, we
          ensure that all transactions are encrypted and secure, providing peace
          of mind to our customers. D-Pay Bank strives to empower its users with
          seamless access to banking services, ensuring financial inclusion for
          everyone, from entrepreneurs to everyday consumers. With a strong
          focus on customer service, our Karachi-based operations are backed by
          a dedicated team that ensures all queries and issues are resolved
          promptly. As a customer-centric bank, we are continuously evolving our
          offerings, from online banking tools to mobile banking solutions, to
          keep up with the fast-paced financial landscape of Pakistan. At D-Pay
          Bank, our mission is to be the driving force behind financial growth,
          innovation, and security. We aim to be your trusted partner in
          managing your finances effectively and efficiently, offering products
          and services that meet the diverse needs of our growing customer base.
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
            <p>
              Ensure the highest level of security for all your payments with
              encryption and fraud detection.
            </p>
          </div>

          <div className="service-item">
            <h3>Interbank Transactions</h3>
            <p>
              Transfer funds seamlessly between different banks with our fast
              and reliable service.
            </p>
          </div>

          <div className="service-item">
            <h3>Online Banking</h3>
            <p>
              Manage your accounts and transactions from anywhere with our
              convenient online banking portal.
            </p>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <iframe
            title="Location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2034785261494!2d67.26210887515188!3d24.85689907793159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3316c5276e35b%3A0x823a6a0100195ffd!2sFAST%20National%20University%20Karachi%20Campus!5e0!3m2!1sen!2s!4v1728223436085!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* <form className="contact-form">
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send Message</button>
        </form> */}
        <div className="contact-details">
          <p>Email: support@dpaybank.com</p>
          <p>Phone: +92 21 111 222 333</p>
          <p>
            Address: D-Pay Bank, FAST NUCES Main Campus, Shah Latif Town,
            Karachi, Pakistan
          </p>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
