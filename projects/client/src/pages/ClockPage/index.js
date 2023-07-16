import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Clock from 'react-live-clock';
import moment from 'moment'


function ClockPage() {

  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [isError, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios(`http://localhost:8000/api/attendance/clock`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setClockIn(response.data.data.clock_in);
      setClockOut(response.data.data.clock_out);
    })
    .catch((err) => {
      setError(err.response.data.message) 
    });
    

  }, [])

  const handleSubmitIn = (value, action) => {

    axios
      .post(`http://localhost:8000/api/attendance/clockin`,null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       )
      .then((response) => {
        alert("clocked in for today");
        setClockIn(response.data.data)
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  
  }

  const handleSubmitOut = (value, action) => {

    axios
      .patch(`http://localhost:8000/api/attendance/clockout`,null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       )
      .then((response) => {
        alert("clocked out for today");
        setClockOut(response.data.data)
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
    <div className='grid grid-cols-2 mt-4'>
        <Button onClick={handleSubmitIn} className="bg-[#CBE4DE] border-3 border-[#0E8388]">
        <div className='text-[#2C3333]'>Clock in</div></Button>
        <Button onClick={handleSubmitOut} className="bg-[#CBE4DE] border-3 border-[#0E8388]">
        <div className='text-[#2C3333]'>Clock Out</div></Button>
        <div className='text-white'>Clock in time: {clockIn ? clockIn : "haven't clocked in today"}</div>
        <div className='text-white'>Clock out time: {clockOut ? clockOut : "haven't clocked out yet"}</div>
        <Clock className='text-white' format={'HH:mm:ss'} ticking={true} />
        <div className='text-white'>{moment().format('dddd MMMM Do YYYY')}</div>
    </div>
  </> 
  )
}

export default ClockPage