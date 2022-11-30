import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import TaskMain from './EmployeeTimesheet/TaskMain';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TimesheetHistory from './EmployeeTimesheet/TimesheetHistory';

const EmployeeTimeSheetMain = () => {

  
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <div className='example'>
      <Row>
        <Col>
        <Card.Title className="my-4">Timesheet </Card.Title>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} sx={{ "& button.Mui-selected": { background: "white",color:"#f5896e" } }} aria-label="lab API tabs example" style={{ background: "#f5896e", borderRadius: "3px", fontSize: "10px",height:"58px",paddingRight:0,color:"black" }}
       // textColor="secondary"
        indicatorColor="#f5896e">
            <Tab style={{paddingRight:"2%",paddingLeft:"2%"}} label=" Submission" value="1" />
            <Tab style={{paddingRight:"2%",paddingLeft:"2%"}} label=" History" value="2" />
    
          </TabList>
        </Box>
        <TabPanel value="1"><TaskMain/></TabPanel>
        <TabPanel value="2"><TimesheetHistory/></TabPanel>
      </TabContext>
    </Box>

           
        </Col>
      </Row>
    </div>
  )
}

export default EmployeeTimeSheetMain

