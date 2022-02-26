import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import {Customisation} from './customisationView';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiTypography: {
      defaultProps: {
        // The default props to change
        display: "block",
      },
    },
  },
});

export function MediaCard({ pizza }: any) {
  
  const [openCustomisation, updateCustomisation ] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ 
      width: 250,
      display: 'flex',
      margin: "1rem",
      flexDirection: "column", 
      }}>
      <CardMedia
        component="img"
        height="140"
        image={pizza?.img_url}
        alt="sorry"
      />
      <CardContent sx={{ flexGrow:1}}>
        <Typography  align="center" lineHeight="1.3"  variant="subtitle2" component="div">
          <Box style={{marginBottom:'10px'}}>{pizza?.name} </Box>
        </Typography>
        <Typography   align="center" lineHeight="1" variant="caption" color="text.secondary">
          <Box style={{marginBottom:'10px'}}>{pizza?.description} </Box>
        </Typography>
      </CardContent>
      <Rating
        precision={0.5}
        readOnly
        value={pizza?.rating}
        name="size-small"
        defaultValue={2}
        size="small"
        sx= {{alignSelf: "center"}}
        />
      <CardActions>
        <Button onClick={() => updateCustomisation(true)}>+Add-</Button>
        { openCustomisation ? <Customisation selectedPizza = {pizza} updateCustomisation = {updateCustomisation}/> : null}
      </CardActions>      
    </Card>
    </ThemeProvider>
  );
}
