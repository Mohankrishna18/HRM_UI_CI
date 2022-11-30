import {React, useState} from 'react';
import {Button,Row,Col, Form} from "react-bootstrap";
import axios from "../../Uri";
import { toast } from "react-toastify";

function TAAHeadApproved(props) {
    console.log(props.onboardID.onboardingId);
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

    const ApproveHandler = (e) => {
        // e.prevetDefault();
        const notify = () => toast("Approved");
        // handleClose();
        // const form1 = Object.assign(form, obj);
        let onboardingId = props.onboardID.onboardingId;
        console.log(props.onboardID);
        const obj = { onboardingStatus: "TAAHeadApproved" };
        const form1 = Object.assign(form, obj);
        axios.put(`/emp/updateTAAHeadApproval/${onboardingId}`,form1)
        .then((res)=>{
            console.log(res)
            if(res.status == 200){
                props.func();
            }
            else{
                console.log('props not send')
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.error("Something wrong");
        });
        props.handleClose();
       
        notify();
      };
  return (
    <div>
        <Row>
            {/* <Col xs={9}>
            Are You Want to Approve This Leave
            </Col> */}
            <Row>
            <Col>
            <Form role="form">
                <Form.Group md="12" style={{ padding: 0 }}>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={2}
                        className="taaHeadApprovalComment"
                        type="text"
                        controlid="taaHeadApprovalComment"
                        placeholder="Approve Reason"
                        value={form.taaHeadApprovalComment}
                        onChange={(e) => setField("taaHeadApprovalComment", e.target.value)}
                        isInvalid={!!errors.taaHeadApprovalComment}
                    ></Form.Control>
                </Form.Group>

            </Form>
            <Button variant="primary" style={{backgroundColor: "#f5896e",
 borderColor: "#f5896e", marginTop: "5%", float: "right" }}
            onClick={ApproveHandler}
            >
            Yes
          </Button>
            </Col>
            </Row>
        </Row>
       
        
    </div>
  )
}

export default TAAHeadApproved
