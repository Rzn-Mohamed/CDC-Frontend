import React from 'react';

const DocumentCard = ({ document }) => {
  const getTypeColor = (type) => {
    const colors = {
      pdf: 'bg-red-100',
      doc: 'bg-blue-100',
      xls: 'bg-green-100',
      ppt: 'bg-orange-100',
      txt: 'bg-gray-100'
    };
    return colors[type] || 'bg-purple-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`${getTypeColor(document.type)} p-4 rounded-lg mr-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-800">{document.title}</h3>
            <p className="text-sm text-gray-500">Last modified: {document.lastModified}</p>
          </div>
        </div>
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end">
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-800">
          {document.version}
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;