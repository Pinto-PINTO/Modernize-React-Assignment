import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Fab } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const MusicWidget = () => {
  // Accessing theme object from MUI theme
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  // State for managing checked items in the list
  const [checked, setChecked] = React.useState([1]);

  // Function to toggle the checked state of an item
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <DashboardCard
      title="CheckBox"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
            #
        </Fab>
      }
    >
      <>
        {/* List of checkboxes */}
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[
            "Run the AWS Server",
            "Pay fees for Domain and Hosting",
            "Clear Server Cache and Backup",
            "Monetize the Application",
            "SEO on Platforms"
          ].map((item, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem
                key={index}
                disablePadding
              >
                {/* ListItemButton with checkbox and text */}
                <ListItemButton sx={{ justifyContent: 'space-between' }}>
                  <ListItemText 
                    id={labelId} 
                    primary={item} 
                    sx={{ fontSize: '1.2rem' }} 
                  />
                  {/* Checkbox component */}
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </>
    </DashboardCard>
  );
};

export default MusicWidget;
