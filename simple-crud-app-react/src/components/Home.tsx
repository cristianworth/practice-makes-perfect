import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmployeesList from "./Employees.tsx";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  var navigate = useNavigate();

  function handleEdit(id) {}

  function handleDelete(id) {
    var employeesIds = EmployeesList.map((e) => {
      return e.Id;
    });

    var index = employeesIds.indexOf(id);

    EmployeesList.splice(index, 1);
    navigate("/");
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {EmployeesList.map((row) => (
            <TableRow key={row.Id}>
              <TableCell align="center">{row.Id}</TableCell>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="center">{row.Age}</TableCell>
              <TableCell align="center">
                <Link to={"/edit"}>
                  <Button onClick={() => handleEdit(row.Id)}>Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(row.Id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to={"/create"}>
        <Button>Create</Button>
      </Link>
    </TableContainer>
  );
}

export default Home;
