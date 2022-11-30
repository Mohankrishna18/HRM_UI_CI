import React from 'react'
import { Form } from 'react-bootstrap';
 
class BootstrapDatePickerComponent extends React.Component{
 
    render(){
 
        return(
            <div >
                <div className="row">
                    <div className="col-md-2">
                        <Form.Group controlid="dob">
                            <Form.Label>Select from Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                    <div className="col-md-2">
                        <Form.Group controlid="dob">
                            <Form.Label>Select To Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                </div>
            </div>
            
        )
    }
     
}
 
export default BootstrapDatePickerComponent;