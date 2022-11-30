
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "../../../Uri";
import { Row, Col } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import UpdateTask from "../../Task/MyTaskComponents/UpdateTask";

function AddUser(props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
 
 
  const [projects, setProjects] = useState([]);

  const[userStory,setUserStory] = useState([]);

  useEffect(() => {
    console.log(props.assig)

    setField("assignedTo",props.assig)
    loadData();
    loadData1();
  }, []);

  const loadData = async () => {
    const res = await axios.get("/clientProjectMapping/getAllProjects");
    setProjects(res.data.data);
    console.log(res.data.data);
  };
  const loadData1 = async () => {
    const res = await axios.get("/userStory/getAllUserStory");
    setUserStory(res.data.data);
    console.log(res.data.data);
  };
 // console.log(userStory);

  useEffect(() => {
    axios
      .get("/emp/getAllEmployeeMasterData")
      .then((response) => {
        setEmpName(response.data.data);
      })
      .catch(() => {
      });
  }, []);

  const handleClose = () => setShow();
  const handleShow = () => setShow(true);

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
      userStory,
      projectId,
      projectName,
      taskTitle,
      taskType,
      estimatedHours,
     // actualHours,
      //description,
      plannedEndDate,
      plannedStartDate,
      status,
      //assignedTo,
      priority,
      actualStartDate,
     
    } = form;

    const newErrors = {};

    // if (
    //   !projectId ||
    //   projectId === "" ||
    //   !projectId.match(/^[aA-zZ\s]+$/)
    // )
    //   newErrors.projectId = "Please Enter Project Name";
    // else if (!projectId.match(/^[aA-zZ\s]+$/)) {
    //   newErrors.projectId = "Please select Project";
    // }
    if (!taskTitle || taskTitle === "")
      newErrors.taskTitle = "Please Enter Task Title";
         if (!taskType || taskType === "")
       newErrors.taskType = "Please Enter Task Type";
    //     //  if (!assignedTo || assignedTo === ""||assignedTo === "Assigned To")
    //     //    newErrors.assignedTo = "Please Enter Assigned To";
   
       if (!estimatedHours || estimatedHours === "" || estimatedHours.length > 3) {
           newErrors.estimatedHours = "Please Enter Estimated Hours";
    } else if (!estimatedHours.match(/^-?\d*(\.\d+)?$/)) {
       newErrors.estimatedHours = "Please Enter Estimated Hours";
         } else if (estimatedHours.length > 3) {
           newErrors.estimatedHours = "Please Correct Enter Estimated Hours";
         }
      if (!plannedStartDate || plannedStartDate === "")
      newErrors.plannedStartDate = "Please Enter Start date";
      if (!plannedEndDate || plannedEndDate === "") 
      newErrors.plannedEndDate = "Please Enter End date";
      //    if (!priority || priority === "")
      //     newErrors.priority = "Please Enter Priority";
   
    return newErrors;
  };

  //testing for commit
  const [user, setUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    const formErrors = validateForm();
    console.log(Object.keys(formErrors).length);
    if (Object.keys(formErrors).length > 2) {
      setErrors(formErrors);
    } else {
      console.log(form);
      console.log("form submitted");
      axios
        .post("/task/createNewTask", form)
        .then((response) => {
          const user = response.data;
          console.log(user);
          if (response.data.status) {
            props.func();
            toast.success("New Task added Successfully");
          } else {
            console.log("Props Not Send");
          }
          setTimeout(5000);
          setForm({})
          handleClose();
  
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    }
  };
  return (
    <div>
      <div style={{paddingLeft:"250px",paddingBottom:"10px"}}>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{
          backgroundColor: "#f5896e",
 borderColor: "#f5896e",
        
          borderRadius: "25px",
          // paddingBottom: "11.5px",
          // marginTop: "100px",
        }}
      >
        {" "}
        <FaPlus  />
        &nbsp;Add Task 
      
      </Button>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f5896e",paddingTop:"5px",paddingBottom:"5px",color:"white" }}>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            ref={forms}
            className="formone"
            // noValidate
            // validated={validated}
            style={{ padding: 10 }}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Project </Form.Label>
                <Form.Select
                  required
                  className="projectName"
                  type="text"
                  placeholder="Project Name"
                  // onChange={(event) => setclientName(event.target.value)}
                  value={form.projectName}
                  maxLength={30}
                  onChange={(e) => setField("projectName", e.target.value)}
                  isInvalid={!!errors.projectName}
                >
                  <option>Select project</option>
                  {projects === null ?(<> <option>Select project</option></>):(<> {projects.map((project) => (
                    <option value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}</>)}
                 
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>User Story </Form.Label>
                <Form.Select
                  required
                  className="userStory"
                  type="text"
                  placeholder="User Story"
                  // onChange={(event) => setclientName(event.target.value)}
                  value={form.userStory}
                  maxLength={30}
                  onChange={(e) => setField("userStory", e.target.value)}
                  isInvalid={!!errors.userStory}
                >
                  <option>Select userStory</option>
                {userStory === null ?(<><option>Select userStory</option></>):(<>{userStory.map((userSt) => (
                    <option value={userSt.storyTitle}>
                      {userSt.storyTitle}
                    </option>
                  ))}</>)}

                  
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.userStory}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="12">
                <Form.Label>Task Title *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Task Title"
                  controlid="taskTitle"
                  value={form.taskTitle}
                  onChange={(e) => setField("taskTitle", e.target.value)}
                  isInvalid={!!errors.taskTitle}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.taskTitle}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="3">
                <Form.Label>Task Type *</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="Task Type"
                  controlid="taskType"
                  value={form.taskType}
                  onChange={(e) => setField("taskType", e.target.value)}
                  isInvalid={!!errors.taskType}
                >
                  <option>Select Task Type</option>
                  <option>Analysis</option>
                  <option>Development</option>
                  <option>Code Review</option>
                  <option>Unit Testing</option>
                  <option>Code Integration</option>
                  <option>Integration Testing</option>
                  <option>Design Review</option>
                  <option>TestCase Creation</option>
                  <option>Testcase Review</option>
                  <option>Testcase Execution</option>
                  <option>Deployment</option>
                  <option>others</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.taskType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="3">
                <Form.Label>Estimated Hours *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  maxLength={3}
                  placeholder="Estimated Hours"
                  controlid="estimatedHours"
                  value={form.estimatedHours}
                  onChange={(e) => setField("estimatedHours", e.target.value)}
                  isInvalid={!!errors.estimatedHours}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.estimatedHours}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="3">
                <Form.Label>Priority </Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="priority"
                  controlid="priority"
                  value={form.priority}
                  onChange={(e) => setField("priority", e.target.value)}
                  isInvalid={!!errors.priority}
                >
                  <option>Select priority</option>
                  <option>P1</option>
                  <option>P2</option>
                  <option>P3</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="3">
                <Form.Label>Complexity </Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="complexity"
                  controlid="complexity"
                  value={form.complexity}
                  onChange={(e) => setField("complexity", e.target.value)}
                  isInvalid={!!errors.complexity}
                >
                  <option>Select Complexity</option>
                  <option>Highly Complex</option>
                  <option>Medium Complex</option>
                  <option>Moderate</option>
                  <option>Simple</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.complexity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Planned Start Date *</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="plannedStartDate"
                  controlid="plannedStartDate"
                  value={form.plannedStartDate}
                  onChange={(e) => setField("plannedStartDate", e.target.value)}
                  isInvalid={!!errors.plannedStartDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.plannedStartDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="status"
                  controlid="status"
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  isInvalid={!!errors.status}
                >
                 <option> Select Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="OnHold">On Hold</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>


              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Planned Start Date *</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="plannedStartDate"
                  controlid="plannedStartDate"
                  value={form.plannedStartDate}
                  onChange={(e) => setField("plannedStartDate", e.target.value)}
                  isInvalid={!!errors.plannedStartDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.plannedStartDate}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Planned End Date *</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter "
                  controlid="plannedEndDate"
                  value={form.plannedEndDate}
                  min={form.plannedStartDate}
                  onChange={(e) => setField("plannedEndDate", e.target.value)}
                  isInvalid={!!errors.plannedEndDate}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.plannedEndDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Actual Start Date </Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Assign Date"
                  controlid="assignDate"
                  value={form.assignDate}
                  onChange={(e) => setField("assignDate", e.target.value)}
                  isInvalid={!!errors.assignDate}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errors.assignDate}
                </Form.Control.Feedback> */}
              </Form.Group>

              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Priority </Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="priority"
                  controlid="priority"
                  value={form.priority}
                  onChange={(e) => setField("priority", e.target.value)}
                  isInvalid={!!errors.priority}
                >
                  <option>Select priority</option>
                  <option>P1</option>
                  <option>P2</option>
                  <option>P3</option>
                  
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group> */}

