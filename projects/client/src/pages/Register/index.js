"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import axios from "axios";

const RegisterPage = () => {
  const [isError, setError] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleSubmit = (value, action) => {
    axios
      .post(`http://localhost:8000/api/auth/register`, value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       )
      .then((response) => {
        navigate("/");
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
  return (
    <>
      {isError ? (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setError("")}
        >
          <span>
            <p>
              <span className="font-medium">{isError}</span>
            </p>
          </span>
        </Alert>
      ) : (
        isError
      )}
      
      <div className="flex flex-col items-center justify-center my-32 ml-96 mr-96 bg-[#0E8388]
      border-4 rounded border-[#CBE4DE] pt-16 pb-16" >
        <span className="font-bold text-white">input employee email and their corresponding salary</span>
        <Formik
          initialValues={{
            email: "",
            basic_salary: "",
          }}
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
                    htmlFor="basic_salary"
                    value="employee salary"
                    className="text-white"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px", width: "350px" }}
                  id="basic_salary"
                  name="basic_salary"
                  required
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.basic_salary}
                />
              </div>
              <Button type="submit" className="bg-[#2E4F4F] border-2 border-[#CBE4DE]">Send</Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage;
