import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../CSS/Global.css';
import '../CSS/Register.css';
import '../CSS/FormControls.css';
import '../CSS/Buttons.css';
import '../CSS/Popup.css';
import AgreementPopup from './AgreementPopup';
import generateRandomCode from '../Utils/RandomCodeGenerator';

const Register = () => {
    const [validationCodeError, setValidationCodeError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const popupRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
        clearErrors
    } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            validateEmail: "",
            password: "",
            confirmPassword: "",
            company: "",
            employmentStatus: "",
            acceptAgreement: false
        }
    });

    const sendData = async (data) => {
        console.log(data);
    };

    const handleSubmitGetValidationCode = async () => {
        const data = getValues();
        let errorMessage = "";

        if (!data.firstname) {
            setError('firstname', { type: 'manual', message: 'First Name is required' });
            errorMessage = true;
        } else {
            clearErrors('firstname');
        }

        if (!data.lastname) {
            setError('lastname', { type: 'manual', message: 'Last Name is required' });
            errorMessage = true;
        } else {
            clearErrors('lastname');
        }

        if (!data.email) {
            setError('email', { type: 'manual', message: 'Email is required' });
            errorMessage = true;
        } else {
            clearErrors('email');
        }

        if (!data.employmentStatus) {
            setError('employmentStatus', { type: 'manual', message: 'Employment status is required' });
            errorMessage = true;
        } else {
            clearErrors('employmentStatus');
        }

        if (!data.company) {
            setError('company', { type: 'manual', message: 'Company is required' });
            errorMessage = true;
        } else {
            clearErrors('company');
        }

        if (!errorMessage) {
            const validationCode = generateRandomCode();
            setGeneratedCode(validationCode);

            try {
                await sendEmail(data.email, validationCode);
                setEmailSent(true);
                alert(`Validation code sent to ${data.email}`);
            } catch (error) {
                console.error("Error sending email:", error);
                setEmailSent(false);
            }
        } else {
            setEmailSent(false);
        }
    };

    const sendEmail = async (email, code) => {
        console.log(`Sending code ${code} to ${email}`);
        return new Promise((resolve, reject) => setTimeout(() => {
            const success = Math.random() > 0.1;
            success ? resolve() : reject(new Error("Failed to send email"));
        }, 1000));
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleRegister = () => {
        const { validateEmail, password, confirmPassword, acceptAgreement } = getValues();

        if (!validateEmail) {
            setError('validateEmail', { type: 'manual', message: 'Please fill in the Validate Email field.' });
        } else {
            clearErrors('validateEmail');
        }

        if (!password) {
            setError('password', { type: 'manual', message: 'Please fill in the Password field.' });
        } else {
            clearErrors('password');
        }

        if (password !== confirmPassword) {
            setError('confirmPassword', { type: 'manual', message: 'Passwords do not match.' });
        } else {
            clearErrors('confirmPassword');
        }

        if (!acceptAgreement) {
            setError('acceptAgreement', { type: 'manual', message: 'You must accept the agreement.' });
        } else {
            clearErrors('acceptAgreement');
        }

        if (!errors.validateEmail && !errors.password && !errors.confirmPassword && !errors.acceptAgreement) {
            setAccountCreated(true);
            alert('You have successfully created your Jambiz Alumni Portal account!');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="register-page">
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit(sendData)}>
                    <h2>Register</h2>
                    <div className="form-group">
                        <select
                            id="company"
                            className="form-control"
                            {...register("company", { required: 'Company is required' })}
                        >
                            <option value="">Select Company</option>
                            <option value="XBUS">XBUS</option>
                            <option value="EXCEED">EXCEED</option>
                            <option value="Sprinta">Sprinta</option>
                            <option value="Progress Lead">Progress Lead</option>
                            <option value="Addends">Addends</option>
                            <option value="Podium">Podium</option>
                            <option value="Analytic Lead">Analytic Lead</option>
                            <option value="LearningLead">LearningLead</option>
                            <option value="SwCG">SwCG</option>
                        </select>
                        {errors.company && <div className="error">{errors.company.message}</div>}
                    </div>
                    <div className="form-group radio-group">
                        <div className="radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    name="employmentStatus"
                                    value="Currently Employed"
                                    {...register("employmentStatus", { required: 'Employment status is required' })}
                                />
                                Currently Employed
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="employmentStatus"
                                    value="Previously Employed"
                                    {...register("employmentStatus", { required: 'Employment status is required' })}
                                />
                                Previously Employed
                            </label>
                        </div>
                        {errors.employmentStatus && <div className="error">{errors.employmentStatus.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputFirstName"
                            placeholder="First Name"
                            {...register("firstname", { required: 'First Name is required' })}
                        />
                        {errors.firstname && <div className="error">{errors.firstname.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputLastName"
                            placeholder="Last Name"
                            {...register("lastname", { required: 'Last Name is required' })}
                        />
                        {errors.lastname && <div className="error">{errors.lastname.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Email"
                            {...register("email", { required: 'Email is required' })}
                        />
                        {errors.email && <div className="error">{errors.email.message}</div>}
                    </div>
                    <button type="button" onClick={handleSubmit(handleSubmitGetValidationCode)} className="btn-wide-purple">Get Validation Code</button>
                    {validationCodeError && <div className="error">{validationCodeError}</div>}
                    {emailSent && <div className="success">Validation code has been sent to your email.</div>}
                    {!emailSent && validationCodeError && <div className="error">Failed to send validation code. Please check your details and try again.</div>}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputValidateEmail"
                            placeholder="Type in your code (xxxx-xxxx)"
                            {...register("validateEmail")}
                        />
                        {errors.validateEmail && <div className="error">{errors.validateEmail.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputConfirmPassword"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" id="acceptAgreement" name="acceptAgreement" {...register("acceptAgreement")} />
                        <label htmlFor="acceptAgreement">Do you accept the Agreement? <a href="#" onClick={openPopup}>View Agreement</a></label>
                        {errors.acceptAgreement && <div className="error">{errors.acceptAgreement.message}</div>}
                    </div>
                    <button type="button" onClick={handleRegister} className="btn-small">Register</button>
                    {showPopup && (
                        <div className="agreement-popup" ref={popupRef}>
                            <div className="agreement-popup-content">
                                <span className="popup-btn" onClick={closePopup}>&times;</span>
                                <h3>Agreement</h3>
                                <AgreementPopup onClose={closePopup} />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;













































































































