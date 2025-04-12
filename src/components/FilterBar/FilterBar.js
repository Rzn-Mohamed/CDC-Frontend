import React from 'react';

const FilterBar = ({ setViewMode, viewMode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Recent Cahier de Charges</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="relative">
          <select 
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue="recent"
          >
            <option value="recent">Sort by: Recent</option>
            <option value="name">Sort by: Name</option>
            <option value="size">Sort by: Size</option>
            <option value="type">Sort by: Type</option>
          </select>
        </div>
        
        {/* View Toggle Button - Hidden on Mobile */}
        <div className="hidden sm:flex border border-gray-300 rounded-md">
          <button
            className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} rounded-l-md focus:outline-none`}
            onClick={() => setViewMode('grid')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            className={`px-4 py-2 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} rounded-r-md focus:outline-none`}
            onClick={() => setViewMode('list')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;