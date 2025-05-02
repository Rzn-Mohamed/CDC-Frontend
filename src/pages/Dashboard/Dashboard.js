import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import FilterBar from '../../components/FilterBar/FilterBar';
import DocumentGrid from '../../components/DocumentGrid/DocumentGrid';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import Modal from '../../components/Modal/Modal';
import CDCForm from '../CDCForm/CDCForm';
import { documentsData } from '../../utils/dummyData';

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