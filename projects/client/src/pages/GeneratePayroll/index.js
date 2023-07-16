import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button, Label } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import DatepickerField from "./Datepickerfield";
import { Formik, Field } from 'formik';
import rupiah from '../../utils/currency';


function GeneratePayroll() {

    const [isError, setError] = useState("");
    const [employeePayroll, setEmployeePayroll] = useState({});
    const [employeeData, setEmployeeData] = useState([]);
    const [alertMessage, setAlertMessage] = ("");
  
    const token = localStorage.getItem("token");

    useEffect(() => {

        axios.get('http://localhost:8000/api/attendance/employee',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          setEmployeeData(response.data.data);
          setAlertMessage(response.data.message);
        })
        .catch((err) => {
          setError(err.response.data.message) 
        });
    
      }, [])

    const handleSubmit = (values) => {
        axios
          .post(`http://localhost:8000/api/attendance/payroll`, values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    
          .then((response) => {
            alert("payroll generated");
            setEmployeePayroll(response.data.data);
            setAlertMessage(response.data.message);
          })
          .catch((err) => {
            setError(err.response.data.message) 
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
      ) : alertMessage
      }
    <Formik
          initialValues={{
            id: "",
            year_month: "",
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <div className='grid grid-cols-3 grid-flow-row mt-4 ml-4 text-[#0E8388] font-bold' >
            <form className="grid gap-4" onSubmit={props.handleSubmit}>
                <div className="mb-2 block">
                <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="employee"
                    value="employee"
                    className="text-white"
                  />
                </div>
            <Field as="select" name="id">
                {employeeData.map((Employee) => (
                    <option key={Employee.id} value={Employee.user_id}>
                        {Employee.id}. {Employee.full_name}
                    </option>
                ))}
             </Field>
                <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="year_month"
                    value="choose the month and year to generate payroll"
                    className="text-white"
                  />
                  <Field name="year_month" component={DatepickerField} />
                  <Button type="submit" className="bg-[#2E4F4F] border-2 border-[#CBE4DE]">
                    Generate
                </Button>
            </form>
            <div>payroll: {employeePayroll.total_payroll ? rupiah(employeePayroll.total_payroll): "not yet generated"}</div>
            <div>deduction: {employeePayroll.total_deduction ? rupiah(employeePayroll.total_deduction): "not yet generated"}</div>
        </div>
          )}
        </Formik>
      </>
    )
  }
  
  export default GeneratePayroll