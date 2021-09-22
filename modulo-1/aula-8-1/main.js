//==================MUITO LONGO===================================
function solution1() {
  fetch("http://localhost:3000/employees").then((res) => {
    res.json().then((employees) => {
      fetch("http://localhost:3000/roles").then((res) => {
        res.json().then((roles) => {
          printData(employees, roles);
        });
      });
    });
  });
}

//=============CARREGAMENTO SEQUENCIAL=================================
function solution2() {
  fetchJson("http://localhost:3000/employees")
    .then((employees) => {
      fetchJson("http://localhost:3000/roles")
        .then((roles) => {
          printData(employees, roles);
        })
        .catch(printError);
    })
    .catch(printError);
}

//==============CARREGAMENTO PARALELO=======================================
function solution3() {
  Promise.all([
    fetchJson("http://localhost:3000/employees"),
    fetchJson("http://localhost:3000/roles"),
  ])
    .then(([employees, roles]) => {
      printData(employees, roles);
    }, printError)
    .finally(() => {
      console.log("Loaded");
    });
}

//=============CARREGAMENTO SEQUENCIAL ASSINCRONO=================================
async function solution4() {
  try {
    let employees = await fetchJson("http://localhost:3000/employees");
    let roles = await fetchJson("http://localhost:3000/roles");
    printData(employees, roles);
  } catch (error) {
    printError(error);
  }
}

//==============CARREGAMENTO PARALELO ASSINCRONO=======================================
async function solution5() {
  try {
    let [employees, roles] = await Promise.all([
      fetchJson("http://localhost:3000/employes"),
      fetchJson("http://localhost:3000/roles"),
    ]);
    printData(employees, roles);
  } catch (error) {
    printError(error);
  } finally {
    console.log("Loaded");
  }
}

solution3();

function fetchJson(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}

function printData(employees, roles) {
  for (const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    console.log(`${employee.id} - ${employee.name} : ${role.name}`);
  }
}

function printError(error) {
  console.error(error);
}
