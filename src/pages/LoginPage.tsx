import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/AuthSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Validation Schema using Yup
const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handle form submission
    const handleLogin = (values: { email: string; password: string }) => {
        const { email, password } = values;
        // Mocking user authentication (Replace with actual authentication logic)
        if (email === 'test@example.com' && password === 'password123') {
            dispatch(login({ name: 'Test User', email }));
            navigate('/');
        } else {
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {() => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button type="submit" className="btn btn-primary">Login</button>
                    </Form>
                )}
            </Formik>

            <div>
                <p>Don't have an account? <a href="/register">Sign up</a></p>
            </div>
        </div>
    );
};

export default LoginPage;