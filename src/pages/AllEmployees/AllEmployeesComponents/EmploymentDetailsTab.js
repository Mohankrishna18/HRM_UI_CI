import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import axios from "../../../Uri";
import { toast } from "react-toastify";

function EmploymentDetailsTab() {

    // const userData = sessionStorage.getItem("userdata");
    // const userData1 = JSON.parse(userData);
    // const employeeid = userData1.data.employeeId;

    const userData = sessionStorage.getItem("userdata");
    const userData1 = JSON.parse(userData);
    const employeeid = userData1.data.employeeId;
    const empId = localStorage.getItem('item')

    const [ferrors, setFErrors] = useState("");
    const [serror, setSerror] = useState("");
    const [thirderrors, setThirdErrors] = useState("");
    const [fourerror, setFourerror] = useState("");
    const [fiveerrors, setFiveErrors] = useState("");
    const [sixerror, setSixerror] = useState("");
    const [sevenerrors, setSevenErrors] = useState("");
    const [eighterror, setEighterror] = useState("");
    const [nineerrors, setNineErrors] = useState("");
    const [tenerror, setTenerror] = useState("");
    const [elevenerrors, setElevenErrors] = useState("");
    const [tweleveerror, setTweleveerror] = useState("");
    const [thirteenerrors, setThirteenErrors] = useState("");
    const [fourteenerror, setFourteenerror] = useState("");
    const [fifteenerrors, setFifteenErrors] = useState("");
    const [sixteenerror, setSixteenerror] = useState("");
    const [seventeenerror, setSeventeenerror] = useState("");
    const [eighteenerror, setEighteenerror] = useState("");
    const [nineteenerror, setNineteenerror] = useState("");
    const [twentyerror, setTwentyerror] = useState("");
    const [twentyoneerror, setTwentyoneerror] = useState("");
    const [twentytwoerror, setTwentytwoerror] = useState("");
    const [twentythreerror, setTwentythreerror] = useState("");
    const [twentyfourerror, setTwentyfourerror] = useState("");
    const [twentyfiveerror, setTwentyfiveerror] = useState("");
    const [twentysixerror, setTwentysixerror] = useState("");
    const [twentysevenerror, setTwentysevenerror] = useState("");
    const [twentyeighterror, setTwentyeighterror] = useState("");
    const [twentynineerror, setTwentynineerror] = useState("");
    const [thirtyerror, setThirtyerror] = useState("");
    const [thirtyoneerror, setThirtyoneerror] = useState("");
    const [thirtytwoerror, setThirtytwoerror] = useState("");
    const [thirtythreeerror, setThirtythreeerror] = useState("");
    const [thirtyfourerror, setThirtyfourerror] = useState("");
    const [thirtyfiveerror, setThirtyfiveerror] = useState("");
    const [thirtysixerror, setThirtysixerror] = useState("");
    const [thirtysevenerror, setThirtysevenerror] = useState("");
    const [thirtyeighterror, setThirtyeighterror] = useState("");
    const [thirtynineerror, setThirtynineerror] = useState("");
    const [fourty, setFourty] = useState("");
    const [fourtyone, setFourtyone] = useState("");
    const [fourtytwo, setFourtytwo] = useState("");
    const [fourtythree, setFourtythree] = useState("");
    const [fourtyfour, setFourtyfour] = useState("");
    const [fourtyfive, setFourtyfive] = useState("");
    const [fourtysix, setFourtysix] = useState("");
    const [fourtyseven, setFourtyseven] = useState("");
    const [fourtyeight, setFourtyeight] = useState("");
    const [fourtynine, setFourtynine] = useState("");


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState(" ");
    const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState(" ");
    const [secondaryPhoneNumber, setSecondaryPhone] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState(" ");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [passportExpiryDate, setPassportExpiryDate] = useState("");
    const [passportNo, setPassportNo] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [primarySkills, setPrimarySkills] = useState("");
    const [secondarySkills, setSecondarySkills] = useState("");
    const [email, setEmail] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [designationName, setDesignationName] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [reportingManager, setReportingManager] = useState("");
    const [permanentAdress, setPermanentAddress] = useState("");
    const [permanentState, setPermanentState] = useState("");
    const [permanentCountry, setPermanentCountry] = useState("");
    const [permanentPincode, setPermanentPincode] = useState("");
    const [currentAdress, setCurrentAddress] = useState("");
    const [currentState, setCurrentState] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");
    const [currentPincode, setCurrentPincode] = useState("");
    const [postgraduationType, setTypeOfPostGraduation] = useState("");
    const [postgraduationBoardOfUniversity, setPostgraduationBoardOfUniversity] = useState("");
    const [postgraduationInstituteName, setPostgraduationInstituteName] = useState("");
    const [postgraduationInstituteCity, setPostgraduationInstituteCity] = useState("");
    const [postgraduationCourseName, setPostgraduationCourseName] = useState("");
    const [postgraduationJoiningYear, setPostgraduationJoiningYear] = useState("");
    const [postgraduationPassedYear, setPostgraduationPassedYear] = useState("");
    const [postgraduationGrade, setPostgraduationGrade] = useState("");
    const [graduationType, setTypeOfGraduation] = useState("");
    const [graduationBoardOfUniversity, setGraduationBoardOfUniversity] = useState("");
    const [graduationInstituteName, setGraduationInstituteName] = useState("");
    const [graduationInstituteCity, setGraduationInstituteCity] = useState("");
    const [graduationCourseName, setGraduationCourseName] = useState("");
    const [graduationJoiningYear, setGraduationJoiningYear] = useState("");
    const [graduationPassedYear, setGraduationPassedYear] = useState("");
    // const [graduationJoiningYear, setGraduationJoiningYear] = useState("");
    // const [graduationPassedYear, setGraduationPassedYear] = useState("");
    const [graduationGrade, setGraduationGrade] = useState("");
    const [intermediateBoardOfUniversity, setIntermediateBoardOfUniversity] = useState("");
    const [intermediateCollegeName, setIntermediateCollegeName] = useState("");
    const [intermediateCollegeCity, setIntermediateCollegeCity] = useState("");
    const [intermediateCourseName, setIntermediateCourseName] = useState("");
    const [intermediateJoiningYear, setIntermediateJoiningYear] = useState("");
    const [intermediatePassedYear, setIntermediatePassedYear] = useState("");
    const [intermediateGrade, setIntermediateGrade] = useState("");
    const [sscBoardOfUniversity, setSscBoardOfUniversity] = useState("");
    const [sscSchoolName, setSscSchoolName] = useState("");
    const [sscSchoolCity, setSscSchoolCity] = useState("");
    const [sscCourseName, setSscCourseName] = useState("");
    const [sscJoiningYear, setSscJoiningYear] = useState("");
    const [sscPassedYear, setSscPassedYear] = useState("");
    const [sscGrade, setSscGrade] = useState("");
    const [previousCompany1_name, setPreviousCompany1_name] = useState("");
    const [previousCompany1_designation, setPreviousCompany1_designation] = useState("");
    const [previousCompany1_joiningDate, setPreviousCompany1_joiningDate] = useState("");
    const [previousCompany1_relievingDate, setPreviousCompany1_relievingDate] = useState("");
    const [previousCompany1_employeeId, setPreviousCompany1_employeeId] = useState("");
    const [previousCompany1_typeOfEmployment, setPreviousCompany1_typeOfEmployement] = useState("");
    const [previousCompany1_reasonForRelieving, setPreviousCompany1_reasonForRelieving] = useState("");
    const [previousCompany2_name, setPreviousCompany2_name] = useState("");
    const [previousCompany2_designation, setPreviousCompany2_designation] = useState("");
    const [previousCompany2_joiningDate, setPreviousCompany2_joiningDate] = useState("");
    const [previousCompany2_relievingDate, setPreviousCompany2_relievingDate] = useState("");
    const [previousCompany2_employeeId, setPreviousCompany2_employeeId] = useState("");
    const [previousCompany2_typeOfEmployment, setPreviousCompany2_typeOfEmployement] = useState("");
    const [previousCompany2_reasonForRelieving, setPreviousCompany2_reasonForRelieving] = useState("");
    const [previousCompany3_name, setPreviousCompany3_name] = useState("");
    const [previousCompany3_designation, setPreviousCompany3_designation] = useState("");
    const [previousCompany3_joiningDate, setPreviousCompany3_joiningDate] = useState("");
    const [previousCompany3_relievingDate, setPreviousCompany3_relievingDate] = useState("");
    const [previousCompany3_employeeId, setPreviousCompany3_employeeId] = useState("");
    const [previousCompany3_typeOfEmployment, setPreviousCompany3_typeOfEmployement] = useState("");
    const [previousCompany3_reasonForRelieving, setPreviousCompany3_reasonForRelieving] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [projectName, setProjectName] = useState("");

    const [band, setBand] = useState("");

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
    console.log(designations)
  
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
  
    }, []);
    console.log(departments)

    const [bands, setBands] = useState([]);
    useEffect(() => {
      axios
        .get("/bands/getAllBands")
        .then((response) => {
          setBands(response.data.data);
        })
        .catch(() => {
          toast.error("data is not getting");
        });
  
    }, []);
    console.log(bands)
  
    const [employmentTypes, setEmploymentTypes] = useState([]);
    useEffect(() => {
      axios
        .get("/employmentType/getAllEmployments")
        .then((response) => {
            setEmploymentTypes(response.data.data);
        })
        .catch(() => {
          toast.error("data is not getting");
        });
    }, []);
    console.log(employmentTypes)

    const [reportingManagers, setReportingMangers] = useState([]);
    useEffect(() => {
      axios
        .get("/emp/getreportingmanager")
        .then((response) => {
            setReportingMangers(response.data.data);
        })
        .catch(() => {
          toast.error("data is not getting");
        });
    }, []);
    console.log(reportingManagers)

    const [project, setProject] = useState([]);
    useEffect(() => {
        axios
          .get("/clientProjectMapping/getAllProjects")
          .then((response) => {
            setProject(response.data.data);
          })
          .catch(() => {
            toast.error("data is not getting");
          });
      }, []);
      console.log(project)
    


    useEffect(() => {
        axios
            .get(`/emp/getEmploymentDetails/${empId}`)
            .then((response) => {
                setPrimarySkills(response.data.data.primarySkills);
                setSecondarySkills(response.data.data.secondarySkills);
                setEmploymentType(response.data.data.employmentType);
                setDepartmentName(response.data.data.departmentName);
                setProjectName(response.data.data.projectName);
                setBand(response.data.data.band);
                setReportingManager(response.data.data.reportingManager);
                setDesignationName(response.data.data.designationName);
            });
    }, []);

    const changeHandler = async (e) => {
        e.preventDefault();
        try{
        await axios.put(`/emp/updateEmploymentDetails/${empId}`, {
           primarySkills,
           secondarySkills,
           employmentType,
           band,
           departmentName,
           designationName,
           reportingManager,
           projectName
        });
        toast.success("Form Submitted Successfully");
    }
    catch(error){
        toast.error("Somethingwent Wrong");
  } 
    };

    return (

        <div>
            {/* <Card style={{ marginLeft: 8, marginRight: 8, marginTop: 0, backgroundColor: "#FAFDD0" }}>
                <Card.Title style={{ margin: 12, textAlign: "center" }}>
                    Employment Details
                </Card.Title>
            </Card> */}

            <Form
                onSubmit={(e) => changeHandler(e)}
                style={{ padding: 10 }}
            >
                <Row className="mb-5">
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Primary Skills</Form.Label>
                        <Form.Control
                            disabled
                            type="text"
                            placeholder="Primary Skills"
                            controlid="primarySkils"
                            value={primarySkills}
                            maxLength={15}
                            name="primarySkills"
                            onChange={(e) =>
                                setPrimarySkills(e.target.value)
                            }
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Secondary Skills</Form.Label>
                        <Form.Control
                            disabled
                            type="text"
                            placeholder="Secondary Skills"
                            controlid="secondarySkills"
                            value={secondarySkills}
                            maxLength={15}
                            name="secondarySkills"
                            onChange={(e) =>
                                setSecondarySkills(e.target.value)
                            }
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Employment Type</Form.Label>
                        <Form.Select
                        
                            type="text"
                            placeholder="Employment Type"
                            controlid="employmentType"
                            value={employmentType}
                            maxLength={15}
                            name="employmentType"
                            onChange={(e) =>
                                setEmploymentType(e.target.value) 

                            }
                        >
                  {employmentTypes.map((em) => (
                    <option value={em.employmentTypeName}>
                        {em.employmentTypeName}
                    </option>
                  ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Band</Form.Label>
                        <Form.Select
                        
                            type="text"
                            placeholder="Band"
                            controlid="band"
                            name="band"
                            value={band}
                            onChange={(event) => setBand(event.target.value)}
                        >
                            <option>Select</option>
                  {bands.map((b) => (
                    <option value={b.bandName}>
                        {b.bandName}
                    </option>
                  ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                        
                            type="text"
                            placeholder="Department Name"
                            controlid="departmentName"
                            value={departmentName}
                            maxLength={25}
                            name="departmentName"
                            onChange={(e) =>{
                                setDepartmentName(e.target.value)
                                axios
                                .get(
                                  `/designation/getDesignationByDepartment/${e.target.value}`
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  setDesignations(response.data);
                                });

                            }}
                        >
                             <option>Select </option>
                  {departments.map((departmentss) => (
                    <option value={departmentss.departmentName}>
                      {departmentss.departmentName}
                    </option>
                  ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Designation</Form.Label>
                        <Form.Select
                       
                            type="text"
                            placeholder="Designation Name"
                            controlid="designationName"
                            value={designationName}
                            maxLength={25}
                            name="designationName"
                            onChange={(e) =>
                                setDesignationName(e.target.value)
                            }
                        >
                             <option>Select</option>
                  {designations.map((designation) => (
                    <option value={designation.designationName}>
                        {designation.designationName}
                    </option>
                  ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Reporting Manager *</Form.Label>
                        <Form.Select
                        
                            placeholder="select Gender"
                            value={reportingManager}
                            onChange={(e) => {
                                setReportingManager(e.target.value)
                            }}
                        >
                            <option>Select </option>
                            {reportingManagers.map((r) => (
                    <option value={r.reportingmanager}>
                        {r.reportingmanager}
                    </option>
                  ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={{ padding: 10 }}>
                        <Form.Label>Project</Form.Label>
                        <Form.Select
                       
                            type="text"
                            placeholder="Project"
                            controlid="project"
                            value={projectName}
                            maxLength={15}
                            name="projectName"
                            onChange={(e) =>
                                setProjectName(e.target.value)
                            }
                        >
                            <option>Select</option>
                            {project.map((p) => (
                    <option value={p.projectName}>
                        {p.projectName}
                    </option>
                  ))}                           
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button
                    className="rounded-pill" md="3"
                    style={{ backgroundColor: "#f5896e",
                    borderColor: "#f5896e", float: "right" }}
                    type="submit"
                    size="lg"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default EmploymentDetailsTab;
