import React from 'react';
import Apis from "../Config/Apis";
import axios from "axios";
import { useForm } from "react-hook-form";
import ErrorTips from "../Config/ErrorTips";
import '../CSS/Register.css'; // Importera CSS för register-sidan

const Login = () => {

    const sendData = async (data) => {
        // await axios.post(Apis.Login, data)
        //     .then(function (response) {
        //         console.log("do what do you want here");
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        console.log(data);
    }

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        defaultValues: {
            uname: "", password: ""
        }
    });

    return (
        <>
            <div className="register-page">
                <div className="register-form-container">
                    <form className="register-form" onSubmit={handleSubmit(sendData)}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="inputUserName">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputUserName"
                                {...register("uname", {required: ErrorTips.LoginPage.uname})}
                            />
                            <div className={`alert alert-danger mt-2 ${errors.uname ? 'd-block' : 'd-none'}`}
                                 role="alert">
                                {errors.uname?.message}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUserPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputUserPassword"
                                {...register("password", {required: ErrorTips.LoginPage.passwd})}
                            />
                            <div className={`alert alert-danger mt-2 ${errors.password ? 'd-block' : 'd-none'}`}
                                 role="alert">
                                {errors.password?.message}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;



