import React, { useEffect, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { BaseUrl } from '../config/config';
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function ExpenseMaster() {
  const [expense, setExpense] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${BaseUrl}master/getexpenses`)
      .then((response) => setExpenseData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    const expenseList = {
      expense,
      date: new Date()
    };



    axios.post(`${BaseUrl}master/setexpense`, expenseList)
      .then((response) => {
        if (response.data.message === "Expense Added successfully") {
          toast.success("Expense Added successfully");
          setExpenseData((prevData) => [...prevData, expenseList]);
          setExpense("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Expense Add failed");
      });
  };

  const handleCancel = () => {
    navigate('/FinanceDashboard')
  }
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit'
    };

    return date.toLocaleString('en-GB', options).replace(',', '');
};
  return (
    <div className='flex flex-col min-h-screen p-2'>
    <div className='mb-4 flex w-full items-center'>
  <div className='flex-1 flex justify-center'>
    <b>Expense Master</b>
  </div>
  <div className='flex justify-end'>
    <button onClick={ handleCancel}><MdCancel /></button>
  </div>
</div>


      <div className='flex-grow overflow-y-auto'>
        {expenseData.map((item, index) => (
          <div key={index} className="p-4 flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full">
            <div className='flex w-full'>
              <div className='mr-4'>{index + 1}</div>
              <div>{item.expense}</div>
              <div className='ml-auto'>{formatDate(item.date)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center mt-4'>
        <div className='w-full flex'>
          <div className="relative w-[85%] md:w-[90%]">
            <input
              className="peer w-full h-10 bg-transparent text-blue-gray-700 outline-none placeholder-shown:border-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder="Add Expense"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
          </div>
          <div className='w-[15%] md:w-[10%] flex items-center justify-center border ml-1 border-gray-500 rounded-md'>
            <IoMdSend style={{ fontSize: '1.3rem' }} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseMaster;
