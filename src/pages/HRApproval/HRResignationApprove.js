import {React, useState} from 'react';
import {Button,Row,Col, Form} from "react-bootstrap";
import axios from "../../Uri";
import { toast } from "react-toastify";


function HRResignationApprove(props) {
    
    console.log(props.leaveID.employeeleaveId);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [hrApprove, setHrApprove] = useState("");

    const initialValues = {
        hrApprove
    }

    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null,
            });
    };
    const ApproveHandler = (e) => {
        // e.prevetDefault();
        const notify = () => toast("Resignation is approved");
        // handleClose();
        // const form1 = Object.assign(form, obj);
        let employeeId = props.leaveID.employeeId;
    console.log(employeeId);
    const da = JSON.parse(sessionStorage.getItem("userdata"));
    const empID = da.data.employeeId;
    //   const employeeId = da.data.employeeId;

    console.log(props.leaveID);
    // const obj = { leaveStatus: "Approved" };
    // const form1 = Object.assign(form, obj);
    const values = Object.assign(initialValues,{resignationId:props.leaveID.resignationId})
    console.log(values);
    
    axios
      .put(
        `/resignation/modifyResignationStatus/${employeeId}/${empID}`,
        values
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          props.func();
        } else {
          console.log("props not send");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong");
      });
        props.handleClose();
       
        notify();
      };
  return (
    <div>
        
            {/* <Col xs={9}>
            Are You Want to Approve This Leave
            </Col> */}
            
            <Form role="form">

            <Form.Group md="12" style={{ paddingTop: "10px" }}>
          <Form.Label>Employee Reason</Form.Label>
          <Form.Control
            required
            className="reason"
            type="text"
            disabled
            value={props.leaveID.reason}
          ></Form.Control>
          <Form.Group md="12" style={{ paddingTop: "10px" }}>
            <Form.Label>IRM Reason</Form.Label>
            <Form.Control
              required
              className="reason"
              type="text"
              disabled
              value={props.leaveID.irmApprove}
            ></Form.Control>
          </Form.Group>
          <Form.Group md="12" style={{ paddingTop: "10px" }}>
            <Form.Label>SRM Reason</Form.Label>
            <Form.Control
              required
              className="reason"
              type="text"
              disabled
              value={props.leaveID.srmApprove}
            ></Form.Control>
          </Form.Group>

                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={2}
                        className="hrApprove"
                        type="text"
                        controlid="hrApprove"
                        placeholder="Approve Reason"
                        value={hrApprove}
                        onChange={(e) => setHrApprove(e.target.value)}
                        isInvalid={!!errors.hrApprove}
                    ></Form.Control>
                </Form.Group>

            </Form>
            <Button variant="primary" style={{ backgroundColor: "#f5896e",
 borderColor: "#ff9b44",marginTop: "5%", float: "right" }}
            onClick={ApproveHandler}
            >
            Yes
          </Button>
           
       
        
    </div>
  )
}

export default HRResignationApprove;