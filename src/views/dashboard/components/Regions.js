import React, { useState, useEffect } from 'react';
import { Typography, Link, Grid, Card, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';

// Define a functional component called Regions
const Regions = () => {

  const [countryData, setCountryData] = useState([]);

  // Effect hook to fetch country data on component mount
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
 
        const response = await fetch('https://api.worldbank.org/v2/country?format=json');
        const data = await response.json();
        // Update country data state with fetched data (Data array is at index 1)
        setCountryData(data[1]);
      } catch (error) {

        console.error('Error fetching country data:', error);
      }
    };

    // Call fetchData function
    fetchData();
  }, []); 


  return (
    <PageContainer title="Regions" description="this is Sample page">
      <DashboardCard title="Regions and ISO Codes">
        <Typography>
          The <b>World Bank API</b> provides access to a vast array of economic data and indicators from around the globe. <br/><br/>
          Utilizing the endpoint <a href="https://api.worldbank.org/v2/country?format=json">https://api.worldbank.org/v2/country?format=json</a>, developers can access information pertaining to regions, countries, income levels, lending types, and more.
          <br/><br/>
          This API serves as a valuable resource for researchers, economists, policymakers, and developers interested in analyzing global economic trends, conducting comparative studies, or integrating economic data into their applications.
        </Typography>
        <br/>
        <br/>
        {/* Grid layout to display country data */}
        <Grid container spacing={3}>
          {/* Mapping through country data to render cards */}
          {countryData.map((country, index) => {
            const iso2Code = country.iso2Code;
            const name = country.name;
            const capitalCity = country.capitalCity;

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                  {/* Displaying country name */}
                  <Typography variant="h5" sx={{ color: '#557fb9' }}>{name}</Typography>
                    {/* Displaying ISO code */}
                    <Typography variant="body1">ISO Code: {iso2Code}</Typography>
                    {/* Displaying capital city */}
                    <Typography variant="body1">
                      Capital City: <Link href="/">{capitalCity}</Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};


export default Regions;
