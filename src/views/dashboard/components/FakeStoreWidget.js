import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Fab, Typography, Stack, Avatar } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const FakeStoreWidget = () => {
  const theme = useTheme();
  const [productRatings, setProductRatings] = useState([]);
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/');
        const products = await response.json();
        const ratings = products.map(product => product.rating.rate);
        setProductRatings(ratings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: productRatings.map((_, index) => `Product ${index + 1}`),
      labels: {
        style: {
          colors: [secondary],
        },
      },
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.5,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: 'Ratings',
      color: secondary,
      data: productRatings,
    },
  ];

  return (
    <DashboardCard
      title="Fake Store"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="350px" />
      }
    >
      <>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            Data of All Products In The E-Commerce Store
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            2024
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default FakeStoreWidget;
