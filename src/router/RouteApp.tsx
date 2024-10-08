import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar/NavBar";
import { ListSchool } from "@/pages/ListSchool/ListSchool";
import { About } from "@/pages/About/AboutPage";
import { Login } from "@/pages/Login/LoginPage";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import Footer from "@/components/Footer/Footer";

const RouteApp = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/schoolList"
            element={
              <PrivateRoute>
                <ListSchool />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export { RouteApp };
