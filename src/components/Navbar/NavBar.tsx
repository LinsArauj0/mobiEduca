import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <nav className="navbar">
            <div className="logo">
                <h3>MobiEduca</h3>
            </div>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to='/schoolList' className="navbar-link">Escolas</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/about' className="navbar-link">Sobre nós</Link>
                </li>
                {!isLoggedIn && (
                    <li className="navbar-item login">
                        <Link to='/login' className="navbar-link">Login</Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <li className="navbar-item logout">
                        <Link to='/about' className="navbar-link">logout</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export { Navbar };
