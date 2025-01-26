import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <Link to="/profile" className="login-button">Login</Link>
      </header>
      <main className="main-content">
        <h1>Welcome to Women's Health App</h1>
        <div className="features">
          <div className="feature">
            <h2>AI Health Chatbot</h2>
            <p>Get instant health advice from our AI-powered chatbot.</p>
            <Link to="/chatbot" className="feature-link">Go to Chatbot</Link>
          </div>
          <div className="feature">
            <h2>Medicine Tracker</h2>
            <p>Keep track of your medications and set reminders.</p>
            <Link to="/medicine-tracker" className="feature-link">Go to Medicine Tracker</Link>
          </div>
          <div className="feature">
            <h2>Doctor Finder</h2>
            <p>Find the best doctors near you.</p>
            <Link to="/find-doctor" className="feature-link">Go to Doctor Finder</Link>
          </div>
        </div>
      </main>
    </div>
  );
};
