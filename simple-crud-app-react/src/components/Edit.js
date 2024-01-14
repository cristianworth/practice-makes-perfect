import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeesList from "./Employees";
import {  useNavigate } from "react-router-dom";
import getIndexById from "../utils/utils";

function Edit() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  var history = useNavigate();
  var index = getIndexById(id);

  function handleUpdate(e) {
    e.preventDefault();

    console.log(index)
    console.log(localStorage.getItem("Id"))
    var employee = EmployeesList[index];
    employee.Name = name;
    employee.Age = age;

    history("/");
  }

  useEffect(() => {
    setId(localStorage.getItem("Id"));
    setName(localStorage.getItem("Name"));
    setAge(localStorage.getItem("Age"));
  }, []);

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            value={name}
            type="text"
            placeholder="Enter a name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Control
            value={age}
            type="text"
            placeholder="Enter the Age"
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleUpdate(e)} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
