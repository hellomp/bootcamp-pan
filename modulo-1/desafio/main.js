const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const sortingSelect = document.querySelector("select");
const filterContainer = document.getElementById("filter-container");
let checkboxes;

let rawEmployees = [];
let employees = [];
let roles = [];

sortingSelect.addEventListener("change", renderData);

async function init() {
  [rawEmployees, roles] = await Promise.all([listEmployees(), listRoles()]);
  renderFilter();
  renderData();
}

function renderData() {
  filterEmployees();
  sortEmployees();
  renderTable();
}

init();

function listEmployees() {
  return fetchData("http://localhost:3000/employees");
}

function listRoles() {
  return fetchData("http://localhost:3000/roles");
}

async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function sortEmployees() {
  employees.sort((a, b) => {
    switch (sortingSelect.value) {
      case "name-asc":
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      case "name-desc":
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
      case "salary-asc":
        return a.salary - b.salary;
      case "salary-desc":
        return b.salary - a.salary;
    }
  });
}

function filterEmployees() {
  let newEmployees = [];
  let filters = [];
  const checkeds = document.querySelectorAll("input[type=checkbox]:checked");

  for (let i = 0; i < checkeds.length; i++) {
    filters.push(+checkeds[i].value);
  }
  console.log(filters);

  filters.forEach((filter) => {
    newEmployees.push.apply(
      newEmployees,
      rawEmployees.filter((employee) => employee.role_id == filter)
    );
  });
  employees = newEmployees;
}

function renderTable() {
  tbody.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    tbody.appendChild(row);

    const idCol = document.createElement("td");
    row.appendChild(idCol);
    idCol.textContent = employee.id;

    const nameCol = document.createElement("td");
    row.appendChild(nameCol);
    nameCol.textContent = employee.name;

    const roleCol = document.createElement("td");
    row.appendChild(roleCol);
    let role = roles.find((role) => role.id == employee.role_id);
    roleCol.textContent = role.name;

    const salaryCol = document.createElement("td");
    row.appendChild(salaryCol);
    salaryCol.textContent = employee.salary;
  });
}

function renderFilter() {
  roles.forEach((role) => {
    let checkboxContainer = document.createElement("div");
    filterContainer.appendChild(checkboxContainer);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = role.id;
    checkbox.checked = true;
    checkboxContainer.appendChild(checkbox);

    let checkboxLabel = document.createElement("label");
    checkboxLabel.textContent = role.name;
    checkboxContainer.appendChild(checkboxLabel);
  });
  checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", renderData);
  });
}
