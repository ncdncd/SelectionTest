import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import moment from 'moment'
import DatePicker from "react-datepicker";

function AttendanceLog() {

  const [clockLog, setClockLog] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [monthYear, setMonthYear] = useState(new Date())

  const token = localStorage.getItem("token");

  useEffect((values, page) => {

    axios(`http://localhost:8000/api/attendance/history?page=${page}&perPage`, values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setCurrentPage(page);
      setClockLog(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.totalData / 7));
    })
    .catch((err) => console.log(err))

  }, [monthYear, currentPage])

  return (
    <div>
      <DatePicker
      selected={monthYear}
      onChange={(date) => setMonthYear(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
    <div className='text-white'> {moment(monthYear).format('YYYY-MM')}</div>
    </div>
  )
}

export default AttendanceLog