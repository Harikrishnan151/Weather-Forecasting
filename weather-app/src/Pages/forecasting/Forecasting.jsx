import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../navbar/Navbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fivedayForecast, hourlyForecast, onedayWeatherForecast, onehourForecast } from '../../services/allApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3b82f6',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Forecasting() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [oneHour,setOnehour]=useState([])
  const [hourly,setHourly]=useState([])
  const [onday,setOnday]=useState([])
  const [fiveday,setFiveday]=useState([])
 

  //1 Api call to get 1 hour forecast
  const fetchOnehour=async()=>{
    try {
      const response=await onehourForecast()
      console.log(response.data);
      setOnehour(response.data)
    } catch (error) {
      alert('faild to fetch 1 hour weather forecast')
    }
  }
  console.log(oneHour);

  //2 Api call to get hourly forecast
  const fetchHourlyforecast=async()=>{
   try {
    const result=await hourlyForecast()
    console.log(result.data);
    setHourly(result.data)
   } catch (error) {
    alert('faild to fetch  hourly weather forecast')
   }
  } 
  console.log(hourly);

  //3 Api call to fetch oneday weather forecast
  const fetchOnedayforecast=async()=>{
    try {
      const datas=await onedayWeatherForecast()
      console.log(datas.data);
      setOnday(datas.data)
    } catch (error) {
      alert('faild to fetch one day weather forecast')
    }
  }
  console.log(onday);

  //4Api call to fetch five day weather forecast
  const fetchFivedayforecast=async()=>{
  try {
    const weatherData=await fivedayForecast()
    console.log(weatherData.data);
    setFiveday(weatherData.data)
  
  } catch (error) {
    alert('faild to fetch five day weather forecast')
  }
  console.log(fiveday);

  }
  console.log(fiveday);

  useEffect(()=>{
    fetchOnehour()
    
  },[])

  return (
    <div className='mainbody'>
       <Navbar />
       <Box className='mainbody' sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="One Hour Forecast" {...a11yProps(0)} />
          <Tab onClick={fetchHourlyforecast}  label="Hourly Forecast" {...a11yProps(1)} />
          <Tab onClick={fetchOnedayforecast} label="One Day Forecast" {...a11yProps(2)} />
          <Tab onClick={fetchFivedayforecast} label="Five Day Forecast" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h4>One Hour Forecast</h4>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date & Time</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Tempature</StyledTableCell>
            <StyledTableCell className='px-5' align="right">Weather</StyledTableCell>
            <StyledTableCell align="right">IsDaylight</StyledTableCell>
            <StyledTableCell align="right">Precipitation</StyledTableCell>
            <StyledTableCell align="right">Rain-Probability</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
           oneHour?oneHour.map((onehourWeather) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {onehourWeather.DateTime.slice(8,10)}-{onehourWeather.DateTime.slice(5,8)}{onehourWeather.DateTime.slice(0,4)}
              </StyledTableCell>
              <StyledTableCell align="right"> {onehourWeather.DateTime.slice(11,19)}</StyledTableCell>
              <StyledTableCell align="right">{onehourWeather.Temperature.Value} {onehourWeather.Temperature.Unit }</StyledTableCell>
              <StyledTableCell align="right"> {onehourWeather.IconPhrase}</StyledTableCell>
              <StyledTableCell align="right">{onehourWeather.IsDaylight.toString()}</StyledTableCell>
              <StyledTableCell align="right">{onehourWeather.HasPrecipitation.toString()}</StyledTableCell>
              <StyledTableCell className='px-5' align="right">{onehourWeather.PrecipitationProbability}</StyledTableCell>
            </StyledTableRow>
          )): <div >
            <h5 className='my-2'>Api Key expired</h5>
          </div>
          }
        </TableBody>
      </Table>
    </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <h4> Hourly Forecast</h4>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Tempature</StyledTableCell>
            <StyledTableCell align="right">Weather</StyledTableCell>
            <StyledTableCell align="right">Precipitation</StyledTableCell>
            <StyledTableCell align="right">Rain-Probability</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          hourly?hourly.map((hourlyData) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">

                {hourlyData.DateTime.slice(8,10)}-{hourlyData.DateTime.slice(5,8)}{hourlyData.DateTime.slice(0,4)}
              </StyledTableCell>
              <StyledTableCell align="right"> {hourlyData.DateTime.slice(11,19)}</StyledTableCell>

              <StyledTableCell align="right">{hourlyData.Temperature.Value} {hourlyData.Temperature.Unit }</StyledTableCell>
              <StyledTableCell align="right">{hourlyData.IconPhrase}</StyledTableCell>
              <StyledTableCell align="right">{hourlyData.HasPrecipitation.toString()}</StyledTableCell>
              <StyledTableCell className='px-5' align="right">{hourlyData.PrecipitationProbability}</StyledTableCell>
            </StyledTableRow>
          )):<div>
            <h5 className='my-2'>Api key expired</h5>
          </div>
        }
        </TableBody>
      </Table>
    </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
    <h4>One Day Forecast</h4>   
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell className='px-5' align="right">Weather</StyledTableCell>
            <StyledTableCell align="right">Tempature Max</StyledTableCell>
            <StyledTableCell align="right">Tempature Min</StyledTableCell>
            <StyledTableCell className='px-2' align="right">Day</StyledTableCell>
            <StyledTableCell className='px-5' align="right">Night</StyledTableCell>
            <StyledTableCell align="right">Precipitation</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {
  onday && onday.DailyForecasts && onday.DailyForecasts.length > 0 ? (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
      {onday.DailyForecasts[0].Date.slice(8, 10)}-{onday.DailyForecasts[0].Date.slice(5, 7)}-{onday.DailyForecasts[0].Date.slice(0, 4)}
      </StyledTableCell>
      <StyledTableCell align="right"> {onday.Headline.Text}</StyledTableCell>
      <StyledTableCell className='px-5' align="right">{onday.DailyForecasts[0].Temperature.Minimum.Value} F</StyledTableCell>
      <StyledTableCell className='px-5' align="right">{onday.DailyForecasts[0].Temperature.Maximum.Value} F</StyledTableCell>
      <StyledTableCell align="right">{onday.DailyForecasts[0].Day.IconPhrase}</StyledTableCell>
      <StyledTableCell align="right">{onday.DailyForecasts[0].Night.IconPhrase}</StyledTableCell>
      <StyledTableCell className='px-5' align="right">{onday.DailyForecasts[0].Day.HasPrecipitation ? "Yes" : "No"}</StyledTableCell>
    </StyledTableRow>
  ) : (
    <div>
      <h5 className='my-2'>Api key expired</h5>
    </div>
  )
}

        </TableBody>
      </Table>
    </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
     <h4>Five Day Forecast</h4>  
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date </StyledTableCell>
            <StyledTableCell align="right">Tempature Min</StyledTableCell>
            <StyledTableCell align="right">Temperature Max</StyledTableCell>
            <StyledTableCell className='px-5' align="right">Day</StyledTableCell>
            <StyledTableCell className='px-5' align="right">Night</StyledTableCell>
            <StyledTableCell align="right">Precipitation</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {
  fiveday ? Object.values(fiveday).map((fivedayWeather) => (
    <StyledTableRow key={fivedayWeather.Date}>
      <StyledTableCell component="th" scope="row">
      {fivedayWeather.Date.slice(8, 10)}-{fivedayWeather.Date.slice(5, 7)}-{fivedayWeather.Date.slice(0, 4)}
      </StyledTableCell>
      <StyledTableCell className='px-5' align="right">{fivedayWeather.Temperature.Minimum.Value} F</StyledTableCell>
      <StyledTableCell className='px-5' align="right">{fivedayWeather.Temperature.Maximum.Value} F</StyledTableCell>
      <StyledTableCell align="right">{fivedayWeather.Day.IconPhrase}</StyledTableCell>
      <StyledTableCell align="right">{fivedayWeather.Night.IconPhrase}</StyledTableCell>
      <StyledTableCell className='px-5' align="right">{fivedayWeather.Day.HasPrecipitation ? "Yes" : "No"}</StyledTableCell>


    </StyledTableRow>
  )) : (
    <div>
      <h5 className='my-2'>Api key expired</h5>
    </div>
  )
}
        </TableBody>
      </Table>
    </TableContainer>
      </CustomTabPanel>
    </Box>
  
    </div>
    

  )
}

export default Forecasting