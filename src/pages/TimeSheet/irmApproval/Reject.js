import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import axios from "../../../Uri";

  const RejectHandler = (props) => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
      setForm({ ...form, [field]: value });
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: null,
        });
    };

    console.log(props.updateApproval);
   let employeeId = props.updateApproval.employeeId;
   let timesheetId = props.updateApproval.timesheetId;
   console.log(employeeId)
   console.log(timesheetId)
   
   const obj = { status: "Rejected"};

   const da = JSON.parse(sessionStorage.getItem('userdata'))
    const userType = da.data.userType;
    console.log(userType);
   
  
    const ApproveHandler = (e) => {
      e.preventDefault();
      const form1 = Object.assign(form, obj);
      console.log(form1);
      axios.put(`/timesheet/timesheetApproval/${timesheetId}/${employeeId}/${userType}`, form1)
      .then((res)=>{
        console.log(res)
        if(res.status ==200){
          props.func();
        }
      })
      props.handleClose1();
      // alert("Approved Successfully!");
    };

  return (
    <div>
      <Row>
        <Col>
          <Form role="form">
            <Form.Group as={Col} md="12" style={{ padding: 10 }}>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                className="comments"
                type="textarea"
                controlid="comments"
                placeholder="Comment"
                as="textarea"
                rows={2}
                value={form.comments}
                onChange={(e) => setField("comments", e.target.value)}
                isInvalid={!!errors.comments}
              ></Form.Control>
            </Form.Group>
            <Button
              variant="warning"
              
              style={{
                borderRadius: "25px",
                backgroundColor: "#f5896e",
 borderColor: "#f5896e",
              }}
              onClick={ApproveHandler}
            >
              &nbsp; Reject
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default RejectHandler;
