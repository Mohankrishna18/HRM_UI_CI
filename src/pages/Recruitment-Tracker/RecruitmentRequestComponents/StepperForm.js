
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../../Uri';
import RecruitmentTimeline from './RecruitmentTimeline'
import './utils/RT.css';
import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";



const StepperForm = (props) => {

    const navigate = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const closeLoading = () => setLoading(!loading);

    const [clientId, setClientId] = useState([]);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
  
    const [departments, setDepartments] = useState([]);
    const [pocname, setPocName] = useState([]);
    const [interviewPanel1, setInterviewPanel1] = useState([]);
    const [interviewPanel2, setInterviewPanel2] = useState([]);
    const [hrPanel, setHrPanel] = useState([]);
    const [reqType1, setReqType1] = useState('');
    const [reqType2, setReqType2] = useState('');
    const [initDate, setInitDate] = useState("");
    const [reqId, setReqId] = useState("");

    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    const userType = userdata.data.userType;
    const employeeId = userdata.data.employeeId;



    const handleChange = (event) => {


        setField("reqType1", event.target.value)
    }

    const calls = () => {
        setLoading(true)
        axios.get(`/emp/getEmployeeDataByEmployeeId/${employeeId}`).then((res) => {
            console.log(res)
            setResponse(res.data.data);
            if (res.data.status) {
                axios.get("/clientProjectMapping/getAllProjects").then((resp) => {
                    // console.log(resp)
                   // setProjects(resp.data.data)
                    if (resp.data.status) {
                        axios.get("/dept/getAllDepartments").then((respo) => {
                            // console.log(respo)
                            setDepartments(respo.data);
                            if (respo.statusText === "OK") {
                                axios.get("/clientProjectMapping/getAllClients").then((respon) => {
                                    // console.log(respon)
                                    setClients(respon.data.data);
                                    if (respon.data.status) {
                                        axios.get("/emp/getAllEmployeeMasterData").then((respons) => {
                                            console.log(respons)
                                            setPocName(respons.data.data);
                                            if (respons.data.status) {
                                                axios.get("/emp/getEmployeesByDepartment/HR").then((response) => {
                                                    const sData1 = response.data.data.filter(item => item.status === 'Active')
                                                    // console.log(sData1)
                                                    setHrPanel(sData1);
                                                    closeLoading();
                                                }).catch((err) => {
                                                    console.log("Error6");
                                                })

                                            }

                                        }).catch((err) => {
                                            console.log("Error5");
                                        })

                                    }
                                }).catch((err) => {
                                    console.log("Error4");
                                })

                            }

                        }).catch((err) => {
                            console.log("Error3")
                        })



                    }

                }).catch((err) => {
                    console.log("Error2")
                })

            }

        }
        ).catch((err) => {
            console.log("Error1")
        })
    }
    useEffect(() => {
        calls();

        // loadProjects();
        // loadDepartmentsData();
        // loadClients();

        // loadHRDeptEmployees();
        // const loadClients = async () => {
        //     const res = await axios.get("/clientProjectMapping/getAllClients");
        //     setClients(res.data.data);

        //     console.log(res);
        //     if (res.data.status) {
        //         getRequestedBy();
        //     } else {
        //         console.log("getRequestedBy failed");
        //     }
        // };
    }, []);
    const notify = () => toast();

    function setCourse(fiel, innerText) {
        setCourses({
            ...courses,
            [fiel]: innerText,
        });
    }
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
            jobTitle,
            technology,
            role,
            description,
            positions,
            pSkills,
            priority,
            allocType,
            pocname,
            requisitionId,
            workLocation,
            empType,
            yoe,
            reqType3,
            departmentName
        } = form;
        const newErrors = {};

        // validations for forms

        if (
            !jobTitle ||
            jobTitle === ""

        )
            newErrors.jobTitle =
                "Please enter Job Title";
        if (
            !requisitionId ||
            requisitionId === ""

        )
            newErrors.requisitionId = "Please Enter AERF ID";
        if (
            !technology ||
            technology === ""

        )
            newErrors.technology = "Please Enter Technology";
        if (
            !allocType ||
            allocType === ""

        )
            newErrors.allocType = "Please Enter Allocation Type";
        if (
            !description ||
            description === ""

        )
            newErrors.description = "Please Enter Job Description";
        if (
            !pSkills ||
            pSkills === ""

        )
            newErrors.pSkills = "Please Enter Primary Skills";
        if (
            !empType ||
            empType === ""

        )
            newErrors.empType =
                "Please enter Employment Type";
        if (
            !reqType3 ||
            reqType3 === ""
        )

            newErrors.reqType3 =
                "Please enter Requirement Type";


        if (
            !priority ||
            priority === "" ||
            !priority.match(/^(\w+\s)*\w+$/)
        )
            newErrors.priority =
                "Please enter Priority";
        if (
            !allocType ||
            allocType === ""

        )
            newErrors.allocType = "Please Enter Allocation Type";
        if (
            !yoe ||
            yoe === ""

        )
            newErrors.yoe = "Please enter Years of Experience";
        if (
            !positions ||
            positions === ""

        )
            newErrors.positions = "Please enter No. of Positions";


        if (
            !departmentName ||
            departmentName === ""

        )
            newErrors.departmentName = "Please Enter Business Unit";
        if (
            !pocname ||
            pocname === ""

        )
            newErrors.pocname = "Please Enter POC Name";

        if (
            !workLocation ||
            workLocation === ""

        )
            newErrors.workLocation = "Please Enter Work Location";




        if (
            !role || role === "")
            // this validation is for 'only alphabets' with 'only single space in between'
            newErrors.role = "Please enter Role ";

        return newErrors;
    };
    const obje3 = { createdBy: userType };


    //Setting raised By and RaisedOn Values from session storage and cureenet date
    const current = new Date();

    var raisedOn = Moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD hh:mm:ss');

    // const raisedOn = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const raisedBy = response.fullName;
    const history = useHistory();
    const routeToRRPage = () => history.push("/app/rrf")
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {

            const obj = { raisedOn: raisedOn, raisedBy: raisedBy };
            const form1 = Object.assign(form, obj);


            axios
                .post("/recruitmentTracker/createRequisitionRequest", form1)
                .then((response) => {

                   

                    if (response.data.status) {
                        toast.success("Requisition Raised Successfully", { autoClose: 500 });
                    routeToRRPage();
                    } else {
                        console.log("Not updated")
                    }
                    console.log("form submitted");
                    // notify();
                })
                .catch((err) => {
                    console.log("Something went wrong!");
                });
        }
    };

    const date = new Date();
    const date1 = Moment(date).format("YYYY-MM-DD");

    return (
        <div className="example" style={{ paddingLeft: "12px" }}>
            {loading ? (<>

                {
                    activeStep === 0 && (
                        <div>
                            <h5 style={{ paddingTop: "13px" }}>Arshaa Employee Requisition Form</h5>
                            <Form className="formone">
                                <Row>
                                    <Col md="9">
                                        <Row className="mb-5">
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>AERF ID *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="requisitionId"
                                                    type="text"
                                                    id="requisitionId"
                                                    controlid="requisitionId"
                                                    //placeholder="Job Title"
                                                    // onChange={(event) => setFirstName(event.target.value)}
                                                    value={form.requisitionId}
                                                    onChange={(e) => setField("requisitionId", e.target.value)}
                                                    isInvalid={!!errors.requisitionId}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.requisitionId}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="8" style={{ padding: 10 }}>
                                                <Form.Label>Job Title *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="jobTitle"
                                                    type="text"
                                                    id="jobTitle"
                                                    controlid="jobTitle"

                                                    value={form.jobTitle}
                                                    onChange={(e) => setField("jobTitle", e.target.value)}
                                                    isInvalid={!!errors.jobTitle}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.jobTitle}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Card as={Col} md="2" style={{ padding: 5 }}>
                                                <Form.Check
                                                    required
                                                    inline
                                                    label="Internal"
                                                    name="reqType1"
                                                    type='radio'
                                                    //id={`inline-${type}-1`}
                                                    //onChange={(event) => setInternalOrExternal(event.target.value)}
                                                    onChange={(e) => setField("reqType1", e.target.value)}
                                                    value="Internal"
                                                />
                                                <Form.Check
                                                    required
                                                    inline
                                                    label="External"
                                                    name="reqType1"
                                                    type='radio'
                                                    // id={`inline-${type}-2`}
                                                    // onChange={(event) => setLeaveOrwfh(event.target.value)}
                                                    onChange={(e) => setField("reqType1", e.target.value)}
                                                    value="External"

                                                />
                                            </Card>
                                            <Card as={Col} md="2" style={{ padding: 5 }}>
                                                <Form.Check
                                                    required
                                                    inline
                                                    label="New Recruitment"
                                                    name="reqType2"
                                                    type='radio'

                                                    onChange={(e) => setField("reqType2", e.target.value)}
                                                    value="New Recruitment"
                                                />
                                                <Form.Check
                                                    required
                                                    inline
                                                    label="Replacement"
                                                    name="reqType2"
                                                    type='radio'

                                                    onChange={(e) => setField("reqType2", e.target.value)}
                                                    value="Replacement"

                                                />

                                            </Card>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Requirement Type *</Form.Label>
                                                <Form.Select
                                                    required
                                                    className="reqType3"
                                                    type="text"
                                                    controlid="reqType3"

                                                    value={form.reqType3}
                                                    onChange={(e) => setField("reqType3", e.target.value)}
                                                    isInvalid={!!errors.reqType3}
                                                >
                                                    <option>Select </option>
                                                    <option>Staffing</option>
                                                    <option>Project</option>
                                                    <option>Pilot</option>

                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.reqType3}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Employment Type</Form.Label>
                                                <Form.Select
                                                    required

                                                    className="empType"
                                                    type="text"
                                                    controlid="empType"

                                                    value={form.empType}
                                                    maxLength={30}
                                                    onChange={(e) => setField("empType", e.target.value)}
                                                    isInvalid={!!errors.empType}
                                                >
                                                    <option>Select</option>
                                                    <option>Full Time</option>
                                                    <option>Contract</option>
                                                    <option>Intern</option>
                                                    <option>Part Time</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.empType}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Business Unit *</Form.Label>
                                                <Form.Select
                                                    required
                                                    className="departmentName"
                                                    type="text"
                                                    controlid="departmentName"
                                                    // placeholder="Business Unit"
                                                    value={form.departmentName}
                                                    maxLength={30}
                                                    onChange={(e) => setField("departmentName", e.target.value)}
                                                    isInvalid={!!errors.departmentName}
                                                >
                                                    <option>Select </option>
                                                    {departments.map((department, i) => (
                                                        <option key={i} value={department.departmentName}>
                                                            {department.departmentName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.departmentName}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Client </Form.Label>
                                                <Form.Select
                                                    required
                                                    className="clientName"
                                                    type="text"
                                                    controlid="clientName"
                                                    // placeholder="Client"
                                                    value={form.clientId}
                                                    name={form.clientName}
                                                    maxLength={30}
                                                    onChange={(e) => {


                                                        axios.get(`/clientProjectMapping/getProjectsByClientName/${e.target.value}`).then((response) => {
                                                            console.log(response.data.data);
                                                            setProjects(response.data.data);


                                                            setField("clientName", response.data.clientName)

                                                        });


                                                    }}
                                                    isInvalid={!!errors.clientName}
                                                >
                                                    <option>Select </option>
                                                    {clients.map((client, i) => (
                                                        <option key={i} value={client.clientName}>
                                                            {client.clientName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.clientName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Project </Form.Label>
                                                <Form.Select
                                                    required
                                                    className="projectName"
                                                    type="text"
                                                    controlid="projectName"
                                                    // placeholder="Project Name"
                                                    value={form.projectName}
                                                    maxLength={30}
                                                    onChange={(e) => setField("projectName", e.target.value)}
                                                    isInvalid={!!errors.projectName}
                                                >
                                                    <option>Select </option>
                                                    {projects.map((project, i) => (
                                                        <option key={i} value={project.projectName}>
                                                            {project.projectName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.projectName}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Work Location *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="workLocation"
                                                    type="text"
                                                    id="workLocation"
                                                    controlid="workLocation"
                                                    // placeholder="Work Location"
                                                    // onChange={(event) => setFirstName(event.target.value)}
                                                    value={form.workLocation}
                                                    onChange={(e) => setField("workLocation", e.target.value)}
                                                    isInvalid={!!errors.workLocation}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.workLocation}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Technology *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="technology"
                                                    type="text"
                                                    controlid="technology"
                                                    // placeholder="Requisition Request Status"
                                                    value={form.technology}
                                                    onChange={(e) => setField("technology", e.target.value)}
                                                    isInvalid={!!errors.technology}
                                                >

                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.technology}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Role *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="role"
                                                    type="text"
                                                    controlid="role"
                                                    // placeholder="Role"
                                                    value={form.role}
                                                    onChange={(e) => setField("role", e.target.value)}
                                                    isInvalid={!!errors.role}
                                                >

                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.role}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Allocation Type *</Form.Label>
                                                <Form.Select
                                                    required
                                                    className="allocType"
                                                    type="text"
                                                    controlid="allocType"

                                                    value={form.allocType}
                                                    onChange={(e) => setField("allocType", e.target.value)}
                                                    isInvalid={!!errors.allocType}
                                                >
                                                    <option>Select </option>
                                                    <option>Billable</option>
                                                    <option>Non-Billable</option>

                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.allocType}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="2" style={{ padding: 10 }}>
                                                <Form.Label>No. of Positions *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="positions"
                                                    type="number"
                                                    id="positions"
                                                    controlid="positions"

                                                    value={form.positions}
                                                    onChange={(e) => setField("positions", e.target.value)}
                                                    isInvalid={!!errors.positions}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.positions}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="2" style={{ padding: 10 }}>
                                                <Form.Label>Years of Experience *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="yoe"
                                                    type="number"
                                                    id="yoe"
                                                    controlid="yoe"

                                                    value={form.yoe}
                                                    onChange={(e) => setField("yoe", e.target.value)}
                                                    isInvalid={!!errors.yoe}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.yoe}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Priority *</Form.Label>
                                                <Form.Select
                                                    required

                                                    className="priority"
                                                    type="text"
                                                    id="priority"
                                                    controlid="priority"

                                                    value={form.priority}
                                                    onChange={(e) => setField("priority", e.target.value)}
                                                    isInvalid={!!errors.priority}
                                                >
                                                    <option>Select</option>
                                                    <option>P1</option>
                                                    <option>P2</option>
                                                    <option>P3</option>
                                                </Form.Select>

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.priority}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" style={{ padding: 10 }}>
                                                <Form.Label>Primary Skills *</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="pSkills"
                                                    type="text"
                                                    id="pSkills"
                                                    controlid="pSkills"


                                                    value={form.pSkills}
                                                    onChange={(e) => setField("pSkills", e.target.value)}
                                                    isInvalid={!!errors.pSkills}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.pSkills}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" style={{ padding: 10 }}>
                                                <Form.Label>Secondary Skills</Form.Label>
                                                <Form.Control

                                                    className="sSkills"
                                                    type="text"
                                                    id="sSkills"
                                                    controlid="sSkills"

                                                    value={form.sSkills}
                                                    onChange={(e) => setField("sSkills", e.target.value)}
                                                    isInvalid={!!errors.sSkills}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.sSkills}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                as={Col}
                                                md="12"
                                                height="10rem"
                                                style={{ padding: 10 }}
                                            >
                                                <Form.Label>Job Description *</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="textarea"
                                                    id="description"
                                                    style={{ height: "80px" }}
                                                    placeholder="Job Description"
                                                    controlid="description"
                                                    value={form.description}
                                                    onChange={(e) => setField("description", e.target.value)}
                                                    isInvalid={!!errors.description}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.description}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Rate</Form.Label>
                                                <Form.Control
                                                    name="rate"
                                                    type="number"
                                                    id="rate"
                                                    controlid="rate"

                                                    value={form.rate}
                                                    onChange={(e) => setField("rate", e.target.value)}
                                                    isInvalid={!!errors.rate}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.rate}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Working Hours</Form.Label>
                                                <Form.Control
                                                    name="workingHours"
                                                    type="number"
                                                    id="workingHours"
                                                    controlid="workingHours"

                                                    value={form.workingHours}
                                                    onChange={(e) => setField("workingHours", e.target.value)}
                                                    isInvalid={!!errors.workingHours}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.workingHours}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Educational Qualification</Form.Label>
                                                <Form.Control
                                                    name="qualification"
                                                    type="text"
                                                    id="qualification"
                                                    controlid="qualification"

                                                    value={form.qualification}
                                                    onChange={(e) => setField("qualification", e.target.value)}
                                                    isInvalid={!!errors.qualification}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.qualification}
                                                </Form.Control.Feedback>
                                            </Form.Group>


                                            {" "}
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Contact Name *</Form.Label>
                                                <Form.Select
                                                    required
                                                    className="pocname"
                                                    type="text"
                                                    controlid="pocname"

                                                    value={form.pocname}
                                                    maxLength={30}
                                                    onChange={(e) => setField("pocname", e.target.value)}
                                                    isInvalid={!!errors.pocname}
                                                >
                                                    <option>Select </option>
                                                    {pocname.map((poc, i) => (
                                                        <option key={i} value={poc.fullName}>
                                                            {poc.fullName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.pocname}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Upload Document </Form.Label>
                                                <Form.Control
                                                    name="uploadDoc"
                                                    type="file"
                                                    id="uploadDoc"
                                                    controlid="uploadDoc"

                                                    value={form.uploadDoc}
                                                    onChange={(e) => setField("uploadDoc", e.target.value)}
                                                    isInvalid={!!errors.uploadDoc}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.uploadDoc}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control

                                                type="textarea"
                                                id="comments"
                                                placeholder="Comments"
                                                style={{ height: "80px" }}
                                                controlid="comments"
                                                value={form.comments}
                                                onChange={(e) => setField("comments", e.target.value)}
                                                isInvalid={!!errors.comments}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.comments}
                                            </Form.Control.Feedback>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Interview Panel1</Form.Label>
                                                <Form.Select

                                                    className="interviewPanel1"
                                                    type="text"
                                                    controlid="interviewPanel1"

                                                    value={form.interviewPanel1}
                                                    maxLength={30}
                                                    onChange={(e) => setField("interviewPanel1", e.target.value)}
                                                    isInvalid={!!errors.interviewPanel1}
                                                >
                                                    <option>Select </option>
                                                    {pocname.map((poc, i) => (
                                                        <option key={i} value={poc.fullName}>
                                                            {poc.fullName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.interviewPanel1}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Interview Panel2</Form.Label>
                                                <Form.Select

                                                    className="interviewPanel2"
                                                    type="text"
                                                    controlid="interviewPanel2"

                                                    value={form.interviewPanel2}
                                                    maxLength={30}
                                                    onChange={(e) => setField("interviewPanel2", e.target.value)}
                                                    isInvalid={!!errors.interviewPanel2}
                                                >
                                                    <option>Select </option>
                                                    {pocname.map((poc, i) => (
                                                        <option key={i} value={poc.fullName}>
                                                            {poc.fullName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.interviewPanel2}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>HR Panel</Form.Label>
                                                <Form.Select

                                                    className="hrPanel"
                                                    type="text"
                                                    controlid="hrPanel"

                                                    value={form.hrPanel}
                                                    maxLength={30}
                                                    onChange={(e) => setField("hrPanel", e.target.value)}
                                                    isInvalid={!!errors.hrPanel}
                                                >
                                                    <option>Select </option>
                                                    {hrPanel.map((hrcandidates, i) => (
                                                        <option key={i} value={hrcandidates.fullName}>
                                                            {hrcandidates.fullName}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.hrPanel}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Request Initiated Date</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="requestInitiatedDate"
                                                    type="date"
                                                    controlid="requestInitiatedDate"

                                                    value={form.requestInitiatedDate}
                                                    onChange={(e) => setField("requestInitiatedDate", e.target.value)}
                                                    isInvalid={!!errors.requestInitiatedDate}
                                                >

                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.requestInitiatedDate}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Resource Required Date</Form.Label>
                                                <Form.Control
                                                    required
                                                    className="resourceRequiredDate"
                                                    type="date"
                                                    controlid="resourceRequiredDate"
                                                    min={form.requestInitiatedDate}
                                                    value={form.resourceRequiredDate}
                                                    onChange={(e) => setField("resourceRequiredDate", e.target.value)}
                                                    isInvalid={!!errors.resourceRequiredDate}
                                                >

                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.resourceRequiredDate}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Requested By</Form.Label>
                                                <Form.Control
                                                    //  type="date"
                                                    disabled
                                                    value={raisedBy}
                                                >
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Request Raised On</Form.Label>
                                                <Form.Control

                                                    disabled
                                                    value={raisedOn}
                                                >
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ padding: 10 }}>
                                                <Form.Label>Request Closed Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    disabled
                                                >
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">

                                                </Form.Control.Feedback>
                                            </Form.Group>


                                            {" "}
                                            <Form.Group controlid="submit">
                                                <br />
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}

                                                    className="'my-2"
                                                    id="submitButton"
                                                    style={{
                                                        backgroundColor: "#f5896e",
                                                        borderColor: "#ff9b44", width: "10rem", borderRadius: "25px"
                                                    }}
                                                    variant="success"


                                                >
                                                    Submit
                                                </Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button
                                                    type="submit"

                                                    className="'my-2"
                                                    id="cancelButton"
                                                    style={{
                                                        backgroundColor: "#B6B6B4",
                                                        borderColor: "#B6B6B4", width: "10rem", borderRadius: "25px"
                                                    }}
                                                    variant="success"
                                                    onClick={() => history.push("/app/rrf")}
                                                >
                                                    Back
                                                </Button>
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    <Col md="1" className="width-vr">
                                        <div className="vr" style={{ height: "90%" }}></div>
                                    </Col>
                                    <Col md="2">
                                        <div style={{ height: "15%" }}>
                                            <RecruitmentTimeline />
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )
                }
            </>)
                :
                (<>
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open
                        onClick={closeLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>)
            }

        </div>
    );
};
export default StepperForm;


    
    
    

    


