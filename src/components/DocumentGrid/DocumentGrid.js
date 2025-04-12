import React from 'react';
import DocumentCard from '../DocumentCard/DocumentCard';

const DocumentGrid = ({ documents, viewMode }) => {
  return (
    <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''} gap-6 mt-6`}>
      {documents.map((document, index) => (
        <DocumentCard key={index} document={document} />
      ))}
    </div>
  );
};

export default DocumentGrid;