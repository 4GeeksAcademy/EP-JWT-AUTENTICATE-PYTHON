import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    return (
        <nav className="custom-navbar">
            <div className="custom-container">
                <Link to="/" className="custom-brand">
                    <span className="custom-logo">AUTENTICATE</span>
                </Link>
                <div className="custom-links">
                    <Link to="/" className="custom-nav-item">Inicio</Link>
                    <Link to="/signup" className="custom-nav-item">Registro</Link>
                    <Link to="/login" className="custom-nav-item">Login</Link>
                </div>
            </div>
        </nav>
    );
};
