import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import axios from "../../../Uri";
import { toast } from "react-toastify";

function PersonalDetailsTab(props) {
  console.log(props.viewOnboard);
  const userData = sessionStorage.getItem("userdata");
  const userData1 = JSON.parse(userData);
  const employeeid = userData1.data.employeeId;
  const handleClose = () => setShow();

  // const payload = {
  //   employeeId,
  //   firstName,
  //   lastName,
  //   middleName,
  //   dateOfBirth,
  //   primaryPhoneNumber,
  //   secondaryPhoneNumber,
  //   email,
  //   primarySkills,
  //   secondarySkills,
  //   bloodGroup,
  //   gender,
  //   maritalStatus,
  // };

  // const [ferrors, setFErrors] = useState("");
  // const [serror, setSerror] = useState("");
  // const [thirderrors, setThirdErrors] = useState("");
  // const [fourerror, setFourerror] = useState("");
  // const [fiveerrors, setFiveErrors] = useState("");
  // const [sixerror, setSixerror] = useState("");
  // const [sevenerrors, setSevenErrors] = useState("");
  // const [eighterror, setEighterror] = useState("");
  // const [nineerrors, setNineErrors] = useState("");
  // const [tenerror, setTenerror] = useState("");

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [middleName, setMiddleName] = useState(" ");
  // const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState(" ");
  // const [secondaryPhoneNumber, setSecondaryPhone] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [employeeId, setEmployeeId] = useState("");
  // const [primarySkills, setPrimarySkills] = useState("");
  // const [secondarySkills, setSecondarySkills] = useState("");
  // const [email, setEmail] = useState("");
  // const [bloodGroup, setBloodGroup] = useState("");
  // const [gender, setGender] = useState("");
  // const [maritalStatus, setMaritalStatus] = useState("");
  // const [dateOfJoining, setDateOfJoining] = useState("");

  // useEffect(() => {
  //   axios.get(`/emp/getPersonalDetails/${employeeid}`).then((response) => {
  //     setEmployeeId(response.data.data.employeeId);
  //     setFirstName(response.data.data.firstName);
  //     setLastName(response.data.data.lastName);
  //     setSecondaryPhone(response.data.data.secondaryPhoneNumber);
  //     setEmployeeId(response.data.data.employeeId);
  //     setFirstName(response.data.data.firstName);
  //     setMiddleName(response.data.data.middleName);
  //     setLastName(response.data.data.lastName);
  //     setPrimaryPhoneNumber(response.data.data.primaryPhoneNumber);
  //     setSecondaryPhone(response.data.data.secondaryPhoneNumber);
  //     setEmail(response.data.data.email);
  //     setDateOfBirth(response.data.data.dateOfBirth);
  //     setBloodGroup(response.data.data.bloodGroup);
  //     setGender(response.data.data.gender);
  //     setMaritalStatus(response.data.data.maritalStatus);
  //   });
  // }, []);

  // const changeHandler = async (e) => {
  //   e.preventDefault();
  //   await axios.put(`/emp/updatePersonalDetails/${employeeid}`, { 
  //     employeeId,
  //     firstName,
  //     lastName,
  //     middleName,
  //     dateOfBirth,
  //     primaryPhoneNumber,
  //     secondaryPhoneNumber,
  //     email,
  //     primarySkills,
  //     secondarySkills,
  //     bloodGroup,
  //     gender,
  //     maritalStatus,
  //   });
  //   toast.success("Form Submitted Successfully");
  // };

  var tempDate = new Date(props.viewOnboard.dateOfBirth);
console.log(props.viewOnboard);
  var dob = [String(tempDate.getDate()).padStart(2, '0'), String(tempDate.getMonth() + 1).padStart(2, '0'), tempDate.getFullYear()].join('-');
console.log(dob)
  return (
    <div style={{paddingBottom:"20px"}}>

       <Card.Title>
        <Row>
          <Col> <h5>Personal Information:</h5></Col>
          
       </Row>
      
      </Card.Title>
      <Card.Body >
      <Row>
        <Col>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 ,paddingTop:20}}>
          <Col>
            <Card.Subtitle style={{color:"black"}}>
              First Name
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.firstName}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}>
           Middle Name
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.middleName}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
          
            <Card.Subtitle style={{color:"black"}}>
           Last Name
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.lastName}
            </Card.Subtitle>
          </Col>
        </Row>
    
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}>
             Email
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.email}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}
            >
              Phone Number:
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.phoneNumber}
              {console.log(props.viewOnboard.phoneNumber)}
            </Card.Subtitle>
          </Col>
        </Row>
        </Col>
        <Col>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}
            >
              Date of Birth:
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
          {props.viewOnboard.dateOfBirth ? (<Card.Subtitle style={{ color: "#999897" }}>
                                  {dob}
                                </Card.Subtitle>) : (<div></div>)}

          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}
            >
              Blood Group:
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }} >
              {props.viewOnboard.bloodGroup}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}
            >
              Gender:
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.gender}
            </Card.Subtitle>
          </Col>
        </Row>
        <Row style={{ paddingLeft: 55, paddingBottom: 30 }}>
          <Col>
            <Card.Subtitle style={{color:"black"}}>
              Marital Status:
            </Card.Subtitle>
          </Col>
          <Col md={{ offset: 1 }}>
            <Card.Subtitle style={{ color: "#999897" }}>
              {props.viewOnboard.maritalStatus}
            </Card.Subtitle>
          </Col>
          </Row>
        </Col>
        
      </Row>
        

       
        
      </Card.Body>

      {/* <Card
        style={{
          marginLeft: 8,
          marginRight: 8,
          marginTop: 0,
          backgroundColor: "#FAFDD0",
        }}
      >
        <Card.Title style={{ margin: 20, textAlign: "center" }}>
          Personal Details
        </Card.Title>
      </Card> */}

      {/* <Form onSubmit={(e) => changeHandler(e)} style={{ padding: 10 }}>
        <Row className="mb-5">
          <Form.Group
            as={Col}
            className="mb-3"
            md="6"
            controlid="formBasicEmail"
          >
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              value={props.viewOnboard.firstName}
              // disabled
              required
              maxLength={50}
              type="text"
            />
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ paddingLeft: 10 }}>
            <Form.Label>Middle name</Form.Label>
            <Form.Control
              name="middleName"
              type="text"
              maxLength={50}
              value={props.viewOnboard.middleName}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3"
            md="6"
            controlid="formBasicEmail"
          >
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              value={props.viewOnboard.lastName}
              // disabled
              required
              maxLength={50}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ paddingLeft: 10 }}>
            <Form.Label>Phone Number *</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
              <Form.Control
                required
                type="number"
                name="primaryPhoneNumber"
                maxLength={10}
                value={props.viewOnboard.phoneNumber}
               
              />
            </InputGroup>
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3"
            md="6"
            style={{ padding: 10 }}
            controlid="formBasicEmail"
          >
            <Form.Label>Emergency Phone Number </Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
              <Form.Control
                value={props.viewOnboard.secondaryPhoneNumber}
                maxLength={10}
                isInvalid={nineerrors}
                type="number"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Email *</Form.Label>
            <Form.Control
              required
              type="email"
              value={props.viewOnboard.email}
              isInvalid={fourerror}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control
              // required
              type="date"
              name="dateOfBirth"
              controlid="dateOfBirth"
              value={props.viewOnboard.dateOfBirth}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Blood Group *</Form.Label>
            <Form.Control
              required
              type="text"
              name="bloodGroup"
              controlid="bloodGroup"
              value={props.viewOnboard.bloodGroup}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Gender *</Form.Label>
            <Form.Control
              required
              type="text"
              name="gender"
              controlid="gender"
              value={props.viewOnboard.gender}
              
            />
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Marital Status *</Form.Label>
            <Form.Control
              required
              type="text"
              name="maritalStatus"
              controlid="maritalStatus"
              value={props.viewOnboard.maritalStatus}
            />
          </Form.Group>

          <Row></Row>
        </Row>
        
      </Form> */}
    </div>
  );
}
export default PersonalDetailsTab;
