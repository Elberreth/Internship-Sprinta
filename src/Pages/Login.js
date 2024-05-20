import React from 'react';
import { useForm } from "react-hook-form";
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
        formState: { errors },
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
                                placeholder="Enter your Email"
                                {...register("uname", { required: 'Username is required' })}
                            />
                            {errors.uname && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.uname.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUserPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputUserPassword"
                                placeholder="Enter your password"
                                {...register("password", { required: 'Password is required' })}
                            />
                            {errors.password && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.password.message}</div>}
                        </div>
                        <button type="submit" className="btn-small">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;













