import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const PopulationChartWidget = () => {
    const [populationData, setPopulationData] = useState([]);
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://datausa.io/api/data?drilldowns=Nation&measures=Population`);
            const data = await response.json();
            setPopulationData(data.data);
        };

        fetchData();
    }, []);

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
            categories: populationData.map(entry => entry.Year),
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const series = [
        {
            name: 'Population',
            data: populationData.map(entry => entry.Population),
        }
    ];

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

export default PopulationChartWidget;
