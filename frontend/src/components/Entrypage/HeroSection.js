import React from 'react';
import '../../css/Entrypage/EventEase.modules.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="heroSection">
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8542abe019cb162207df7ced1aa7ca7c96eab5d87d9cc856ef14f2434f885723?placeholderIfAbsent=true&apiKey=59b67e67c3874076a87cf06ee3b80a6b" 
        className="heroImage" 
        alt="Event background"
      />
      <div className="heroOverlay">
        <h1 className="mainTitle">EventEase</h1>
        <h2 className="subtitle">"Effortless Conference Management"</h2>
        <p className="description">
          "Effortlessly manage your conference from start to finish with our streamlined and user-friendly Conference Management System."
        </p>
        <Link to="/login">
          <button className="loginButton">Login</button>
        </Link>
        {/* Get them active once reviewer module created! */}

        {/* <Link to="/organize">
          <button className="CCButton">Create Conference</button>
        </Link>
        <Link to="/see-program-chairs">
          <button className="CCButton">See Program Chairs</button>
        </Link> */}
      </div>
    </section>
  );
}

export default HeroSection;
