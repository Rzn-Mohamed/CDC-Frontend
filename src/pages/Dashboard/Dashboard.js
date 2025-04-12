import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import FilterBar from '../../components/FilterBar/FilterBar';
import DocumentGrid from '../../components/DocumentGrid/DocumentGrid';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import { documentsData } from '../../utils/dummyData';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [documents] = useState(documentsData);

  return (
    <Layout>
      <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
      <DocumentGrid documents={documents} viewMode={viewMode} />
      <FloatingActionButton />
    </Layout>
  );
};

export default Dashboard;