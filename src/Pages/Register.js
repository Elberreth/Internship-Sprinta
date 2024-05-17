import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import '../CSS/Global.css';
import '../CSS/Register.css';
import '../CSS/FormControls.css';
import '../CSS/Buttons.css';
import '../CSS/Popup.css';
import AgreementPolicy from './AgreementPolicy';

const Register = () => {
    const [validationCodeError, setValidationCodeError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const sendData = async (data) => {
        console.log(data);
    }

    const {
        register,
        formState: { errors },
        handleSubmit: registerHandleSubmit
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

    const handleSubmitGetValidationCode = (data) => {
        let errorMessage = "";

        if (!data.firstname || !data.lastname || !data.email) {
            errorMessage += "First Name, Last Name, and Email are required. ";
        }
        if (!data.employmentStatus) {
            errorMessage += "Employment status is required. ";
        }
        if (!data.company) {
            errorMessage += "Company is required. ";
        }

        setValidationCodeError(errorMessage);
        
        if (!errorMessage) {
            // Proceed with validation code logic
        }
    }

    const openPopup = () => {
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <div className="register-page">
            <div className="register-form-container">
                <form className="register-form" onSubmit={registerHandleSubmit(sendData)}>
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
                    {validationCodeError && <div className="error">{validationCodeError}</div>}
                    <button type="button" onClick={handleSubmitGetValidationCode} className="btn-wide-purple">Get Validation Code</button>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="inputValidateEmail"
                            placeholder="Validate Email (xxxx-xxxx)"
                            {...register("validateEmail", { required: 'Validate Email is required' })}
                        />
                        {errors.validateEmail && <div className="error">{errors.validateEmail.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            {...register("password", { required: 'Password is required' })}
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="inputConfirmPassword"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", { required: 'Confirm Password is required' })}
                        />
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
                    </div>
                    <input type="checkbox" id="acceptAgreement" name="acceptAgreement" {...register("acceptAgreement")} />
                    <label htmlFor="acceptAgreement">Do you accept the Agreement? <span onClick={openPopup}>View Agreement</span></label>
                    <button type="submit" className="btn-small">Submit</button>
                    {showPopup && (
                        <div className="agreement-popup">
                            <div className="agreement-popup-content">
                                <span className="popup-btn" onClick={closePopup}>&times;</span>
                                <h3>Agreement</h3>
                                <AgreementPolicy />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Register;























































































