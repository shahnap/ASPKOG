import React from 'react';
import { useNavigate } from 'react-router-dom';
import FM from '../Images/FM.png';
import Gallary from '../Images/Gallary.png';
import Locker from '../Images/Locker.png';
import Bussiness from '../Images/Bussiness.png';
import { IoDiamondSharp } from "react-icons/io5";
import Fitness from '../Images/Fitness.png';
import Targets from '../Images/Targets.jpeg';

function MainDashBoard() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Array of images and labels with URLs
  const items = [
    { src: FM, label: 'Finance Management', url: '/FinanceDashboard' },
    { src: Targets, label: 'Targets', url: '/TargetDashboard' },
    { src: Fitness, label: 'Fitness', url: '/FitnessDashboard' },
    { src: Bussiness, label: 'Business Management', url: '/business' },
    { src: Gallary, label: 'Gallery', url: '/gallery' },
    { src: Locker, label: 'Locker', url: '/locker' },
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

  return (
    <div className='h-screen p-2 flex flex-col'>
      {/* Header Section */}
      <div className="h-1/3 flex justify-center items-center">
        <div className="text-center text-2xl flex items-center">
          <b>ASPK</b>
          <span className="ml-2">
            <IoDiamondSharp />
          </span>
        </div>
      </div>

      {/* Main Content Section */}
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

export default MainDashBoard;
