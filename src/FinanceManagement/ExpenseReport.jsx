import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { BaseUrl } from '../config/config';
import { data } from 'autoprefixer';
import { format } from 'date-fns';
import * as XLSX from 'xlsx'; // Import xlsx library
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


function ExpenseReport() {
    const navigate = useNavigate();
const TABLE_HEAD = [];    
const [Data, setData] = useState([])
const groupedData = [];
const uniqueDates = [...new Set(Data.map((el) => format(el.createdAt, "dd-MM-yyyy")))];
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Get current date
  const currentDate = new Date();
  
  // Calculate date 30 days back
  const thirtyDaysBack = new Date();
  thirtyDaysBack.setDate(currentDate.getDate() - 30);
  
  // Set the formatted dates
  const [FromDate, setFromDate] = useState(formatDate(thirtyDaysBack));
  const [ToDate, setToDate] = useState(formatDate(currentDate));

uniqueDates.forEach((date) => {
  const filteredData = Data.filter((el) => format(el.createdAt, "dd-MM-yyyy") === date);
  
  groupedData.push({ date, data: filteredData });
});

console.log(groupedData)


const exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: 'Expense Report',
    Subject: 'Data from Expense Report',
    Author: 'Your Name',
    CreatedDate: new Date()
  };

  groupedData.forEach(group => {
    const ws = XLSX.utils.json_to_sheet(group.data);
    XLSX.utils.book_append_sheet(wb, ws, group.date);
  });

  XLSX.writeFile(wb, 'expense_report.xlsx');
};
useEffect(() => {
  const params = { fromDate: FromDate, toDate: ToDate };

  axios.get(BaseUrl + 'master/main/getexpensebydate', { params })
    .then(function (response) {
      console.log("response.data", response.data);
      setData(response.data);
    })
    .catch(function (error) {
      console.error(error); // Log the error for debugging
    });

  console.log(FromDate);
}, [FromDate, ToDate]);

const reportRef = useRef(null);
const handleCancel = () => {
    navigate('/FinanceDashboard')
  }
const exportToPDF = () => {
  if (!reportRef.current) return;

  const input = reportRef.current;

  html2canvas(input, { scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('expense_report.pdf');
    });
};

  return (
    <div className='p-2' >


<div className='w-full mt-1 p-4 flex bg-white fixed z-10 '>

    <h2 className="flex-1 text-black"><b>Expense Report</b></h2>
    
    <div className='justify-end flex'>
      <button onClick={exportToExcel} className="  text-green-700 font-bold py-2 px-4 rounded">
        <RiFileExcel2Fill style={{fontSize:"1.5rem"}}/>
      </button>
      <button onClick={exportToPDF} className="  text-red-600 font-bold py-2 px-4 rounded">
        <FaDownload style={{fontSize:"1.5rem"}}/>
      </button>
      <div className='flex justify-end 'style={{marginTop:'-50px'}}>
    <button onClick={ handleCancel}><MdCancel /></button>
  </div>
    </div>
  </div>
<div className="flex gap-1 "style={{marginTop:'90px'}}>
<div className="relative h-10 mb-3 flex-1 ">
      <input
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" "
      type='date'
      value={FromDate}
      onChange={(e)=>{setFromDate(e.target.value)}}
      
      />
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
        From Date
      </label>
    </div>
    <div className="relative h-10 mb-3 flex-1">
      <input
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" "
      type='date'
      value={ToDate}
      onChange={(e)=>{setToDate(e.target.value)}}
      
      />
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
        To Date
      </label>
    </div>

</div>

<Card className="h-full w-full overflow-scroll mb-3">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
      
      </table>
    </Card>
    <div className='mt-5 ' style={{marginBottom:'80px'}} ref={reportRef}>
    {groupedData.map((group) => (
      <div key={group.date} className="mb-2">
        <div className="mb-5">
          Date: <b>{group.date}</b>
        </div>
        <table class="table-auto border border-collapse mx-auto w-full bg-white shadow-md rounded-lg p-4 ">
          <thead>
            <tr class="justify-center">
              <th class="px-4 py-2 border w-1/3 whitespace-normal">PaymentType</th>
              <th class="px-4 py-2 border w-1/3 whitespace-normal">Expense</th>
              <th class="px-4 py-2 border text-red-500 w-1/3 whitespace-normal">₹Amount</th>
            </tr>
          </thead>
          <tbody>
            {group.data.map((el, index) => (
              <tr key={index}>
                <td class="px-4 py-2 border">{el.PaymentType}</td>
                <td class="px-4 py-2 border whitespace-normal">{el.Expense}</td>
                <td class="px-4 py-2 border text-red-500 justify-end flex">₹{el.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>









{/* ---------------------------------------------------bottom fixed portion------------------------------------------------ */}


<div className='fixed inset-x-0 bottom-0 md:ml-[330px]'>
<div class="bg-blue-100 text-black shadow-md rounded-lg p-4 flex">
  <div className=' w-full'> <h5 class="font-bold text-lg mb-2">Total Amount</h5></div>
  <div className='justify-end w-full flex text-red-500'><b><p class="text-end">:₹{
    Data.reduce((acc,el)=>{
        return acc+el.Amount
    },0)}</p></b></div> 
</div>
</div>

    </div>
  )
}

export default ExpenseReport