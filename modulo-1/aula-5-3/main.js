let phoneList = document.getElementById("phone-list");
let buttonField = document.getElementById("button-field");
let addButton = document.createElement("button");

addButton.textContent = "Add";
addButton.type = "button";
buttonField.appendChild(addButton);

addButton.addEventListener("click", () => {
  let div = document.createElement("div");
  let newInput = document.createElement("input");
  let deleteButton = document.createElement("button");
  newInput.type = "text";
  newInput.name = "phone";
  newInput.placeholder = "Phone";
  deleteButton.textContent = "Del";
  deleteButton.type = "button";

  div.appendChild(newInput);
  div.appendChild(deleteButton);
  phoneList.appendChild(div);

  deleteButton.addEventListener("click", () => {
    div.remove();
  });
});
