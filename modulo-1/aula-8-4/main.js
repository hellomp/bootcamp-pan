import {
  listEmployees,
  listRoles,
  updateEmployee,
  createEmployee,
} from "./http.js";

const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const deleteBtn = document.getElementById("delete");
const cancelBtn = document.getElementById("cancel");
const updateBtn = document.getElementById("update");
const createBtn = document.getElementById("create");

let employees,
  roles = [];
let selectedItem;

cancelBtn.addEventListener("click", clearSelection);
formEl.addEventListener("submit", onSubmit);

async function init() {
  [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
  renderRoles();
  renderData();
  clearSelection();
}

init();

function selectItem(employee, li) {
  clearSelection();
  selectedItem = employee;
  li.classList.add("selected");
  formEl.name.value = employee.name;
  formEl.salary.valueAsNumber = employee.salary;
  formEl.role.value = employee.role_id;
  deleteBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

function clearSelection() {
  selectedItem = undefined;
  const li = listEl.querySelector(".selected");
  if (li) {
    li.classList.remove("selected");
  }
  formEl.name.value = "";
  formEl.salary.value = "";
  formEl.role.value = "";
  deleteBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

async function onSubmit(evt) {
  evt.preventDefault();
  const employeeData = {
    name: formEl.name.value,
    salary: formEl.salary.valueAsNumber,
    role_id: +formEl.role.value,
  };
  if (selectedItem) {
    const updatedEmployee = await updateEmployee(selectedItem.id, employeeData);
    const i = employees.indexOf(selectedItem);
    employees[i] = updatedEmployee;
    renderData();
    selectItem(updatedEmployee, listEl.children[i]);
  } else {
    const createdEmployee = await createEmployee(employeeData);
    employees.push(createdEmployee);
    renderData();
    selectItem(createdEmployee, listEl.lastChild);
  }
}

function renderData() {
  listEl.innerHTML = "";
  for (const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = employee.name;
    const divRole = document.createElement("div");
    divRole.textContent = role.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    listEl.appendChild(li);
    li.addEventListener("click", () => selectItem(employee, li));
  }
}

function renderRoles() {
  for (const role of roles) {
    const option = document.createElement("option");
    option.textContent = role.name;
    option.value = role.id;
    formEl.role.appendChild(option);
  }
}

function printError(error) {
  document.getElementById("error").textContent = "Erro ao carregar dados";
  console.error(error);
}
