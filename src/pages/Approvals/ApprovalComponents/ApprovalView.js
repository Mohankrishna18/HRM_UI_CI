import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Card, FormSelect, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "../../../Uri";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ApprovalView = (props) => {
  console.log(props.viewOnboard);
  // console.log(props.firstName)

  // const [firstName, setFirstName] = useState("")
  // const [middleName, setMiddleName] = useState("")
  // const [lastName, setLastName] = useState("")
  // const [email, setEmial] = useState("")
  // const [phoneNumber, setPhonenNumber] = useState("")
  // const [dateOfJoining, setDateOfJoining] = useState("")
  // const [yearsOfExperience, setYearsOfExperience] = useState("")
  // const [department, setDepartment] = useState("")
  // const [desgination, setDesignation] = useState("")
  // const [primarySkills, setPrimarySkills] = useState("")
  // const [secondarySkills, setSecondrySkills] = useState("")
  // const [jobTitle, setJobTitle] = useState("")

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const forms = useRef(null);

  function setField(field, value) {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  }

  const validateForm = () => {
    const {
      lastName,
      middleName,
      firstName,
      email,
      phoneNumber,
      dateOfJoining,
      yearsOfExperience,
      designation,
      department,
      employmentType,
      primarySkills,
      secondarySkills,
      jobTitle,
    } = form;
    const newErrors = {};

    if (!firstName || firstName === "" || !firstName.match(/^[aA-zZ\s]+$/))
      newErrors.firstName = "Please Enter First Name";
    if (!lastName || lastName === "" || !lastName.match(/^[aA-zZ\s]+$/))
      newErrors.lastName = "Please Enter Last Name";
    if (!email || email === "") newErrors.email = "Please Enter Email";
    if (
      !phoneNumber ||
      phoneNumber === "" ||
      !phoneNumber.match(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      )
    )
      newErrors.phoneNumber = "Please Enter Phonenumber";
    if (!dateOfJoining || dateOfJoining === "")
      newErrors.dateOfJoining = "Please Enter Date of Joining";
    if (
      !yearsOfExperience ||
      yearsOfExperience === "" ||
      yearsOfExperience.match(/[^0-9]/g)
    )
      newErrors.yearsOfExperience = "Please Enter Years of Experience";
    if (!designation || designation === "")
      newErrors.desgination = "Please Enter Designation";
    if (!department || designation === "")
      newErrors.department = "Please Enter department";
    if (!employmentType || employmentType === "")
      newErrors.employmentType = "Please Enter type of employement";
    if (!primarySkills || primarySkills === "")
      newErrors.primarySkills = "Please Enter type of primarySkills";
    if (!secondarySkills || secondarySkills === "")
      newErrors.secondarySkills = "Please Enter type of secondarySkills";
    if (!jobTitle || jobTitle === "")
      newErrors.jobTitle = "Please Enter type of jobTitle";

    return newErrors;
  };
  //testing for commit
  const [user, setUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // e.target.reset();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // console.log(form);
      // console.log("form submitted");
      axios
        .post("/emp/createNewPotentialEmployee", form)
        .then((response) => {
          const user = response.data;
          toast.success("Form Submitted successfully");
          // console.log(user);
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    }
  };
  // console.log(form.dateOfJoining)

  const [designations, setDesignations] = useState([]);
  useEffect(() => {
    axios
      .get("/designation/getAllDesignations")
      .then((response) => {
        setDesignations(response.data);
      })
      .catch(() => {
        toast.error("data is not getting");
      });
  }, []);

  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get("/dept/getAllDepartments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch(() => {
        toast.error("data is not getting");
      });
    // console.log(departments)
  }, []);

  
  var tempDate = new Date(props.viewOnboard.dateOfJoining);
  var dob = [String(tempDate.getDate()).padStart(2, '0'), String(tempDate.getMonth() + 1).padStart(2, '0'), tempDate.getFullYear()].join('-');
  console.log(dob)

  return (
    <div>
      
      <Row style={{ marginTop: 20 }}>
                  <Col>
                    <Card style={{ padding: 30, paddingBottom: 20 }}>
                      
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            First Name:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.firstName}
                          </Card.Text>
                        </Col>
                        </Row>
                        {/* <Row>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Middle Name:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.middleName}
                          </Card.Text>
                        </Col>
                        </Row> */}

                      
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Last Name:
                          </Card.Subtitle>{" "}
                        </Col>
                      
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.lastName}
                          </Card.Text>
                        </Col>
                        </Row>
                        <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Phone Number:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.phoneNumber}
                          </Card.Text>
                        </Col>
                        </Row>

                      
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Email-ID:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.email}
                          </Card.Text>
                        </Col>
                        </Row> 
                        <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Employment Type:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.employmentType}
                          </Card.Text>
                        </Col>

                      </Row>
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Department:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.department}
                          </Card.Text>
                        </Col>
                        </Row>
                        <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Designation:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.designation}
                          </Card.Text>
                        </Col>

                      </Row>
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Date Of Joining:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {dob}

                          </Card.Text>
                        </Col>
                        </Row>
                        <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Years Of Experience:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.yearsOfExperience}
                          </Card.Text>
                        </Col>

                      </Row>
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Primary Skills:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.primarySkills}
                          </Card.Text>
                        </Col>
                        </Row>
                        <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Secondary Skills:
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.secondarySkills}
                          </Card.Text>
                        </Col>

                      </Row>
                      <Row style={{ paddingBottom: 10, paddingLeft: 10 }}>
                        <Col>
                          <Card.Subtitle style={{ padding: 10 }}>
                            Job Title :
                          </Card.Subtitle>{" "}
                        </Col>
                        <Col md={{ offset: 1 }}>
                          <Card.Text style={{ paddingBottom: 0 }}>
                            {props.viewOnboard.jobTitle}
                          </Card.Text>
                        </Col>
                        

                      </Row>
                      
                    </Card>
                  </Col>
                </Row>
    </div>
  );
};

