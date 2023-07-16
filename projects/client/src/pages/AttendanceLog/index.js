import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button, Pagination, TextInput, Label} from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Formik } from 'formik';
import rupiah from '../../utils/currency';

function AttendanceLog() {

  const [clockLog, setClockLog] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setError] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthYear, setMonthYear] = useState(new Date());
  const [payrollMonth, setPayrollMonth] = useState(null);
  const [payrollYear, setPayrollYear] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(`http://localhost:8000/api/attendance/history?page=${currentPage}&year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    .then((response) => {
      setClockLog(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.totalData / 7));
    })
    .catch((err) => {
      setError(err.response.data.message) 
    });

  }, [month, year, currentPage])

  const handleCalendarChange = (date) =>{
    setMonth((new Date(date).getMonth()) + 1);
    setYear(new Date(date).getFullYear());
    setMonthYear(date);
  }

  const handleClickMonth = () =>{
    axios
      .post('http://localhost:8000/api/attendance/payrollmonth', {"year_month": monthYear},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       )
      .then((response) => {
        alert("payroll for the chosen month");
        setPayrollMonth(response.data.data)
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  }

  const handleSubmit = (values) =>{
    axios
      .post('http://localhost:8000/api/attendance/payrollyear',values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       )
      .then((response) => {
        alert("payroll for chosen year");
        setPayrollYear(response.data.data)
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  }
  

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
    <div className='border-solid border-1 border-[#2E4F4F] p-1 bg-[#CBE4DE] text-[#0E8388] font-bold'>choose month and year of attendance</div>
    
    <div>
      <div  className='grid grid-cols-3 grid-flow-row mt-4 text-[#0E8388] font-bold'>
      <DatePicker
      className='mt-3 ml-3'
      selected={monthYear}
      onChange={(date) => handleCalendarChange(date)}
      dateFormat="MM-yyyy"
      showMonthYearPicker
      />
      <button className='border-solid border-2 bg-[#CBE4DE]' onClick={handleClickMonth}>Payroll</button>
      <Formik
          initialValues={{
            year: "",
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <div className='grid grid-cols-3 grid-flow-row mt-4 ml-4 text-[#0E8388] font-bold' >
            <form className="grid gap-4" onSubmit={props.handleSubmit}>
            <div className="">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="year"
                    value="year for payroll"
                    className="text-white"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  id="year"
                  name="year"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.year}
                />
                  <Button type="submit" className="bg-[#2E4F4F] border-2 border-[#CBE4DE]">
                    Generate
                </Button>
            </form>
        </div>
          )}
        </Formik>
      </div>
    <div  className='grid grid-cols-3 grid-flow-row mt-4 text-[#0E8388] font-bold'>
    <div className='border-solid border-2 border-[#2E4F4F] p-2 bg-[#CBE4DE]'>Clock in</div>
    <div className='border-solid border-2 border-[#2E4F4F] p-2 bg-[#CBE4DE]'>Clock Out</div>
    <div className='border-solid border-2 border-[#2E4F4F] p-2 bg-[#CBE4DE]'>Date</div>
    </div>

    {clockLog.map((Clock) => (
          <div  className='grid grid-cols-3 grid-flow-row mt-4 text-white' key={Clock.id}>
            <div className='m-1'>{Clock.clock_in}</div>
            <div className='m-1'>{Clock.clock_out ? Clock.clock_out : "did not clock out"}</div>
            <div className='m-1'>{moment(Clock.date).format("dddd, MMMM Do YYYY")}</div>
          </div>
        ))}
      <div  className='grid grid-cols-2 grid-flow-row mt-4 text-[#0E8388] font-bold'>
      <div>
      Payroll this month: {payrollMonth ? rupiah(payrollMonth.total_payroll) : "payroll not out yet"}
      <br/>
      Deduction: {payrollMonth ? rupiah(payrollMonth.total_deduction) : "payroll not out yet"}
      </div>
      <div>
      Payroll this year: {payrollYear ? rupiah(payrollYear) : "payroll not out yet"}
      </div>
      </div>
    
    
    <Pagination
          currentPage={currentPage}
          layout="pagination"
          onPageChange={setCurrentPage}
          showIcons={true}
          totalPages={totalPages}
        />

    </div>
    </>
  )
}

export default AttendanceLog