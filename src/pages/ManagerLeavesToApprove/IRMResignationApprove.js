import { React, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import axios from "../../Uri";
import { toast } from "react-toastify";

function IRMResignationApprove(props) {
  console.log(props.leaveID.employeeId);

  console.log(props.leaveID.reason);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [irmApprove, setIrmApprove] = useState("");
  const [resignationId, setResignationId] = useState("");

  const initialValues = {
    irmApprove,

  };

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
    const form1 = Object.assign(form, {resignationId:resignationId});
    let resignationId = props.leaveID.resignationId;
    console.log(resignationId);
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
          notify();
                props.closeLoader();
        } else {
          console.log("props not send");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong");
      });
    props.handleClose();

    
  };
  return (
    <div>
      <Form role="form">
        <Form.Group md="12" style={{ padding: 0 }}>
          <Form.Label>Employee Reason</Form.Label>
          <Form.Control
            required
            className="reason"
            type="text"
            disabled
            value={props.leaveID.reason}
          ></Form.Control>
        </Form.Group>
        <Form.Group md="12" style={{ paddingTop: "10px" }}>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={2}
            className="irmApprove"
            type="text"
            controlid="irmApprove"
            placeholder="Approve Reason"
            value={irmApprove}
            onChange={(e) => setIrmApprove(e.target.value)}
            // onChange={e=>console.log(e.target.value)}
            isInvalid={!!errors.irmApprove}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Button
        style={{
          backgroundColor: "#f5896e",
          borderColor: "#f5896e",
          marginTop: "5%",
          float: "right",
        }}
        onClick={ApproveHandler}
      >
        Yes
      </Button>
    </div>
  );
}

export default IRMResignationApprove;