export default ApprovalView;

















{/* <Form
        ref={forms}
        className="formone"
        // noValidate
        // validated={validated}
        style={{ padding: 10 }}
        onSubmit={handleSubmit}
      >
        <Row className="mb-5">
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              className="firstName"
              type="text"
              controlid="firstName"
              placeholder="First name"
              // onChange={(event) => setFirstName(event.target.value)}
              value={props.viewOnboard.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              isInvalid={!!errors.firstName}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Middle name</Form.Label>
            <Form.Control
              name="middle_name"
              type="text"
              controlid="middleName"
              placeholder="Middle name"
              value={props.viewOnboard.middleName}
              onChange={(e) => setField("middleName", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              name="last_name"
              type="text"
              controlid="lastName"
              placeholder="Last name"
              value={props.viewOnboard.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              isInvalid={!!errors.lastName}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Phone No</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
              <Form.Control
                required
                type="text"
                placeholder="Phone Number"
                controlid="phoneNumber"
                value={props.viewOnboard.phoneNumber}
                onChange={(e) => setField("phoneNumber", e.target.value)}
                isInvalid={!!errors.phoneNumber}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Designation</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Designation"
              controlid="designation"
              value={props.viewOnboard.designation}
              onChange={(e) => setField("designation", e.target.value)}
              isInvalid={!!errors.designation}
            >
              <option>Select </option>
              {designations.map((designation) => (
                <option>{designation.designationName}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Department</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Department"
              controlid="department"
              value={props.viewOnboard.department}
              onChange={(e) => setField("department", e.target.value)}
              isInvalid={!!errors.department}
            >
              <option>Select </option>
              {departments.map((departmentss) => (
                <option>{departmentss.departmentName}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="joining date"
              controlid="dateOfJoining"
              value={props.viewOnboard.dateOfJoining}
              onChange={(e) => setField("dateOfJoining", e.target.value)}
              isInvalid={!!errors.dateOfJoining}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.dateOfJoining}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Years Of Experience</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Experience "
              controlid="yearsOfExperience"
              value={props.viewOnboard.yearsOfExperience}
              onChange={(e) => setField("yearsOfExperience", e.target.value)}
              isInvalid={!!errors.yearsOfExperience}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.yearsOfExperience}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              controlid="email"
              value={props.viewOnboard.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              name="jobTitle"
              type="text"
              controlid="jobTitle"
              placeholder="Job Title "
              value={props.viewOnboard.jobTitle}
              onChange={(e) => setField("jobTitle", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Primary Skills*</Form.Label>
            <Form.Control
              required
              type="text"
              name="primarySkills"
              placeholder="Primary Skills"
              controlid="primarySkills"
              value={props.viewOnboard.primarySkills}
              onChange={(e) => setField("primarySkills", e.target.value)}
              // onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Secondary Skills*</Form.Label>
            <Form.Control
              required
              type="text"
              name="secondarySkills"
              placeholder="SecondarySkills"
              controlid="secondarySkills"
              value={props.viewOnboard.secondarySkills}
              onChange={(e) => setField("secondarySkills", e.target.value)}

              // onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" style={{ padding: 10 }}>
            <Form.Label>Type Of Employeement</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Type Of Employment"
              controlid="employmentType"
              value={props.viewOnboard.employmentType}
              onChange={(e) => setField("employmentType", e.target.value)}
              isInvalid={!!errors.employmentType}
            >
              <option>Select</option>
              <option value="Intern">Intern</option>
              <option value="Contract">Contract</option>
              <option value="FTE">
                FTE 
              </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.employmentType}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form> */}