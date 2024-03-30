import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const USAPopulation = () => {
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
        <PageContainer title="USA Population" description="this is Sample page">
            <DashboardCard title="USA Population">
            <Typography>
                This is the <b>DataUSA API</b>, providing access to a wealth of statistical data regarding various aspects of the United States. <br></br>The endpoint, <a href="https://datausa.io/api/data?drilldowns=Nation&measures=Population">https://datausa.io/api/data?drilldowns=Nation&measures=Population</a>, specifically offers population data at a national level.
                <br/><br/>
                Users can retrieve aggregated population data, including total counts over time, demographic breakdowns, and related statistics. Valuable for researchers, policymakers, businesses, and anyone interested in U.S. population trends.
                <br/><br/>
                Accessible via simple HTTP requests, the data is machine-readable, facilitating integration into applications, analysis tools, and websites. A comprehensive and reliable resource for U.S. population data.
            </Typography>

                <br></br>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height="370px"
                />
            </DashboardCard>
        </PageContainer>
    );
};

export default USAPopulation;
