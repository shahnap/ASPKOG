import { BaseUrl } from '../config/config';
import { button } from '@material-tailwind/react';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel, MdNotificationImportant } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function ToDo() {
  const [Data, setData] = useState([]);
  const [Target, setTarget] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(BaseUrl + 'master/main/gettarget').then(function (response) {
      setData(response.data);
    }).catch(function (err) {
      alert(err);
    });
  }, []);

  const handleOpenModal = (id, status) => {
    setSelectedId(id);
    setStatus(status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setStatus(null);
  };

  const handleConfirm = () => {
    HandelUrgent(selectedId);
    handleCloseModal();
  };

  const HandelUrgent = (id) => {
    const payload = { Id: id };
    axios.post(BaseUrl + 'master/main/addtourgent', payload)
      .then(() => {
        toast.success("Target Added to urgent list");
        axios.get(BaseUrl + 'master/main/gettarget').then(function (response) {
          setData(response.data);
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const HandelAddTarget = () => {
    const newData = {
      name: Target,
      Status: 0
    };
    axios.post(BaseUrl + 'master/main/addTarget', newData)
      .then(() => {
        toast.success("Target Added Successfully");
        axios.get(BaseUrl + 'master/main/gettarget').then(function (response) {
          setData(response.data);
        }).catch(function (err) {
          alert(err);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
    setTarget("");
  };

  const handleCancel = () => {
    navigate('/TargetDashboard');
  };

  useEffect(() => {
    console.log("Data:", Data);
  }, [Data]);

  return (
    <div className='flex flex-col h-screen p-2'>
      <div className='mb-4 flex w-full items-center'>
        <div className='flex-1 flex justify-center'>
          <b>Expense Master</b>
        </div>
        <div className='flex justify-end'>
          <button onClick={handleCancel}><MdCancel /></button>
        </div>
      </div>

      {/* Notification area */}
      {/* <div className='border mb-2'>
        <div className='p-2 w-full flex justify-end'>
          <div><MdNotificationImportant style={{ marginTop: "5px" }} /></div>
          <span className='text-gray-500'> : this means not urgent</span>
        </div>
        <div className='p-2 w-full flex mb-2 justify-end'>
          <div><MdNotificationImportant color='red' style={{ marginTop: "5px" }} /></div>
          <span className='text-gray-500'> : this means urgent</span>
        </div>
      </div> */}

      {/* Modal for confirming action */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
            <p className="mb-6">
              {status === 1
                ? "Are you sure you want to remove this from urgent?"
                : "Are you sure you want to mark this item as urgent?"}
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Main content section */}
      <div className='flex-grow overflow-y-auto'>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white md:max-w-full">
          <div className="p-4">
            {Data?.map((item, index) => (
              <div key={index} className='flex items-center border-b pb-4'>
                <div className='flex flex-col'>
                  <div className='text-green-600 text-base'><b>{index + 1}</b></div>
                </div>
                <div className='ml-3 mt-2 flex flex-col'>
                  <div className='text-gray-700 text-base'>{item.name}</div>
                  <div className='text-gray-500 text-sm'>{format(new Date(item.Date), "dd-MM-yyyy")}</div>
                </div>
                <div className='ml-auto flex flex-col items-end'>
                  <button onClick={() => handleOpenModal(item._id, item.Status)}>
                    <MdNotificationImportant
                      color={item.Status === 0 ? 'black' : 'red'}
                      style={{ marginTop: "5px" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Target section at the bottom */}
      <div className='w-full flex gap-2 mt-4'>
        <div className="relative h-10 mb-3 w-full">
        <input
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" "
        value={Target}
        onChange={(e)=>(setTarget(e.target.value))}
        
      />
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
        Add Target 
      </label>
        </div>
        <div>
          <button
            className="align-middle font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg w-full"
            onClick={HandelAddTarget}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
