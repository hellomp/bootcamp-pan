import { printError } from "./main.js";

async function fetchJson(url, options) {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch (err) {
    printError("Error loading data", err);
    throw err;
  }
}

export function listEmployees() {
  return fetchJson("http://localhost:3000/employees");
}

export function listRoles() {
  return fetchJson("http://localhost:3000/roles");
}

export function updateEmployee(id, employee) {
  return fetchJson(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
}

export function createEmployee(employee) {
  return fetchJson(`http://localhost:3000/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
}

export function deleteEmployee(id) {
  return fetchJson(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  });
}