{/* 
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Actual Start Date </Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Assign Date"
                  controlid="assignDate"
                  value={form.assignDate}
                  onChange={(e) => setField("assignDate", e.target.value)}
                  isInvalid={!!errors.assignDate}
                /> */}
                {/* <Form.Control.Feedback type="invalid">
                  {errors.assignDate}
                </Form.Control.Feedback> */}
              {/* </Form.Group> */}


              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Assigned To *</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="assignedTo"
                  controlid="assignedTo"
                  value={form.assignedTo}
                  onChange={(e) => setField("assignedTo", e.target.value)}
                  isInvalid={!!errors.assignedTo}
                >
                  <option>Assigned To</option>
                  {/* <option>mohan</option>
                  <option>sravya</option>
                  <option>divya</option>
                  <option>madhu</option> */}
                {/* {
                    result.map((item) => {
                      return (
                        <option value={item.employeeId}>{item.employeeName}</option>
                      )
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.assignedTo}
                </Form.Control.Feedback>
              </Form.Group>   */}

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Description "
                  controlid="description"
                  as="textarea"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  // isInvalid={!!errors.description}

                  maxlength="100"
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#f5896e",
                    borderColor: "#f5896e",
                    float: "right",
                    width: "40%",
                    height: "120%",
                    borderRadius: "25px",
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#B6B6B4",
                    borderColor: "#B6B6B4",
                    alignItems: "center",
                    width: "40%",
                    height: "120%",
                    borderRadius: "25px",
                  }}
                  type="close"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default AddUser;
