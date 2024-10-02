import React from 'react';
import FM from '../Images/FM.png';
import ExpanceMaster from '../Images/expancemaster.jpg';
import Gallary from '../Images/Gallary.png';
import Locker from '../Images/Locker.png';
import Bussiness from '../Images/Bussiness.png';
import Todo from '../Images/Todo.png';
import { IoDiamondSharp } from "react-icons/io5";
import graph from '../Images/graph.png';
// import Addexpense from '../Images/Addexpense.png';
import Expensereport from '../Images/expensereport.png';
import Fitness from '../Images/Fitness.png';
import Targets from '../Images/Targets.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

function TargetDashboard() {
  const navigate = useNavigate();
  const items = [
    { src: ExpanceMaster, label: 'Goals', url: '/goals' },
    { src: Todo, label: 'To Do', url: '/todo' },
    { src: '', label: 'Coming Soon...', url: '#' }, // Add url for 'Coming Soon...' items
    { src: '', label: 'Coming Soon...', url: '#' },
    { src: '', label: 'Coming Soon...', url: '#' }, // Add url for 'Coming Soon...' items
    { src: '', label: 'Coming Soon...', url: '#' },
    { src: '', label: 'Coming Soon...', url: '#' }, // Add url for 'Coming Soon...' items
    { src: '', label: 'Coming Soon...', url: '#' }, // Add url for 'Coming Soon...' items
    { src: '', label: 'Coming Soon...', url: '#' }  // Add url for 'Coming Soon...' items
  ];

  // Handle click event
  const handleClick = (url) => {
    
    if (url !== '#') {
      navigate(url); // Use navigate to handle the URL change
    }
  };
  const handleCancel = () => {
    navigate('/dashboard')
  }
  return (
    <div className="h-screen flex flex-col p-1">
      <div className="max-w-md flex items-center justify-between mb-4">
  <div className="flex-1 text-center text-2xl">
    <b>Target Dashboard shahna</b>
  </div>
  <div className="ml-4">
    <button onClick={handleCancel} className="flex items-center">
      <MdCancel />
    </button>
  </div>
</div>

     
      
      <div className="h-1/3 flex justify-center items-center mb-4">
        <img className="w-full h-full object-cover" src={graph} alt="Sunset in the mountains" />
      </div>
      
      <div className="flex-1 grid grid-cols-3 gap-4 place-items-center">
        {items.map((item, index) => (
          <div key={index} onClick={() => handleClick(item.url)} className="flex flex-col items-center cursor-pointer">
            <div className="rounded-full overflow-hidden w-20 h-20">
              {item.src ? (
                <img
                  className="w-full h-full object-cover"
                  src={item.src}
                  alt={`Image ${index + 1}`}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <span className="mt-2 text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TargetDashboard;
