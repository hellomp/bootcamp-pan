import {
  listEmployees,
  listRoles,
  updateEmployee,
  createEmployee,
  deleteEmployee,
} from "./http.js";

const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const deleteBtn = document.getElementById("delete");
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("submit");

let employees,
  roles = [];
let selectedItem;

cancelBtn.addEventListener("click", clearSelection);
deleteBtn.addEventListener("click", onDelete);
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
  submitBtn.textContent = "Update";
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
  submitBtn.textContent = "Create";
  clearError();
}

async function onSubmit(evt) {
  evt.preventDefault();
  const employeeData = {
    name: formEl.name.value,
    salary: formEl.salary.valueAsNumber,
    role_id: +formEl.role.value,
  };
  if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {
    printError("Fill all form fields");
  } else {
    if (selectedItem) {
      const updatedEmployee = await updateEmployee(
        selectedItem.id,
        employeeData
      );
      const i = employees.indexOf(selectedItem);
      employees[i] = updatedEmployee;
      renderData();
      selectItem(updatedEmployee, listEl.children[i]);
    } else {
      const createdEmployee = await createEmployee(employeeData);
      employees.push(createdEmployee);
      renderData();
      selectItem(createdEmployee, listEl.lastChild);
      listEl.lastChild.scrollIntoView();
    }
  }
}

async function onDelete() {
  if (selectedItem) {
    await deleteEmployee(selectItem.id);
    const i = employees.indexOf(selectedItem);
    employees.splice(i, 1);
    renderData();
    clearSelection();
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

export function printError(message, error) {
  document.getElementById("error").textContent = message;
  if (error) {
    console.error(error);
  }
}

function clearError() {
  document.getElementById("error").textContent = "";
}
