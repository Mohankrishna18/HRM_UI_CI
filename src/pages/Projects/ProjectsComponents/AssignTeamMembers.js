import React, { useState, useEffect, useContext } from "react";
import MaterialTable from "material-table";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import axios from "../../../Uri";
import { FiAlignRight, FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
import UpdateTeamMember from "./UpdateTeamMember";
import { UserContext } from "./ProjectUpdateTabs";

function AssignTeamMembers(props) {
  const projectName = props.data.data.projectName;
  const { data,updateStatus } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);

  const [updateOnboard, setUpdateOnboard] = useState({});
  const [viewOnboard, setViewOnboard] = useState({});

  const [data1, setData] = useState([]);
  const [addStatus, setAddStatus] = useState(false);
  // const [updateStatus, setUpdateStatus] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);
  const [deleteOnboard, setDeleteOnboard] = useState({});
  const [deleteProjects, setDeleteProjects] = useState(false);

  const handleClose = () => setShow(false);
  const viewHandleClose = () => setViewShow(false);

  const handleShow = () => setShow(false);
  const viewHandleShow = () => setShow(false);

  // const pull_dataUpdate = () => {
  //   setUpdateStatus(!updateStatus);
  // };
 
  useEffect(() => {
    loadData();
  }, [addStatus, updateStatus]);

  const loadData = async (e) => {
    const response = await axios.get(`emp/employeesToDisplayByTheirProjectAllocation/${projectName}`);
    setData(response.data);
  };    

  const [columns, setColumns] = useState([
    {
      title: "Employee ID",
      field: "employeeId",
    },
    {
      title: "Name",
      field: "fullName",
      type: "text",
    },
    {
      title: "Designation",
      field: "designationName",
    },
    {
      title: "Business Unit",
      field: "departmentName",
    },
    {
      title: "Project",
      field: "projectName",
      width: "20px",
    },
  ]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f5896e",
            paddingTop: "5px",
            paddingBottom: "5px",
            color: "white",
          }}
        >
          <Modal.Title style={{ color: "white" }}>
            Assigning Team Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateTeamMember
            updateOnboard={updateOnboard}
            data={props.data}
            func={props.func}
            handleClose={handleClose}
            // dataUpdate={pull_dataUpdate}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Modal
        show={deleteProjects}
        // onHide={deleteHandleClose}
        size="md"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f5896e", color: "white" }}
        >
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>

      <Grid style={{ borderBlockEndWidth: "2px" }}>
        <MaterialTable
          title={"Project Name : " + data}
          columns={columns}
          style={{ color: "black", fontSize: "1rem" }}
          data={data1}
          editable={{}}
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

            pageSize: 15,

            pageSizeOptions: [10, 15, 20, 30, 50, 75, 100],

            maxBodyHeight: 9000,

            addRowPosition: "first",

            actionsColumnIndex: -1,

            //grouping: true,

            exportButton: true,
          }}
          actions={[
            {
              icon: "button",
              tooltip: "Save User",
              onClick: (event, rowData) =>
                alert("You want to delete " + rowData.firstName),
            },
          ]}
          components={{
            Action: (props) => (
              <div>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="info"
                    onClick={(event) => {
                      setShow(true);
                      setUpdateOnboard(props.data);
                    }}
                  >
                    Assign
                    {/* <FiEdit /> */}
                  </Button>{" "}
                </Stack>
              </div>
            ),
          }}
        />
      </Grid>
    </div>
  );
}

export default AssignTeamMembers;
