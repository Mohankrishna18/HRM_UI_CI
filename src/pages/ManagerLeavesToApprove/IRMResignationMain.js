import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Grid from "@mui/material/Grid";
import axios from "../../Uri";
import { Button, Stack, Modal } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";

import IRMResignationApprove from "./IRMResignationApprove";
import IRMResignationReject from "./IRMResignationReject";

function IRMResignationMain(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [rejectshow, setRejectShow] = useState(false);
  const [leaveID, setLeaveID] = useState({});
  const [update, setUpdate] = useState(false);
  const [reject, setReject] = useState(false);

  const handleClose = () => {setShow(false)
    setLoading(true)
  };
  const closeLoader=()=>{
    setLoading(false)
  }
  const approveHandleClose = () => setUpdate(false);

  const [loading, setLoading] = React.useState(false);

  const closeLoading = () => setLoading(!loading);

  const handleCloseReject = () => setRejectShow(false);
  const rejectHandleClose = () => setReject(false);
  const handleShow = () => {};
  const pull_data = () => {
    setUpdate(!update);
  };
  const pull_dataReject = () => {
    setReject(!reject);
  };
  const pull_dataApprove = () => {
    setLeaveID(!leaveID);
  };

  useEffect(() => {
    loadData();
  }, [update, leaveID, reject]);

  const da = JSON.parse(sessionStorage.getItem("userdata"));
  const empID = da.data.employeeId;

  const loadData = async () => {
    setLoading(false);
    const res = await axios.get(`/resignation/getAllResignation/${empID}`);

    console.log(res.data);
    
   
    setData(res.data);

    setLoading(true);
  
  };
  const [columns, setColumns] = useState([
    { title: "Employee ID", field: "employeeId" },
    { title: "Resigning Employee", field: "resigningEmployee" },

    { title: "Reason", field: "reason" },
    {
      title: "Exit Date",
      field: "exitDate",
      type: "date",
      dateSetting: { locale: "en-GB" },
    },
    {
      title: "Resignation Date",
      field: "resignationDate",
      type: "date",
      dateSetting: { locale: "en-GB" },
    },
  ]);

  return (
    <div>
      {loading ? ( 
      <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ backgroundColor: "#f5896e" }}>
              <Modal.Title>Are you sure you want to Approve</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <IRMResignationApprove
                leaveID={leaveID}
                func={pull_data}
                handleClose={handleClose}
                closeLoader={closeLoader}
              />
            </Modal.Body>
          </Modal>
          <Modal show={rejectshow} onHide={handleCloseReject}>
            <Modal.Header closeButton style={{ backgroundColor: "#f5896e" }}>
              <Modal.Title>Are you sure you want to Reject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <IRMResignationReject
                leaveID={leaveID}
                func={pull_dataReject}
                handleClose={handleCloseReject}
                closeLoader={closeLoader}
              />
            </Modal.Body>
          </Modal>

          <Grid>
            <MaterialTable
              title="Exit Approvals"
              columns={columns}
              data={data}
              options={{
                paging: true,
                addRowPosition: "first",
                actionsColumnIndex: -1,
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
                exportButton: true,
              }}
              actions={[
                {
                  icon: "button",

                  tooltip: "Save User",

                  onClick: (event, rowData) =>
                    alert("You saved " + rowData.firstName),
                },
              ]}
              components={{
                Action: (props) => (
                  <div>
                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          setShow(true);
                          console.log(props);
                          setLeaveID(props.data);
                        }}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setRejectShow(true);
                          console.log(props);
                          setLeaveID(props.data);
                        }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </div>
                ),
              }}
            />
          </Grid>
      </div>
      
      ) : (
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
       
      )}
    
    </div>
  );
}

export default IRMResignationMain;
