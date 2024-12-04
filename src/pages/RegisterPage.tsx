import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../redux/auth/AuthSlice';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

// Validation Schema using Yup
const RegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handle form submission
    const handleRegister = (values: { name: string; email: string; password: string }) => {
        const {name, email, password} = values;
        // Mocking user registration (Replace with actual registration logic)
        if (email === 'test@example.com') {
            setErrorMessage('This email is already taken');
        } else {
            dispatch(login({name, email}));
            navigate('/');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <Formik
                initialValues={{name: '', email: '', password: ''}}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {() => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter your name"
                            />
                            <ErrorMessage name="name" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="error-message"/>
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
                            <ErrorMessage name="password" component="div" className="error-message"/>
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button type="submit" className="btn btn-primary">Register</button>
                    </Form>
                )}
            </Formik>

            <div>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;

