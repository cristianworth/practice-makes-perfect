import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeesList from "./Employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  var history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const ids = uuid();
    var uniqueId = ids.slice(0, 8);

    EmployeesList.push({ Id: uniqueId, Name: name, Age: age });
    history("/");
  }

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter a name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Control
            type="text"
            placeholder="Enter the Age"
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Add;
