import { useState } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import DatepickerField from "./Datepickerfield";


import { HiInformationCircle } from "react-icons/hi";

const createSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters at minimum")
      .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
          "Password must contain atleast 1 uppercase letter, 1 symbol, and 1 lowercase letter"
        ),
  });

const SetEmployeeInfo = () => {
    
    const tokenParams = new URLSearchParams(window.location.search).get('token')
  
    const [alertMessage, setAlertMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isError, setError] = useState("");

    const navigate = useNavigate();

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    
    const handleSubmit = (values, action) => {
  
      axios
        .post(`http://localhost:8000/api/auth/access`, values)
  
        .then((response) => {
          alert("data updated, welcome to the company!");
          setAlertMessage(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setError(err.response.data.message) 
        });
    };
  
    return (
      <>
        {alertMessage ? (
          <Alert
            color="success"
            icon={HiInformationCircle}
            onDismiss={() => setAlertMessage("")}
          >
            <span>
              <p>
                <span className="font-medium">{alertMessage}</span>
              </p>
            </span>
          </Alert>
        ) : (
          alertMessage
        )}
        {isError ? (
          <Alert
            color="success"
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
        <Formik
          initialValues={{
            access_token: tokenParams,
            password: "",
            full_name: "",
            birth_date: "",
          }}
          validationSchema={createSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <div className="flex flex-col items-center justify-center my-32 ml-96 mr-96 bg-[#0E8388]
            border-4 rounded border-[#CBE4DE] pt-16 pb-16" >
              <span className="font-bold text-white">input your new password, full name, and birth date</span>
            <form className="flex flex-col gap-4" onSubmit={props.handleSubmit}>
              <div className="flex flex-col justify-center items-center ">
                <div className="mb-2 block">
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
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={props.handleChange}
                  value={props.values.password}
                />
                <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4"
                  checked={isPasswordVisible}
                  onChange={togglePasswordVisibility}
                />
                <span className="text-sm text-white">Show password</span>
              </label>
                <div className="mb-2 block">
                <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="full_name"
                    value="full name"
                    className="text-white"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px", width: "350px" }}
                  id="full_name"
                  name="full_name"
                  required
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.full_name}
                />
                <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="birth_date"
                    value="birth date"
                    className="text-white"
                  />
                  <Field name="birth_date" component={DatepickerField} />
                  <Button type="submit" className="bg-[#2E4F4F] border-2 border-[#CBE4DE]">
                    Post
                </Button>
              </div>
            </form>
        </div>
          )}
        </Formik>
      </>
    );
  };

export default SetEmployeeInfo;
