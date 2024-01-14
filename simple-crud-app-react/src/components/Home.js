import React, { Fragment } from "react";
import { Button, Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeesList from "./Employees";
import { Link, useNavigate } from "react-router-dom";
import getIndexById from "../utils/utils";

function Home() {
  var history = useNavigate();

  function handleEdit(id, name, age) {
    localStorage.setItem('Id', id)
    localStorage.setItem('Name', name)
    localStorage.setItem('Age', age)
  }

  function handleDelete(id) {
    var index = getIndexById(id);

    EmployeesList.splice(index, 1);
    history("/");
  }

  return (
    <Fragment>
      <Container>
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ width: "100%", marginTop: "2em" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {EmployeesList && EmployeesList.length > 0
              ? EmployeesList.map((item) => {
                  return (
                    <tr>
                      <td>{item.Name}</td>
                      <td>{item.Age}</td>
                      <td>
                        <Link to={"/edit"}>
                          <Button onClick={() => handleEdit(item.Id, item.Name, item.Age)}>
                            Edit
                          </Button>
                        </Link>
                        <Button onClick={() => handleDelete(item.Id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : "No Data Avaliable"}
          </tbody>
        </Table>
        <br />
        <Link className="d-grid gap-2" to={"/create"}>
          <Button size="lg">Create</Button>
        </Link>
      </Container>
    </Fragment>
  );
}

export default Home;
