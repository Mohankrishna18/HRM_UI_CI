import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Form,
  Table,
  NavLink,
} from "react-bootstrap";
import "./EmployeeDashboard.css";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { BiBriefcaseAlt, BiHome } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";
import { FiUserPlus } from "react-icons/fi";
import axios from "../../../../Uri";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EmployeeDashboardTask from "../EmployeeDashboard/EmployeeDashboardTask";
// import './PMOCard.css'
import "../../../../App.css";

const EmployeeDashboard = () => {
  const userData = sessionStorage.getItem("userdata");
  // console.log(userData);
  const userData1 = JSON.parse(userData);
  const employeeid = userData1.data.employeeId;
  const [getEmployeeDetails, setGetEmployeeDetails] = useState([]);

  const [imge, setImge] = useState([]);
  const [prog, setProg] = useState([]);
  const [projects, setProjects] = useState([]);
  const [date1, setDate] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [leave, setLeave] = useState([]);
  const [holiday, setHoliday] = useState([]);
  // const [data, setData] = useState([]);
  const [conDate, setConDate] = useState([]);

  console.log(date1);

 

 
 

  useEffect(() => {
    axios
      .get(`/emp/getEmployeeDataByEmployeeId/${employeeid}`)
      .then((response) => {
        setGetEmployeeDetails(response.data.data);
      });
  }, []);
  console.log(getEmployeeDetails);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  console.log(date);

 

  useEffect(() => {
    axios.get(`/clientProjectMapping/getAllProjects`).then((response) => {
      setProjects(response.data.data);
    });
  }, []);
  console.log(projects);

  //converted date formate

  useEffect(() => {
    axios.get(`/leave/getAllMonths/${employeeid}`).then((response) => {
      setDate(response.data);
    });
  }, []);


  console.log(date1);
  const counts = {};

for (const num of date1) {
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

console.log(counts[9]);


let jan=counts[1];
let feb=counts[2];
let mar=counts[3];
let apr=counts[4];
let may=counts[5];
let jun=counts[6];
let jul=counts[7];
let aug=counts[8];
let sep=counts[9];
let oct=counts[10];
let nov=counts[11];
let dec=counts[12];
 

  // const counts = {};

  // const sampleArray = date1;

  // console.log(sampleArray);

  // sampleArray.forEach(function (x) {
  //   counts[x] = (counts[x] || 0) + 1;
  // });
  // console.log(counts);
 
  // let a=(Object.keys(counts));
  // console.log();
 
 


 
 
   


  useEffect(() => {
    axios.get(`emp/leavespermonth/${employeeid}`).then((response) => {
      setLeaves(response.data);
    });
  }, []);
  console.log(leaves);
  useEffect(() => {
    axios
      .get(`leave/getcountLeavesofApplyingLeaves/${employeeid}`)
      .then((response) => {
        setLeave(response.data);
      });
  }, []);
  console.log(leave);
  useEffect(() => {
    axios.get(`/holiday/getDataByYearAndMonth/2022/1`).then((response) => {
      setHoliday(response.data);
    });
  }, []);
  console.log(holiday);

  let remainingLeave = leave - leaves;
  console.log(remainingLeave);
  // useEffect(() => {
  //   axios
  //     .get(`/task/getByStatus/${employeeid}/Open`)
  //     .then((response) => {
  //       setData(response.data);
  //     });
  // }, []);
  // console.log(data)

  //   const tasks = tasksList;
  //   const tasksList = tasks.map((tasksList) =>
  //     {tasksList}
  //   )
  //   console.log(tasksList.projectName)

  const project = prog.map((projectName) => projectName.projectName);
  console.log(project);

  const taskTitle = prog.map((taskTitle) => taskTitle.taskTitle);
  console.log(taskTitle);
  const plannedStartDate = prog.map(
    (plannedStartDate) => plannedStartDate.plannedStartDate
  );
  console.log(plannedStartDate);
  const plannedEndDate = prog.map(
    (plannedEndDate) => plannedEndDate.plannedEndDate
  );
  console.log(plannedEndDate);
  const assignDate = prog.map((assignDate) => assignDate.assignDate);
  console.log(assignDate);
  const holidayTitle = holiday.map((holidayTitle) => holidayTitle.holidayTitle);
  console.log(holidayTitle);
  const holidayDate = holiday.map((holidayDate) => holidayDate.holidayDate);
  console.log(holidayDate);
  const history = useHistory();
  return (
    <div
      className="fnt"
      style={{
        fontStyle: "Montserrat",
        fontFamily: "Montserrat",
        fontWeight: "150px",
      }}
    >
      {/* First top row */}

      {/* <Row>
        <Card style={{ paddingBlock: "20px" }}>
          <Row>
            {/* for pic */}
            {/* <Col md="1">
              {" "}
              <Avatar
                src={`data:image/jpeg;base64,${imge.url}`}
                sx={{ width: 76, height: 76 }}
                style={{ variant: "rounded", fontSize: "95px" }}
              />{" "}
            </Col> */}

            {/* for name & details
            <Col style={{ paddingLeft: "20px" }}>
              <h3>
                Welcome , {getEmployeeDetails.firstName}{" "}
                {getEmployeeDetails.lastName}
              </h3>

              <h5 style={{ color: "#666666" }}>{date}</h5>
            </Col>
          </Row>
        </Card>
      </Row> */}

      <br></br>

      {/* Second row */}
      <Row>
        {/* Left side Content */}

        <Col sm={7}>
          <Row>
            <Card style={{height:"50px",width:"100%",justifyContent:"center"}}>
            <h5 style={{paddingTop:"5px",justifyContent:"center"}}>Announcements </h5>
            </Card>
           
          </Row>

          <br></br>
        </Col>

        <Col md={6}>
          <Row>
          <Col md={20} style={{ alignItems: "right" }}>
            <Row>
              {" "}
              <h6
                style={{
                  color: "#4F4F4F",
                  paddingLeft: "15px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  paddingTop: "65px",
                }}
              >
                {" "}
                UPCOMING HOLIDAYS
              </h6>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Table >
                    <thead>
                      <tr style={{backgroundColor:"#f5896e",color:"white"}}>
                        <th>Holiday Title</th>
                        <th>Holiday Date</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {holiday.map((data) => (
                        <tr>
                          <td>{data.holidayTitle}</td>
                          <td>
                            {
                              data.holidayDate
                                .replace(/\b0/g, "")
                                .split("T0")[0]
                            }
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Col>
          </Row>

          {/* <Row>
            {" "}
            <h6
              style={{
                color: "#4F4F4F",
                paddingLeft: "15px",
                fontSize: "15px",
                fontWeight: "bold",
                paddingTop: "65px",
              }}
            >
              {" "}
              PROJECTS{" "}
            </h6>
          </Row> */}
          {/* <Row>
            <Col>
              <Card>
                <Table>
                  <thead>
                    <tr style={{backgroundColor:"#f5896e",color:"white",fontWeight:"-10px"}}>
                      <th>Projects</th>
                      <th>Allocation Start Date</th>
                      <th> Allocation End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((data) => (
                      <tr>
                        <td>{data.projectName}</td>
                        <td>
                          {data.startDate.replace(/\b0/g, "").split("T0")[0]}
                        </td>
                        <td>
                          {data.endDate.replace(/\b0/g, "").split("T0")[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row> */}
{/*
          <br></br> */}

          {/* <Row>
            {" "}
            <h5> TASKS</h5>
            <Col>
              <EmployeeDashboardTask />
            </Col>
          </Row> */}

          <br></br>
        </Col>

        {/* Right side content */}
        <Col style={{paddingTop:"43px"}} md={5}>
          <br></br>

          {/* leave row started */}

          <Row>
            {" "}
            <h6
              style={{
                color: "#4F4F4F",
                paddingLeft: "15px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              YOUR LEAVES
            </h6>{" "}
          </Row>
          <Row>
            <Col>
              <Card
                style={{
                  // height: "500px",
                  overflowY: "auto",
                  overflowX: "hidden",  
                }}
              >
                {/* 1st row */}
                <Row >
                  <Col
                    align="center"
                    style={{ padding: "10px", paddingLeft: "20px" }}
                  >
                    <Card>
                    <h6 align="center" style={{color:"#f5896e"}}>REMAINING LEAVES   {remainingLeave}</h6>
                    </Card>
                  </Col>

                  <Col align="center" style={{ padding: "10px" }}>
                    <Button variant="success"
                      onClick={(event) => {
                        history.push("/app/IntegrateLeaveToApply");
                      }}
                    >
                      Apply Leave
                    </Button>
                  </Col>

                  <Col align="center"  style={{ paddingBlock: "10px" ,height:"30px",paddingRight:"20px"}}>
                    <Card >
                    <h6 style={{color:"#f5896e",paddingBottom:"10px",paddingTop:"10px"}}>TOTAL LEAVES    {leaves}</h6>
                    </Card>
                   
                  </Col>
                </Row>
                <Table>
                  <thead>
                    <tr style={{backgroundColor:"#f5896e",color:"white"}}>
                      <th></th>
                      <th>MONTH</th>
                      <th>LEAVES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>January</td>
                        <td>{jan}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>February</td>
                      <td>{feb}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>March</td>
                      <td>{mar}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>April</td>
                      <td>{apr}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>May</td>
                      <td>{may}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>June</td>
                      <td>{jun}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>July</td>
                      <td>{jul}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>August</td>
                      <td>{aug}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>September</td>
                      <td>{sep}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>October</td>
                      <td>{oct}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>November</td>
                      <td>{nov}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>December</td>
                      <td>{dec}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          {/* <Col md={20} style={{ alignItems: "right" }}>
            <Row>
              {" "}
              <h6
                style={{
                  color: "#4F4F4F",
                  paddingLeft: "15px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  paddingTop: "65px",
                }}
              >
                {" "}
                UPCOMING HOLIDAYS
              </h6>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Table >
                    <thead>
                      <tr style={{backgroundColor:"#f5896e",color:"white"}}>
                        <th>Holiday Title</th>
                        <th>Holiday Date</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {holiday.map((data) => (
                        <tr>
                          <td>{data.holidayTitle}</td>
                          <td>
                            {
                              data.holidayDate
                                .replace(/\b0/g, "")
                                .split("T0")[0]
                            }
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Col> */}
          <br></br>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDashboard;