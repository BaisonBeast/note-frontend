import React from 'react';
import { Link } from 'react-router-dom';
import '../css/PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
        <h1 className="page-not-found-title">404 - Page Not Found</h1>
        <p className="page-not-found-message">The page you are looking for does not exist.</p>
        <Link to="/" className="page-not-found-link">Go to Home</Link>
    </div>
  );
};

export default PageNotFound;
