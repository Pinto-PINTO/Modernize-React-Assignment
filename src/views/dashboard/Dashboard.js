import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import PopulationChartWidget from './components/PopulationChartWidget';
import UserDetailsWidget from './components/UserDetailsWidget';
import RegionsWidget from './components/RegionsWidget';
import UserRecordWidget from './components/UserRecordWidget';
import FakeStoreWidget from './components/FakeStoreWidget';
import CheckboxWidget from './components/CheckboxWidget';
import MusicWidget from './components/MusicWidget';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <PopulationChartWidget />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UserDetailsWidget />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FakeStoreWidget />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RegionsWidget />
          </Grid>
          <Grid item xs={12} lg={8}>
            <UserRecordWidget />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CheckboxWidget />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MusicWidget />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
