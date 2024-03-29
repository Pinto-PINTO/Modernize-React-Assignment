import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import PopulationChart from './PopulationChart'; // Import PopulationChart component

const USAPopulation = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="USA Population">
        <Typography>The data contains the USA Population from Years 2021 to 2013</Typography>
      </DashboardCard>
      {/* Render PopulationChart component */}
      <PopulationChart />
    </PageContainer>
  );
};

export default USAPopulation;
