import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Tabs,
  Tab,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

import Grid from "@mui/material/Grid";
import axios from "../../../Uri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import moment from "moment";
import { FcWebcam } from "react-icons/fc";

import "../../LeaveManagement/calender.css";
import { style } from "@mui/system";

const TotalPage = ({ totalHours }) => {
  console.log(totalHours);
  return (
    <>
      <div>
        <Row>
          <Col md="8"></Col><Col md="4"><h6>TotalHours: {totalHours}</h6></Col>
          {/* <Col></Col>
          <Col>
            <h5 style={{ float: "right" }}>Total Hours </h5>
          </Col>
          <Col>
            <h5>{totalHours}</h5>
          </Col> */}
          {/* <Col>
            <Button>submit</Button>
          </Col> */}
        </Row>
      </div>
    </>
  );
};

function TaskMain(props) {
  const [viewShow, setViewShow] = useState(false);
  const viewHandleClose = () => setViewShow(false);
  const [output, setOutput] = useState([{}]);
  const [ott, setOtt] = useState();
  const [irm, setIrm] = useState();
  const [approval, setApproval] = useState();
  const [taskData, setTaskData] = useState([]);
  const [date, setDate] = useState();
  const [dis, setDis] = useState([]);
  const notifySuccess = (message) => toast.success(message);
  console.log(irm);
  console.log(props.data);
  const da = JSON.parse(sessionStorage.getItem("userdata"));
  const employeeId = da.data.employeeId;
  console.log(employeeId);
  const rowData = props.rowData;
  const pull_dataAdd = () => {
    setAddStatus(!addStatus);
  };

  const pull_dataDelete = () => {
    setDeleteStatus(!deleteStatus);
    // console.log("Delete");
  };

  const pull_dataUpdate = () => {
    setUpdateStatus(!updateStatus);
  };

  useEffect(() => {
    loadRoles();
  }, [addStatus, deleteStatus, updateStatus]);

  useEffect(() => {
    getIrm();
  }, []);

  const getIrm = async (e) => {
    const response = await axios.get(`/emp/getIrmByEmployeeId/${employeeId}`);
    setIrm(response.data.irmId);
    console.log(response);
    console.log("dataupdated");
  };
  let datess = [];
  let mark = [];
  let disdates = [];

  useEffect(() => {
    getEmployeeDataApproval();
  }, []);
  const getEmployeeDataApproval = async (e) => {
    const response = await axios.get(
      `timesheet/gettimesheetData/${employeeId}`
    );
    setApproval(response.data);
    console.log(response.data);
    response.data.map((m) => {
      // const harr = m.timeSheetDate.replace(/[-,]/g, ",");

      // const hstr = harr.replace(/\b0/g, "").split("T0")[0];

      // console.log(hstr);
      const hstr = moment.utc(m.timeSheetDate).format("YYYY-MM-DD");
      const arr = hstr.replace(/[-,]/g, ",");
      const str = arr.replace(/\b0/g, "");
      console.log(str);
      disdates.push(new Date(str));
      console.log(disdates);
      setDis(disdates);
      const daaa = moment.utc(m.timeSheetDate).format("DD-MM-YYYY");
      console.log(daaa);

      datess.push(m.timeSheetDate);
      mark.push(daaa);
      console.log(mark);
      setDates(mark);

      console.log(daaa);
    });
    console.log("dataupdated");
    console.log(datess);
  };
  //FOR MODAL OF seperate employee
  useEffect(() => {
    getTaskDetails();
  }, []);
  const getTaskDetails = async (e) => {
    const response = await axios.get(`timesheet/gettaskDetails/${employeeId}`);
    setTaskData(response.data);
    console.log(response.data);
  };

  const loadRoles = async (e) => {
    const response = await axios.get(
      `/task/getByStatus/${employeeId}/In Progress`
    );
    setData(response.data);
    console.log(response);
    console.log("dataupdated");
  };
  const current = new Date();
  const currentdate = `${current.getFullYear()},${current.getMonth() + 1
    },${current.getDate()}`;
  console.log(currentdate);
  const BackDate = `${current.getFullYear()},${current.getMonth() - 3
    },${current.getDate()}`;
  console.log(BackDate);
  // const [empdata, setEmpdata] = useState([]);
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [dates, setDates] = useState([]);
  const [color, setColor] = useState([]);
  const [marks, setMarks] = useState([]);
  const [btwnDates, setBtwnDates] = useState([]);
  const [timeSheetDate, setTimeSheetDate] = useState();
  const [state, setState] = useState(false);
  // const [time, setTime] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [estimatedHours, setEstimatedHours] = useState([]);
  const [actualHours, setActualHours] = useState([]);
  const [remainingHours, setRemainingHours] = useState([]);
  const [merged, setMerged] = useState([]);
  const ot = [];
  const currentt = new Date();

  const currenttdate = `${currentt.getFullYear()},${currentt.getMonth() + 1
    },${currentt.getDate()}`;
  console.log(currenttdate);
  const BackkDate = `${currentt.getFullYear()},${currentt.getMonth() + 1},${currentt.getDate() - 7
    }`;

  console.log(BackkDate);

  var bdate = new Date();
  bdate.setDate(bdate.getDate() - 7);
  console.log(bdate);
  const bd = moment.utc(bdate).format("YYYY,MM,DD");
  console.log(bd);

  const frontDate = `${currentt.getFullYear()},${currentt.getMonth() + 1
    },${currentt.getDate()}`;
  console.log(frontDate);

  const time = [];

  const [columns, setColumns] = useState([
    {
      selection: true,
      width: "5%"
    },
    {
      title: "Project",
      field: "projectName",
      type: "text",
      editable: "never",

    },

    {
      title: "Task Title",
      field: "taskTitle",
      type: "text",
      editable: "never",
    },
    {
      title: "Task Type",
      field: "taskType",
      type: "text",
      editable: "never",
    },

    {
      title: "EstimatedHours",
      field: "estimatedHours",
      type: "numeric",
      editable: "never",
    },
    {
      title: "ActualHours",
      field: "actualHours",
      type: "numeric",
      validate: (rowData) => rowData.actualHours <= 16,
    },
    {
      title: "RemainingHours",
      field: "remainingHours",
      type: "numeric",
      editable: "never",

      // render:  rowData=> axios
      //   .get(`/timesheet/getremainingHours/${rowData.estimatedHours}/${rowData.actualHours}`)
      //   .then((res) => {
      //       if (res.data > 30) {
      //           alert("Limit exceeded");
      //           const err = "Limit exceeded";
      //       } else {
      //           setDay(res.data);
      //       }
      //   })
      // },
    },
  ]);
  const [columns1, setColumns1] = useState([
    {
      title: "Timesheet Date",
      field: "timeSheetDate",
      type: "date",
      editable: "never",
      dateSetting: { locale: "en-GB" },
    },
    {
      title: "Total Hours",
      field: "totalHours",
      type: "text",
      editable: "never",
    },
  ]);

  const [data, setData] = useState([]);
  const [post, setPost] = React.useState(null);

  var objectData = { employeeId, timeSheetDate, totalHours, irm };
  console.log(objectData);

  // function onSubmit() {
  //   axios
  //     .post("/timesheet/createNewTimesheet", merged)
  //     .then((response) => {
  //       console.log(response)

  //     });
  // }

  //  const obj ={...output}

  const onSubmit = async (e) => {
    // e.preventdefault();
    // console.log(e.target.itemData);
    const res = await axios.post("/timesheet/addTimehseetApproval", objectData);
    console.log(res.data);
    setMerged(res.data);
    setTotalHours(0);
    notifySuccess("TimeSheet Submitted Successfully");

    setTimeout(1000);
    const responce = await axios.post("/timesheet/createNewTimesheet", ott);
    console.log(responce.data);
    // setMerged(res.data);
    const updatee = await axios.put("/task/updateActualHoursToZero");
    console.log(updatee.data);
    loadRoles();
  };

  //   const submit = (e) => {
  //     e.preventDefault();

  //     objectData= {empID, sum, da}
  //     axios
  //     .post("/timesheet/createTimesheet", {
  //       totalHours: sum,
  //       employeeId: empID,
  //       timesheetDate: da,

  //        })
  //        .then((res) => {
  //           setPosts((posts) => [res.data, ...posts]);
  //           setTitle('');
  //           setBody('');
  //        })
  //        .catch((err) => {
  //           console.log(err.message);
  //        });
  //  };

  return (
    <div className="scroll">
      <Modal show={viewShow} onHide={viewHandleClose} size="xl">
        <Modal.Header style={{ backgroundColor: "#f5896e" }}>
          <Modal.Title>Timesheet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Estimated Hours</th>
                <th>Actual Hours</th>
                <th>Remaining Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((item) => (
                <tr>
                  <td>{item.taskTitle}</td>
                  <td>{item.estimatedHours}</td>
                  <td>{item.actualHours}</td>
                  <td>{item.remainingHours}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      <Row
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          marginTop: "5px",
        }}
      >
        <Form.Group as={Col} md="12" style={{ paddingleft: 6 }}>
          <Row>
            <Col md="3"
              style={{ paddingLeft: "0%", fontSize: "15px", paddingTop: "60px" }}
            >
              <h6>Select Date</h6>
              <Calendar
                // minDate={new Date(BackDate)}
                minDate={new Date(bd)}
                maxDate={new Date(frontDate)}
                onChange={(e) => {
                  console.log(e);
                  const da = moment.utc(e + 1).format("YYYY-MM-DD");
                  console.log(da);
                  setTimeSheetDate(da);
                  // setState(true);
                }}
                tileClassName={({ date, view }) => {
                  if (
                    dates.find((x) => x === moment(date).format("DD-MM-YYYY"))
                  ) {
                    return "applied";
                  }
                }}
                tileDisabled={({ date }) =>
                  dis.some(
                    (disabledDate) =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                  )
                }
              // tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 || frontDate}
              />
            </Col>
            <Col md="9" className="my-3">
              <MaterialTable className="scroll"
                title=""
                columns={columns}
                data={data}
                options={{
                  headerStyle: {
                    backgroundColor: "#f5896e",
                    color: "white",
                    fontSize: "12px",
                    //height: "10px",
                    //fontWeight: 'bold'
                  },
                  rowStyle: {
                    fontSize: 14,
                  },
                  selection: true,

                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15, 20, 30, 50, 75, 100],
                  // maxBodyHeight: 450,
                  addRowPosition: "first",
                  actionsColumnIndex: -1,
                  //grouping: true,
                  exportButton: true,
                }}
                onSelectionChange={(rows) => {
                  rows.map((items) => {
                    console.log(items.actualHours);
                    console.log(items);

                    setOutput([{ ...objectData, ...items }]);
                    ot.push({ ...objectData, ...items });
                    console.log(output);
                    rows.push(objectData);
                    console.log(rows);
                    time.push(parseInt(items.actualHours));
                  });
                  console.log(ot);
                  setOtt(ot);
                  let s = 0;
                  time.forEach(myFunction);

                  function myFunction(item) {
                    s += item;
                  }
                  console.log(s);
                  setTotalHours(s);

                  console.log(time);
                }}
                editable={{
                  // onRowAdd: (newData) =>
                  //   new Promise((resolve, reject) => {
                  //     setTimeout(() => {
                  //       setData([...data, newData]);

                  //       resolve();
                  //     }, 1000);
                  //   }),
                  onRowUpdate: (updatedRow, oldRow) =>
                    new Promise((resolve, reject) => {
                      console.log(oldRow);
                      console.log(updatedRow);
                      const index = oldRow.tableData.id;
                      console.log(index);
                      const updatedRows = [...data];
                      console.log(updatedRows);
                      updatedRows[oldRow.tableData.id] = updatedRow;
                      console.log(updatedRows);

                      setTimeout(async function upWale() {
                        console.log(index);
                        console.log(updatedRow);
                        const res = await axios
                          .get(
                            `/task/calculateRemainingHours/${updatedRow.taskId}/${updatedRow.actualHours}`,
                            updatedRow
                          )
                          .then((resp) => {
                            console.log(resp);
                            setData(updatedRows);
                            if (resp.statusText === "OK") {
                              loadRoles();
                            }
                          })

                          .catch((err) => {
                            console.log("not updated");
                            // toast.error("Server error");
                          });

                        setData(updatedRows);
                        console.log("updated");
                        toast.success(" Updated Successfully");
                        console.log(updatedRows);
                        resolve();
                      }, 1000);
                    }),
                }}
              />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <Row>
        <Col className="COLLLL" md="6"></Col>

        <Col
          className="COLLLL"
          md="6"
          style={{ float: "left", paddingTop: "1%" }}
        >
          <Row>
            <Col md="9" style={{ float: "right", paddingTop: "13px" }}>
              <TotalPage totalHours={totalHours}></TotalPage>
            </Col>
            <Col md="3" style={{ float: "right" }}>
              <Button onClick={onSubmit} style={{
                backgroundColor: "#f5896e",
                borderColor: "#ff9b44", width: "120px", float: "right"
              }}>
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default TaskMain;
