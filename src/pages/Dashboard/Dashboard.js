import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import FilterBar from '../../components/FilterBar/FilterBar.js';
import DocumentGrid from '../../components/DocumentGrid/DocumentGrid.js';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton.js';
import Modal from '../../components/Modal/Modal.js';
import CDCForm from '../CDCForm/CDCForm.js';
import { documentsData } from '../../utils/dummyData.js';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [documents] = useState(documentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
      <DocumentGrid documents={documents} viewMode={viewMode} />
      <FloatingActionButton onOpenModal={handleOpenModal} />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CDCForm onClose={handleCloseModal} />
      </Modal>
    </Layout>
  );
};

export default Dashboard;