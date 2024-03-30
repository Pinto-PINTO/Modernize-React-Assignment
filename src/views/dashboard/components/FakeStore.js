import React, { useState, useEffect } from 'react';
import { Typography, Fab, Stack, Avatar } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const FakeStore = () => {
  // Accessing theme object from MUI theme
  const theme = useTheme();
  const [productRatings, setProductRatings] = useState([]); // State for product ratings
  const secondary = theme.palette.secondary.main; // Secondary color from theme
  const secondarylight = '#f5fcff'; // Lighter shade of secondary color

  useEffect(() => {
    // Fetch ratings from API on component mount
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

    fetchRatings(); // Invoke fetchRatings function
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Options for column chart
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

  // Data series for column chart
  const seriescolumnchart = [
    {
      name: 'Ratings',
      color: secondary,
      data: productRatings,
    },
  ];

  return (
    <PageContainer title="Fake Store" description="this is Sample page">
      <DashboardCard
        title="Fake Store"
        footer={
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="350px" />
        }
      >
        <>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Typography>
              The Fake Store API is a convenient tool for developers seeking to integrate realistic e-commerce data into their applications. <br></br>By accessing the API endpoint at <a href="https://fakestoreapi.com/">https://fakestoreapi.com/</a>, developers can retrieve a wide range of mock product data, including categories like electronics, clothing, and groceries.
              <br/><br/>
              The API offers endpoints for various functionalities such as retrieving product listings, accessing specific product details, managing user accounts, and simulating shopping cart interactions. This mock data is invaluable for testing and prototyping e-commerce applications without the need for real-world data integration.
              <br/><br/>
              Accessible through standard HTTP requests, the Fake Store API provides JSON-formatted responses, making it easy to parse and utilize within different programming languages and platforms. Whether you're building a demo, conducting testing, or developing educational resources, the Fake Store API offers a convenient and reliable solution for generating realistic e-commerce scenarios.
          </Typography>
          </Stack>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default FakeStore;
