import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdCancel } from 'react-icons/md';
import HDFC from '../Images/HDFC.png';
import CR1 from '../Images/CR-1.png';
import CR2 from '../Images/CR-2.jpg';
import Federal from '../Images/Federal.jpg';
import Liquid from '../Images/Liquid.png';
import SBI from '../Images/SBI.png';
import { BaseUrl } from '../config/config';
import axios from 'axios';

function AddExpance() {
  const [Amount, setAmount] = useState('');
  const [Expense, setExpense] = useState('');
  const [PaymentType, setPaymentType] = useState('');
  const [ExpenseData, setExpenseData] = useState([]);
  const [Data, setData] = useState([]);
  const [AddExpense, setAddExpense] = useState('');
  const navigate = useNavigate();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

  const PaymentData = [
    { Id: 1, Name: "HDFC" },
    { Id: 2, Name: "Federal" },
    { Id: 3, Name: "Savings" },
    { Id: 4, Name: "SBI" },
    { Id: 5, Name: "CARD 1" },
    { Id: 6, Name: "CARD 2" }
  ];

  const imageMap = {
    'HDFC': HDFC,
    'Federal': Federal,
    'Savings': Liquid, // Assuming 'Liquid.png' for Savings
    'SBI': SBI,
    'CARD 1': CR1,
    'CARD 2': CR2
  };

  const handleClear = () => {
    setAmount('');
    setExpense('');
    setPaymentType('');
  };

  const handleCancel = () => {
    navigate('/FinanceDashboard')
  }

  const handleSubmit = () => {
    let Details = {
      Amount: Amount,
      Expense: Expense,
      PaymentType: PaymentType
    };

    if (Details) {
      axios.post(BaseUrl + 'master/main/addexpense', Details)
        .then((response) => {
          toast.success("Successfully added");
          setAddExpense(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleClear();
  };

  const handleNumberClick = (number) => {
    setAmount((prev) => prev + number);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    axios.get(BaseUrl + 'master/getexpenses').then(function (response) {
      console.log("response", response);
      setExpenseData(response.data);
    }).catch(function (err) {
      alert(err);
    });

    axios.get(BaseUrl + 'master/main/getexpense').then(function (response) {
      console.log("response added expense", response);
      setData(response.data);
    }).catch(function (err) {
      alert(err);
    });
  }, [AddExpense]);

  return (
    <div className='w-full h-screen p-4 flex flex-col'>
      <div className='mb-4 flex items-center'>
        <div className='flex-1 flex justify-center'>
          <b>Expense Master</b>
        </div>
        <div className='flex justify-end'>
          <button onClick={handleCancel}><MdCancel /></button>
        </div>
      </div>

      <div className='flex-grow overflow-y-auto'>
        <div className="max-w-sm rounded overflow-hidden bg-white md:max-w-full">
          <div className="p-4 max-h-[300px] overflow-y-auto">
            {Data?.map((item, index) => (
              <div key={index} className='flex items-center border-b pb-4'>
                <img
                  src={imageMap[item.PaymentType]}
                  alt="avatar"
                  className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                />
                <div className='ml-2 flex flex-col'>
                  <div className='text-gray-700 text-base'>{item.Expense}</div>
                  <div className='text-gray-500 text-sm'>{formatDate(item.createdAt)}</div>
                </div>
                <div className='ml-auto flex flex-col items-end'>
                  <div className='text-red-600 text-base'><b>{item.Amount}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full p-4 flex-shrink-0'>
        <div className="relative h-30 mb-4 border rounded bg-gray-100 p-2">
          <div className="dial-panel h-full flex flex-col justify-between">
            <div className="amount-display justify-center flex p-2 text-lg ">{Amount || '0.00'}</div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                <button
                  key={num}
                  className="dial-button"
                  onClick={() => handleNumberClick(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button className="dial-button" onClick={handleDelete}>←</button>
            </div>
          </div>
        </div>

        <div className="relative h-12 w-full min-w-[200px] mb-4">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={Expense}
            onChange={(e) => setExpense(e.target.value)}
          >
            <option value="">Select Expense</option>
            {ExpenseData.map(item => (
              <option key={item._id} value={item.expense}>
                {item.expense}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900">
            Expense
          </label>
        </div>

        <div className="relative h-12 w-full min-w-[200px] mb-4">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={PaymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">Select Payment Type</option>
            {PaymentData.map(item => (
              <option key={item.Id} value={item.Name}>
                {item.Name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900">
            Payment Type
          </label>
        </div>

        <div className='flex w-full'>
          <button onClick={handleSubmit} className='bg-black w-full text-white px-4 py-2 rounded'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddExpance;
