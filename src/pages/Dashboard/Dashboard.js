import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout.js';
import FilterBar from '../../components/FilterBar/FilterBar.js';
import DocumentGrid from '../../components/DocumentGrid/DocumentGrid.js';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton.js';
import Modal from '../../components/Modal/Modal.js';
import CDCForm from '../CDCForm/CDCForm.js';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load documents from localStorage on component mount
  useEffect(() => {
    // Check if we have saved documents in localStorage
    const savedDocuments = localStorage.getItem('dashboardDocuments');
    
    if (savedDocuments) {
      // If we have saved documents, use them
      setDocuments(JSON.parse(savedDocuments));
    } else {
      // Initialize with empty array if no documents exist
      setDocuments([]);
      // Create empty array in localStorage
      localStorage.setItem('dashboardDocuments', JSON.stringify([]));
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    
    // Reload documents when modal is closed (in case new document was added)
    const savedDocuments = localStorage.getItem('dashboardDocuments');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  };

  return (
    <Layout>
      <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
      {documents.length > 0 ? (
        <DocumentGrid documents={documents} viewMode={viewMode} />
      ) : (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-medium mb-2">Aucun document</h3>
            <p className="max-w-md mx-auto">
              Vous n'avez pas encore de documents. Cliquez sur le bouton + ci-dessous pour créer votre premier cahier des charges.
            </p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Créer un document
          </button>
        </div>
      )}
      <FloatingActionButton onOpenModal={handleOpenModal} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CDCForm onClose={handleCloseModal} />
      </Modal>
    </Layout>
  );
};

export default Dashboard;