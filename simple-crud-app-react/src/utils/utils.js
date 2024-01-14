import EmployeesList from "../components/Employees";

function getIndexById(id) {
  var employeesIdsList = EmployeesList.map((e) => {
    return e.Id;
  });

  var index = employeesIdsList.indexOf(parseInt(id));
  return index;
}

function getEmployeeById(id) {
  var index = getIndexById(id);

  return EmployeesList[index];
}

export default getIndexById;
