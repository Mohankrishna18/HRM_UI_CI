import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row, Col, Table, } from 'react-bootstrap';

import { useState, useEffect } from "react";
import axios from '../../../Uri'

import { BrowserRouter as Router, Route, Link, Outlet } from "react-router-dom";

//scss
import style from "./styles.module.css";
//data for post
import data from "./data.json";




function AllEmployee() {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [employees, setEmployees] = useState([])



  const loadData = async () => {
    const res = await axios.get("/emp/getAllEmployeeMasterData");

    console.log(res.data.data)
    setEmployees(res.data.data)
    console.log(employees)
    console.log("hai");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (

    <Card responsive >
      <Card.Header>
        <Card.Body>
          <Card.Title>Employee</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">All Employees</Card.Subtitle>
          {/* <AddEmployee /> */}
        </Card.Body>
        <Form style={{ margin: 20 }}>


          <Row md={12} >
            <Table className='Scroll'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Emp-ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Ph_no</th>
                  <th>Mail_Id</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr>
                    {/* <td>{designation.designationId}</td> */}
                    <th scope="row">{index + 1}</th>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.designationName}</td>
                    <td>{employee.primaryPhoneNumber}</td>
                    <td>{employee.email}</td>


                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Form>

      </Card.Header>
    </Card>
  )
}

export default AllEmployee;