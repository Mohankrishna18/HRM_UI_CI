import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table, Tabs, Tab } from "react-bootstrap";
import { matches } from "lodash";
import { Image } from "react-bootstrap";
import axios from "../../../Uri";
import { split } from "lodash";
import Avatar from '@mui/material/Avatar';


const customTheme = {
  yearColor: "#405b73",
  lineColor: "#d0cdc4",
  dotColor: "#fd7e14",
  borderDotColor: "#ced4da",
  titleColor: "#000000",
  subtitleColor: "#bf9765",
  textColor: "#262626",
};

const ProfileEmploymentDetailsTab = (props) => {

  const employeeid = props.profile;

  const userData = sessionStorage.getItem("userdata");
  // console.log(userData);
  // const userData1 = JSON.parse(userData);
  // const employeeid = userData1.data.employeeId;
  const [getEmployeeDetails, setGetEmployeeDetails] = useState([]);
  var dateTime = getEmployeeDetails.dateOfJoining;
//commit
  useEffect(() => {
    axios
      .get(`/emp/getEmployeeDataByEmployeeId/${employeeid}`)
      .then((response) => {
        setGetEmployeeDetails(response.data.data);
      });
  }, []);

  

  return (
 
                        <div style={{ padding: 20, paddingBottom: 20 }}>    
                          {/* <Card.Title>
                            <h5>Employment Details:</h5>
                          </Card.Title> */}                                                                              
                          <Row style={{ paddingBottom: 10, paddingLeft: 20 }}>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                Primary Skills:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {getEmployeeDetails.primarySkills}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                Secondary Skills:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Subtitle style={{ color: "#999897" }}>
                                {getEmployeeDetails.secondarySkills}
                              </Card.Subtitle>
                            </Col>
                          </Row>
                          <Row style={{ paddingBottom: 10, paddingLeft: 20 }}>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                Employment Type:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {getEmployeeDetails.employmentType}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                Band:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {getEmployeeDetails.band}
                              </Card.Text>
                            </Col>
                          </Row>

                          <Row style={{ paddingBottom: 10, paddingLeft: 20 }}>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                              Business Unit:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {getEmployeeDetails.departmentName}
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                Designation:
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {getEmployeeDetails.designationName}
                              </Card.Text>
                            </Col>
                          </Row>

                          <Row style={{ paddingBottom: 10, paddingLeft: 20 }}>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                
                              </Card.Text>
                            </Col>
                            <Col>
                              <Card.Subtitle style={{ padding: 10 }}>
                                {/* Project Name: */}
                              </Card.Subtitle>
                            </Col>
                            <Col md={{ offset: 1 }}>
                              <Card.Text style={{ paddingBottom: 0, color: "#999897" }}>
                                {/* {getEmployeeDetails.projectName} */}
                              </Card.Text>
                            </Col>
                          </Row>
                        </div>

  );
};
export default ProfileEmploymentDetailsTab;


