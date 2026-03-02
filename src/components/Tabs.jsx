import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, clearResults } from '../redux/features/searchSlice';

const Tabs = () => {
  const dispatch = useDispatch();
  const { activetab } = useSelector((state) => state.search);

  const tabs = [
    { id: 'photos', label: 'Photos', },
    { id: 'videos', label: 'Videos', },
    { id: 'gifs', label: 'GIFs' },
  ];

  const handleTabChange = (id) => {
    dispatch(setActiveTab(id));
    dispatch(clearResults());
  };

  return (
    <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm border border-gray-800 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
            activetab === tab.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
