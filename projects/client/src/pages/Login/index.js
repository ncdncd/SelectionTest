"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
// import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import "boxicons";

const createSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be 8 characters at minimum")
    .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        "Password must contain atleast 1 uppercase letter, 1 symbol, and 1 lowercase letter"
      ),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isError, setError] = useState("");

  const handleSubmit = (value, action) => {

      axios
        .post(`http://localhost:8000/api/auth/login`, value)
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          dispatch(setToken(response.data.accessToken));
          navigate("/")   
        })
        .catch (e =>{
          console.log(e);
          setError(e.response.data)   
        });
    
  };

  return (
    <>
    {isError? (<Alert
        color="failure"
        icon={HiInformationCircle}
        onDismiss={()=>setError("")}
      >
        <span>
          <p>
            <span className="font-medium">
              {isError}
            </span>
          </p>
        </span>
      </Alert>) : isError
      }
      <div className="flex items-center justify-center my-32 ml-96 mr-96 bg-[#0E8388]
      border-4 rounded border-[#CBE4DE] pt-16 pb-16" >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={createSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form
              className="flex max-w-2xl flex-col gap-8 leading-10 "
              style={{ width: "350px" }}
              onSubmit={props.handleSubmit}
            >
              <div>
                <div className=" block ">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="email"
                    value="email"
                    className="text-white"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px", width: "350px" }}
                  id="email"
                  name="email"
                  required
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.email}
                />

                <div className="block ">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="password"
                    value="password"
                    className="text-white"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px", width: "350px" }}
                  id="password"
                  name="password"
                  required
                  type="password"
                  onChange={props.handleChange}
                  value={props.values.password}
                />
              </div>
              <Button type="submit" className="bg-[#2E4F4F] border-2 border-[#CBE4DE]">Submit</Button>
              <span className="text-white">
                contact the admin or your supervisor if you don't have an account yet
              </span>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
