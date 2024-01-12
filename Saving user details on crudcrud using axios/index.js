function handleFormSubmit(event){

    event.preventDefault();

    let myObj = {
        username : event.target.username.value,
        email : event.target.email.value,
        phone : event.target.phone.value
    };

    // axios.post("https://crudcrud.com/api/6a28809a875649078b90fcfdf2659283/appointmentData", myObj)
    // .then((response) => {
    //     console.log(response)
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
    
    localStorage.setItem(myObj.email, JSON.stringify(myObj));

    const string = `${myObj.username} - ${myObj.email} - ${myObj.phone}`;
    
    const list = document.querySelector("ul");
    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(string);
    newLi.appendChild(newLiText);
    list.appendChild(newLi);

    // Clear input fields after form submission
    event.target.username.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';

    const deleteBtn = document.createElement('button');
    const deleteBtnText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.className = 'delete-btn';
    newLi.appendChild(deleteBtn);

    // Add an Edit button
    const editBtn = document.createElement('button');
    const editBtnText = document.createTextNode('Edit');
    editBtn.appendChild(editBtnText);
    editBtn.className = 'edit-btn';
    newLi.appendChild(editBtn);

    newLi.addEventListener('click', function(event){
        if(event.target.classList.contains('delete-btn')){
            // const userToDelete = event.target.parentElement;
            // userToDelete.remove();
            newLi.remove();
            localStorage.removeItem(myObj.email);
        } else if(event.target.classList.contains('edit-btn')){
            handleEdit(myObj); // Pass myObj to handleEdit
        }
    });

    function handleEdit(userObj) {
        // Remove user details from the screen
        newLi.remove();

        // Populate input fields with existing values
        event.target.username.value = userObj.username;
        event.target.email.value = userObj.email;
        event.target.phone.value = userObj.phone;

        // Remove user details from local storage
        localStorage.removeItem(userObj.email);
    }
}

