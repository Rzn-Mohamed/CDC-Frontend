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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Function to create random pastel color for avatar backgrounds
  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-200', 'bg-blue-200', 'bg-green-200', 
      'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
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
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2 overflow-hidden">
          {document.contributors.map((contributor, index) => (
            <div 
              key={index} 
              className={`${getAvatarColor(contributor)} inline-flex items-center justify-center h-8 w-8 rounded-full border-2 border-white text-sm font-medium text-gray-800`}
              title={contributor}
            >
              {getInitials(contributor)}
            </div>
          ))}
        </div>
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-800">
          {document.version}
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;