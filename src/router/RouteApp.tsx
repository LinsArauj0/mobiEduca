import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar/NavBar";
import { Home } from "@/pages/Home/HomePage";
import { About } from "@/pages/About/AboutPage";
import { Login } from "@/pages/Login/LoginPage";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import Footer from "@/components/Footer/Footer";

const RouteApp = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/schoolList" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to="/page-initial" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const showFooter = location.pathname !== '/login';

    return (
        <>
            {location.pathname !== '/login' && <Navbar />}
            {children}
            {showFooter && <Footer />}
        </>
    );
};

export { RouteApp };
