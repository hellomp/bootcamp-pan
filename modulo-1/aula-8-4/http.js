function fetchJson(url, options) {
  console.log("fetch");
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function listEmployees() {
  return fetchJson("http://localhost:3000/employees");
}

export function listRoles() {
  return fetchJson("http://localhost:3000/roles");
}

export function updateEmployee(id, employee) {
  console.log("update");
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
