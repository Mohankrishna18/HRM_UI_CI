import React from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import Editable from "./DepartmentComponents/DepartmentWithMtable";
import Department from "./DepartmentComponents/Department";
import DepartmentModal from "./DepartmentComponents/DepartmentModal";
import Departments from "./DepartmentComponents/Departments";
// Testing purpose
const DepartmentMain = () => {
  return (
    <div >
      <Card responsive className="scroll" style={{backgroundColor:"white"}} >
        <Card.Header style={{backgroundColor:"white"}}>
          <Card.Body >
            {/* <Card.Title> Departments</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Dashboard/Departments
            </Card.Subtitle>{" "} */}
              <Row>
                <Col xs={12}>
                  {/* <Editable /> */}
                  <Departments/>
                </Col>
              </Row>
          </Card.Body>
        </Card.Header>
      </Card>
    </div>
  );
};

export default DepartmentMain;