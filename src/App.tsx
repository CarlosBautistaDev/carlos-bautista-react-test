import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import ProductsPage from "./components/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import UsersPage from './components/UsersPage';
import "./App.css";
import CreateProductPage from './components/ProductCreate';
import Navbar from './components/Navbar';

const InactivityTimer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId: number; 
    const resetTimer = () => {
      clearTimeout(timeoutId);
      // console.log('Temporizador de inactividad reiniciado');
      timeoutId = setTimeout(() => {
        // console.log('Redirigiendo al usuario a la página de inicio de sesión');
        localStorage.clear();
        navigate('/login');
      }, 5 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
      <InactivityTimer />
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;