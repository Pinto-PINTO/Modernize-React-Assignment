import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const RegionsWidget = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePromises = [
          fetch('https://api.worldbank.org/v2/country/Z7?format=json'),
          fetch('https://api.worldbank.org/v2/country/ZQ?format=json'),
          fetch('https://api.worldbank.org/v2/country/Z4?format=json'),
          fetch('https://api.worldbank.org/v2/country/ZG?format=json'),
          fetch('https://api.worldbank.org/v2/country/8S?format=json'),
        ];

        const responses = await Promise.all(responsePromises);
        const dataPromises = responses.map((response) => response.json());
        const countryData = await Promise.all(dataPromises);

        setCountryData(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardCard title="Regions and ISO Codes">
      <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0,
              paddingLeft: 0,
            },
          }}
        >
        {countryData.map((country, index) => {
          const iso2Code = country[1]?.[0]?.iso2Code;
          const name = country[1]?.[0]?.name;
          const capitalCity = country[1]?.[0]?.capitalCity;

          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>{iso2Code}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">{name}</Typography>{' '}
                <Link href="/" underline="none">
                  {capitalCity}
                </Link>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </DashboardCard>
  );
};

export default RegionsWidget;
