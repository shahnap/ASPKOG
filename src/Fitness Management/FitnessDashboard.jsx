import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function FitnessDashboard() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [dummyData, setDummyData] = useState([]);
  const generateDummyData = () => {
    const dataArray = [];
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(2024, 9, i); // Month is 0-indexed, so 9 is October
      const day = daysOfWeek[date.getDay()];
  
      // Generate a random integer between 0 and 2
      const randomState = Math.floor(Math.random() * 3);
      let status;
  
      // Assign the status based on the random value
      if (randomState === 0) {
        status = true; // Task is done
      } else if (randomState === 1) {
        status = false; // Task is not done
      } else {
        status = 'pending'; // Task is pending
      }
  
      // Format date to YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0]; // Converts to ISO string and gets the date part
  
      dataArray.push({
        Date: formattedDate, // Updated to reflect the full date
        Day: day,
        isDone: status // Use the new status variable
      });
    }
    
    return dataArray;
  };
  
  console.log(generateDummyData());
  
const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/dashboard')
  }

  const handledayupdate = (item) => {
    console.log('day updated',item);
  }


  useEffect(() => {
    setDummyData(generateDummyData());
  }, []);

  return (
    <div>
      <div className='p-2 h-full w-full '>
      <div className="max-w-md flex items-center justify-between mb-4">
  <div className="flex-1 text-center text-2xl">
    <b>Fitness Management</b>
  </div>
  <div className="ml-4">
    <button onClick={handleCancel} className="flex items-center">
      <MdCancel />
    </button>
  </div>
</div>
        <div className='grid grid-cols-7 grid-rows-5 gap-2 rounded-lg border p-2'>
          {dummyData.map((item, index) => (
            <div key={index} className={`p-1 rounded-lg shadow ${item.isDone === true ? 'bg-green-200' : item.isDone === false ? 'bg-red-200' : 'bg-yellow-200'}`} onClick={() => { handledayupdate(item) }}>
             
              <div>{item.Day}</div>
              <div className='flex justify-center text-2xl font-bold'>
      {new Date(item.Date).getDate()}
    </div>
              {/* <div>{item.isDone ? '✅' : '❌'}</div> */}
            </div>
          ))}
        </div>
        <div className='p-4 '>
  <h2 className='text-xl font-semibold mb-4'>Health Metrics</h2>
  <div className='grid grid-cols-2 gap-4'>
    <div className='bg-blue-200 p-3 rounded-lg hover:bg-blue-300 transition duration-200'>
      <strong>Weight:</strong> 120 kg
    </div>
    <div className='bg-green-200 p-3 rounded-lg hover:bg-green-300 transition duration-200'>
      <strong>Height:</strong> 1.75 m
    </div>
    <div className='bg-yellow-200 p-3 rounded-lg hover:bg-yellow-300 transition duration-200'>
      <strong>BMI:</strong> 21.2
    </div>
    <div className='bg-red-200 p-3 rounded-lg hover:bg-red-300 transition duration-200'>
      <strong>Blood Pressure:</strong> 120/80 mm Hg
    </div>
    <div className='bg-purple-200 p-3 rounded-lg hover:bg-purple-300 transition duration-200'>
      <strong>Heart Rate:</strong> 75 beats per minute
    </div>
    <div className='bg-pink-200 p-3 rounded-lg hover:bg-pink-300 transition duration-200'>
      <strong>Sleep Duration:</strong> 7 hours
    </div>
    <div className='bg-orange-200 p-3 rounded-lg hover:bg-orange-300 transition duration-200'>
      <strong>Calorie Intake:</strong> 2500 calories
    </div>
    <div className='bg-teal-200 p-3 rounded-lg hover:bg-teal-300 transition duration-200'>
      <strong>Step Count:</strong> 12,000 steps
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default FitnessDashboard;
