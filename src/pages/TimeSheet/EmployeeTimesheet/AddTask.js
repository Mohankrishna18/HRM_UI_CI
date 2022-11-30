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
//vipul

function AddUser(props) {


  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleClose = () => setShow();
  const handleShow = () => setShow(true);
  const da = JSON.parse(sessionStorage.getItem('userdata'))
  const empID = da.data.employeeId;
  console.log(empID)
  const [data, setData] = useState([]);

  const forms = useRef(null);
  useEffect(() => {
    loadRoles();
  }, [addStatus, deleteStatus, updateStatus]);


  const loadRoles = async (e) => {
    const response = await axios.get(`/task/getTaskByAssign/${empID}`);
    setData(response.data);
    console.log(response);
    console.log("dataupdated");
  };

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
      description,
      // duration,
      toDate,
      projectName,
      fromDate,
      status,
      taskName,
      taskType,
      priority
    } = form;
    const newErrors = {};


    // if (!timesheet || timesheet === "")
    //   newErrors.timesheet = "Please Enter Timesheet date";
    if (!projectName || projectName === "")
      newErrors.project = "Please Enter project name";
    if (!taskName || taskName === "") { newErrors.taskName = "Please Enter Task name"; }
    else if (!taskName.match(/^[aA-zZ\s]+$/)) {
      newErrors.taskName = "Please Enter valid Task name";
    }
    if (!taskType || taskType === "")
      newErrors.taskType = "Please Enter Task name";
    if (!status || status === "")
      newErrors.status = "Please Enter Status";
    if (!fromDate || fromDate === "")
      newErrors.fromDate = "Please Enter Start date";
    if (!toDate || toDate === "")
      newErrors.toDate = "Please Enter End date";
    // if (!duration || duration === "")
    //   newErrors.duration = "Please Enter End time";
    if (!priority || priority === "")
      newErrors.priority = "Please Enter Priority";
    // if (!description || description === "") {
    //   newErrors.description = "Please Enter Description";
    // }
    // else if (!description.length >= 300) {
    //   newErrors.description = "your description is too long";
    // }





    return newErrors;
  };
  //testing for commit
  const [user, setUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    // handleClose();
    // e.target.reset();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log(formErrors);
    } else {
      console.log(form);

      axios
        .post("/task/createNewTask", form)
        .then((response) => {
          const user = response.data;
          if (response.data.status) {
            props.func();
            toast.success("NewTask added successfully!!!");
          }
          else {
            console.log("Props Not Send");
          }


          setTimeout(5000);
          setForm({});
          setErrors({});
          handleClose();
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    }
  };
  // console.log(form.dateOfJoining)


  // useEffect(() => {
  //   axios
  //     .get("/clientProjectMapping/getAllProjects")
  //     .then((response) => {
  //       console.log(response.data.data);
  //     })

  //     .catch(() => {
  //       toast.error("data is not getting");
  //     });
  // }, []);


  const [task, setTask] = useState([]);
  useEffect(() => {
    axios
      .get(`/clientProjectMapping/getAllProjects`)
      .then((response) => {
        console.log(response.data.data);
        setTask(response.data.data);

      });
  }, []);
  console.log(task);

  // useEffect(() => {
  //   axios
  //     .get("/clientProjectMapping/getAllProjects")
  //     .then((response) => {console.log(response.data)});
  // }, []);

  return (
    <div>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{
          backgroundColor: "#f5896e",
 borderColor: "#f5896e",
          float: "right",
          borderRadius: "25px",
          paddingRight: "20px",
          marginBottom: "2px",
          fontWeight: "bold"
        }}
      >
        {" "}
        <BsPlusLg />
        &nbsp;Add Timesheet
      </Button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f5896e", color: "white" }}>
          <Modal.Title style={{ backgroundColor: "#f5896e", color: "white" }}>Add Timesheet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            ref={forms}
            className="formone"
            // noValidate
            // validated={validated}
            style={{ paddingLeft: 25, paddingRight: 25, paddingBottom: 10 }}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Timesheet date*</Form.Label>
                <Form.Control
                  required
                  type="date"
                  controlid="timesheet "
                  value={form.timesheet}
                  onChange={(e) => setField("timesheet", e.target.value)}
                  isInvalid={!!errors.timesheet}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.timesheet}
                </Form.Control.Feedback>
              </Form.Group>  */}

              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Project *</Form.Label>
                <Form.Select
                  type="text"
                  
                  required
                  controlid="project"
                 // defaultValue={data.projectName}
                  defaultValue={data.projectName}
                // onChange={(e) => setField("projectName", e.target.value)}
                  isInvalid={!!errors.project}
                >
                  {/* <option>Select Project</option>
                  <option>hrm</option>
                  <option>it</option>
                  <option>dep</option> */}
                  {/* {task.map((item) => (
                    <option key={item.projectName} value={item.projectName}>
                      {item.projectName}
                    </option>
                  ))} */}
                  {/* <option>Select any project...</option> */}
                  {data.map((item) => (
                    <option>{item.projectName }</option>
                  ))}


                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Task *</Form.Label>
                {data.map((item)=>(
                   <Form.Control
                   required
                   type="text"
                   // placeholder="Task Name"
                  controlid="taskName"
                   defaultValue={item.taskTitle}
                   //onChange={(e) => setField("taskName", e.target.value)}
                   isInvalid={!!errors.taskName}
 
                 >
                   
 
                 </Form.Control>

                ))}
               
                <Form.Control.Feedback type="invalid">
                  {errors.taskName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Start date*</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="fromDate"
                  controlid="fromDate"
                  value={form.fromDate}
                  onChange={(e) => setField("fromDate", e.target.value)}
                  isInvalid={!!errors.fromDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fromDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>End Date*</Form.Label>
                <Form.Control type="date" placeholder="Enter "
                  controlid="toDate"
                  value={form.toDate}
                  onChange={(e) => setField("toDate", e.target.value)}
                isInvalid={!!errors.toDate}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.toDate}
                </Form.Control.Feedback>

              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="6">
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

                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.taskType}
                </Form.Control.Feedback>

              </Form.Group>






              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>CloseDate*</Form.Label>
                <Form.Control type="date" placeholder="Enter "
                controlid="CloseDate"
                value={form.CloseDate}
                onChange={(e) => setField("CloseDate", e.target.value)}
                isInvalid={!!errors.CloseDate} 
                />

                <Form.Control.Feedback type="invalid">
                  {errors.CloseDate}
                </Form.Control.Feedback>

              </Form.Group> */}

              {/* <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>StartTime</Form.Label>
                <Form.Control type="time" placeholder="Enter "
                controlid="StartTime"
                value={form.StartTime}
                onChange={(e) => setField("StartTime", e.target.value)}
                isInvalid={!!errors.StartTime} 
                />

                <Form.Control.Feedback type="invalid">
                  {errors.StartTime}
                </Form.Control.Feedback> */}

              {/* </Form.Group> */}
              {data.map((item)=>(
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Estimated Hours</Form.Label>
                <Form.Control type="number" placeholder="Enter "
                  controlid="number"
                  defaultValue={item.estimatedHours}
                 // onChange={(e) => setField("duration", e.target.value)}
                  // isInvalid={!!errors.duration}
                />

                {/* <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback> */}

              </Form.Group>
               ))}
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Actual  Hours</Form.Label>
                <Form.Control type="number" placeholder="Enter "
                  controlid="number"
                  value={form.duration}
                  onChange={(e) => setField("duration", e.target.value)}
                  // isInvalid={!!errors.duration}
                />

                {/* <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback> */}

              </Form.Group>
              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Remaining  Hours</Form.Label>
                <Form.Control type="number" placeholder="Enter "
                  controlid="number"
                  value={form.duration}
                  onChange={(e) => setField("duration", e.target.value)}
                  // isInvalid={!!errors.duration}
                />

                {/* <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback> */}

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
                  <option>Select status</option>
                  <option>open</option>
                  <option>closed</option>
                  <option>In progress</option>

                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>

              


              <Form.Group className="mb-3" as={Col} md="6">
                <Form.Label>Priority *</Form.Label>
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
                  <option>P4</option>

                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter the Description "
                  controlid="description"
                  as="textarea"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  // isInvalid={!!errors.description}
                  
                  maxlength="100"
                />

                {/* <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback> */}

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
    </div >
  );
}
export default AddUser;

