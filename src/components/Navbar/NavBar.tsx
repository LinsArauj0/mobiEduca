import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/services/authService';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <h3>MobiEducaMe</h3>
            </div>
            <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`navbar-list navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <li className="navbar-item">
                    <Link to='/schoolList' className="navbar-link" onClick={closeMenu}>Escolas</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/about' className="navbar-link" onClick={closeMenu}>Sobre nós</Link>
                </li>
                <li className="navbar-item login">
                    <Link to='/login' className="navbar-link" onClick={closeMenu}>Login</Link>
                </li>
                <li className="navbar-item navbar-item.logout">
                    <button className="navbar-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export { Navbar };
