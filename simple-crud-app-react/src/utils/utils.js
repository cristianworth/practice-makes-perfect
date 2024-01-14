import React from "react";
import EmployeesList from "../components/Employees";

function getIndexById(id) {
  var employeesIdsList = EmployeesList.map((e) => {
    return e.Id;
  });

  var index = employeesIdsList.indexOf(id);
  return index;
}

export default getIndexById;
