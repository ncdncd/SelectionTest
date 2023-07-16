import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button, Pagination } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import DatePicker from "react-datepicker";
import moment from 'moment';

function AttendanceLog() {

  const [clockLog, setClockLog] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setError] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthYear, setMonthYear] = useState(new Date())

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
    .catch((err) => console.log(err))

  }, [month, year, currentPage])

  const handleCalendarChange = (date) =>{
    setMonth((new Date(date).getMonth()) + 1);
    setYear(new Date(date).getFullYear());
    setMonthYear(date);
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
    <div className='text-white'>choose month and year of attendance</div>
    <div>
      <DatePicker
      selected={monthYear}
      onChange={(date) => handleCalendarChange(date)}
      dateFormat="MM-yyyy"
      showMonthYearPicker
    />
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