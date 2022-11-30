import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import axios from "../../../Uri";
import { FiEdit } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";

import DeleteRR from "./DeleteRR";
import ViewRR from "./ViewRR";
import { useParams, useHistory } from "react-router-dom";
import "./utils/RT.css";

const RRTable = () => {
  const [show, setShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [deleteLeads, setDeleteLeads] = useState(false);
  const deleteHandleClose = () => setDeleteLeads(false);
  const handleClose = () => setShow(false);
  const viewHandleClose = () => setViewShow(false);
  const [viewStatus, setViewStatus] = useState(false);
 

  const [viewOnboard, setViewOnboard] = useState({});
  const [data, setData] = useState([]);
 
  const [deleteOnboard, setDeleteOnboard] = useState({});
  const [deleteStatus, setDeleteStatus] = useState(true);

  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const closeLoading = () => setLoading(!loading);


  const pull_dataView = () => {
    setViewStatus(!viewStatus);
  };

  const pull_dataDelete = () => {
    setDeleteStatus(!deleteStatus);
  };

  useEffect(() => {

    axios.get("/recruitmentTracker/").then((response) => {
      setData(response.data);
      setLoading(true)
    }).catch((err) => {
      console.log("Error")
      closeLoading();
    })


  }, [deleteStatus, viewStatus]);
  function gotoStepperForm() {
    history.push('/app/StepperForm');
  }

  const RRColumns=[
    {
       
        "title": "Job ID",
        "field": "requisitionId"
    },
    {
        "title":"Business Unit",
        "field":"departmentName",
        "defaultGroupOrder": 0
    },
    {
        "title":"Client",
        "field":"clientName"
    },
    {
        "title":"Project",
        "field":"projectName"
    },
    {
        "title":"Title",
        "field": "jobTitle"
    },
    {
        "title":"Technology",
        "field":"technology"
    },
    {
        "title":"Role",
        "field":"role"
    },
    {
        "title":"Positions",
        "field": "positions"
    },
    {
        "title":"Priority",
        "field": "priority"
    },
    {
        "title":"Location",
        "field": "workLocation"
    },
    {
        "title":"Experience",
        "field":"yoe"
    },
    {
        "title":"Status",
        "field": "rrfStatus"
    },

    {
        "title":"Ageing",
        "field":"ageing"
    },
    {
        "title" : "Initiated Date",
        "field" : "requestInitiatedDate",
        "type": "date",
        "dateSetting": { "locale": "en-GB" }
    },
    {
        "title" : "Raised Date",
        "field" : "raisedOn",
        "type": "date",
        "dateSetting": { "locale": "en-GB" }
    }
   

]




  return (
    <div>
      {loading ? (<>
        <Modal show={viewShow} onHide={viewHandleClose} size="lg">
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#f5896e",
              paddingTop: "7px",
              paddingBottom: "4px",
            }}
          >
            <Modal.Title>Arshaa Employee Requisitions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewRR
              viewOnboard={viewOnboard}
              func={pull_dataView}
              viewHandleClose={viewHandleClose}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={viewHandleClose}>
              Cancel
            </Button>

          </Modal.Footer>
        </Modal>

        <Modal
          show={deleteLeads}
          onHide={deleteHandleClose}
          size="md"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#FF9E14",
              color: "white",
              paddingTop: "7px",
              paddingBottom: "4px",
            }}
          >
            <Modal.Title>Delete Requisition</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DeleteRR
              deleteOnboard={deleteOnboard}
              func={pull_dataDelete}
              deleteHandleClose={deleteHandleClose}
            />
          </Modal.Body>
        </Modal>

        {/* <Card
        style={{
          paddingTop: "2px",
          paddingRight: "10px",
          paddingLeft: "10px",
          paddingBottom: "10px",
        }}
      > */}

        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Arshaa Employee Requisitions</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Dashboard / Employee Requisitions{" "}
              </Card.Subtitle>
            </Col>
            <Col>
              <Button
                variant="warning"
                onClick={gotoStepperForm}
                style={{
                  backgroundColor: "#f5896e",
                  borderColor: "#ff9b44",
                  float: "right",
                  borderRadius: "25px",

                }}
              >
                {" "}
                <MdOutlinePersonAddAlt />

                &nbsp; Raise Requisition
              </Button>

            </Col>
          </Row>
        </Card.Body>
        <Grid container>
          <Grid xs={12}>

            <MaterialTable
              title=""
              columns={RRColumns}
              style={{ color: "black", fontSize: "0.9rem" }}
              data={data}
              editable={{}}
              options={{
                pageSize: 10,
                grouping: true,
                pageSizeOptions: [8, 10, 15, 20, 30, 50, 75, 100],
                maxBodyHeight: 450,
                headerStyle: {

                  background: "#f5896e",

                  fontSize: "13px",

                  paddingBottom: "4px",

                  paddingTop: "8px",

                  color: "white",
                },
                rowStyle: {
                  fontSize: 14,
                },
                addRowPosition: "first",
                actionsColumnIndex: -1,
 
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

                          history.push(
                            `/app/updateRequisition/${props.data.requisitionId}`
                          );

                        }}
                      >
                        <FiEdit />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          setDeleteLeads(true);

                          setDeleteOnboard(props.data);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                      <Button
                        variant="primary"
                        onClick={(event) => {
                          setViewShow(true);

                          setViewOnboard(props.data);

                        }}
                        style={{
                          backgroundColor: "#0000FF",
                          color: "#F4F8F6",
                          float: "right",
                          borderRadius: "20px",
                          height: "40px",
                          width: "70px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </div>
                ),
              }}
            />

          </Grid>
        </Grid>
      </>) : (<>
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
      </>)}

      {/* </Card> */}
    </div>
  );
}

export default RRTable;