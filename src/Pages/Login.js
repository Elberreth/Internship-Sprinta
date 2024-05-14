import React from 'react';
import Apis from "../Config/Apis";
import axios from "axios";
import {useForm} from "react-hook-form";
import register from "./Register";
import ErrorTips from "../Config/ErrorTips";

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
        handleSubmit} = useForm({
        defaultValues:{
            uname:"", password:""
        }
    });

    return (
   <>
       <div className={"container"}>
           <form onSubmit={handleSubmit(sendData)}>
               <div className="mb-3">
                   <label htmlFor="inputUserName" className="form-label">UserName</label>
                   <input type="text" className="form-control"
                          id="inputUserName"
                          {...register("uname", {required: ErrorTips.LoginPage.uname})}
                          />
                   <div className={`alert alert-danger mt-2 ${errors.uname? 'd-block' : 'd-none'}`} role={"alert"}>{errors.uname?.message}</div>
               </div>
               <div className="mb-3">
                   <label htmlFor="inputUserPassword" className="form-label">Password</label>
                   <input type="text" className="form-control" id="inputUserPassword"
                          {...register("password", {required: ErrorTips.LoginPage.passwd})}
                   />
                   <div className={`alert alert-danger mt-2 ${errors.password? 'd-block' : 'd-none'}`} role={"alert"}>{errors.password?.message}</div>
               </div>
               <button type="submit" className="btn btn-primary">Submit</button>
           </form>
       </div>
   </>
  );
};

export default Login;
