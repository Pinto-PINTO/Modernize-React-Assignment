import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

// Define a React functional component called PopulationChartWidget
const PopulationChartWidget = () => {
    // State variables for population data and theme
    const [populationData, setPopulationData] = useState([]);
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // Effect hook to fetch population data on component mount
    useEffect(() => {
        // Define an asynchronous function to fetch data
        const fetchData = async () => {
            // Fetch population data from API
            const response = await fetch(`https://datausa.io/api/data?drilldowns=Nation&measures=Population`);
            // Parse response JSON
            const data = await response.json();
            // Update population data state with fetched data
            setPopulationData(data.data);
        };

        // Call fetchData function
        fetchData();
    }, []); // Dependency array is empty, so effect runs only once on mount

    // Options for the chart
    const options = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: 300000000,
            max: 350000000,
            tickAmount: 4,
        },
        xaxis: {
            // Map population data to x-axis categories
            categories: populationData.map(entry => entry.Year),
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            // Set tooltip theme based on current palette mode
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    // Series data for the chart
    const series = [
        {
            name: 'Population',
            // Map population data to series data
            data: populationData.map(entry => entry.Population),
        }
    ];

    // Return JSX for the PopulationChartWidget component
    return (
        <DashboardCard title="Population of USA">
            <Chart
                options={options}
                series={series}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

// Export the PopulationChartWidget component as default
export default PopulationChartWidget;
