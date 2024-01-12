function handleFormSubmit(event) {
    event.preventDefault();

    let myObj = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    axios.post("https://crudcrud.com/api/6a28809a875649078b90fcfdf2659283/appointmentData", myObj)
        .then((response) => {
            console.log(response);

            // Clear input fields after form submission
            event.target.username.value = '';
            event.target.email.value = '';
            event.target.phone.value = '';

            // Call domContentLoader to load existing data after form submission
            domContentLoader();
        })
        .catch((err) => {
            console.log(err);
        });
}


// Function to load existing data from CRUD API
function domContentLoader() {
    axios.get("https://crudcrud.com/api/6a28809a875649078b90fcfdf2659283/appointmentData")
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

    const list = document.querySelector("ul");
    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(string);
    newLi.appendChild(newLiText);
    list.appendChild(newLi);

    const deleteBtn = document.createElement('button');
    const deleteBtnText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.className = 'delete-btn';
    newLi.appendChild(deleteBtn);

    newLi.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const userToDelete = event.target.parentElement;
            userToDelete.remove();
            // Perform API call to delete user data
            axios.delete(`https://crudcrud.com/api/6a28809a875649078b90fcfdf2659283/appointmentData/${userObj._id}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        } 
    });

}

document.addEventListener('DOMContentLoaded', domContentLoader);
