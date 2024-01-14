function handleFormSubmit(event) {
  event.preventDefault();

  let myObj = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/0008e919d5534fc98e7f8a708c475333/AppointmentData",
      myObj
    )
    .then((response) => {
      console.log(response);

      // Clear input fields after form submission

      // Call domContentLoader to load existing data after form submission
      domContentLoader();
    })
    .catch((err) => {
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", domContentLoader);

// Function to load existing data from CRUD API
function domContentLoader() {
  axios
    .get(
      "https://crudcrud.com/api/0008e919d5534fc98e7f8a708c475333/AppointmentData"
    )
    .then((response) => {
      const appointmentData = response.data;

      appointmentData.forEach((userObj) => {
        showUserDetailsOnTheScreen(userObj);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Function to show user details on the screen
function showUserDetailsOnTheScreen(userObj) {
  const string = `${userObj.username} - ${userObj.email} - ${userObj.phone}`;

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  const list = document.querySelector("ul");
  const newLi = document.createElement("li");
  const newLiText = document.createTextNode(string);
  newLi.appendChild(newLiText);
  list.appendChild(newLi);

  const deleteBtn = document.createElement("button");
  const deleteBtnText = document.createTextNode("Delete");
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.className = "delete-btn";
  newLi.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  const editBtnText = document.createTextNode("Edit");
  editBtn.appendChild(editBtnText);
  editBtn.className = "edit-btn";
  newLi.appendChild(editBtn);

  newLi.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const userToDelete = event.target.parentElement;
      userToDelete.remove();
      deleteUser(userObj._id);
    } else if (event.target.classList.contains("edit-btn")) {
      newLi.remove();
      handleEdit(userObj._id, userObj.username, userObj.email, userObj.phone);
    }
  });
}

function deleteUser(id) {
  // Perform API call to delete user data
  axios
    .delete(
      `https://crudcrud.com/api/0008e919d5534fc98e7f8a708c475333/AppointmentData/${id}`
    )
    .then((response) => {
      removeUserFromScreen(id);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEdit(id, username, email, phone) {
  document.getElementById("username").value = username;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  deleteUser(id);
}

function removeUserFromScreen(id) {
  const parentNode = document.getElementById("listofitems");
  const ChildNodeToBeRemoved = document.getElementById(id);
  if (ChildNodeToBeRemoved) {
    parentNode.removeChild(ChildNodeToBeRemoved);
  }
}
