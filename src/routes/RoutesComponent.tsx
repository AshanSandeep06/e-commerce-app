import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import Header from '../components/header/Header';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return <div>Please log in to view this page.</div>;
    }
    return <>{children}</>;
};

const RoutesComponent: React.FC = () => {
    return (
        <Router>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/products" element={<HomePage/>}/>
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default RoutesComponent;