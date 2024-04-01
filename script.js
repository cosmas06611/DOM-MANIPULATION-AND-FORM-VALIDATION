// get all the vital element in html by accessing using dom manipulation 

const form = document.querySelector('#create-account-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput =document.querySelector('#Confirm-Password');


// adding event listner to our form, taking note of the type in buttom as "submit" 
// we do this to ensure our form is submitted appropriately if we change the type attribute 
// in button element to be something else it wont work hence type="submit"

form.addEventListener('submit', (event) => {
//  prevent our form from submitting intermitently

    // to validate the input field we would invoke a function here
    validateForm();

    // to check if all inputs were filled by user , if yes we can proceed to submit the form else we use preventDefault
    if(isFormValid() == true){
        form.submit();
    }else{
        event.preventDefault()
    }

})
// we write a function to check is all the input group was filled appropriately
// to enable the user submit the form,
function isFormValid(){
    // we select input-groups using queryselect all
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container)=>{
        if(container.classList.contains('error')){
            result=false;
        }
    })
    return result;
}

function validateForm(){
    // USERNAME
    // first we check is usernameInput value is empty
    if(usernameInput.value.trim() === ''){
        // we can invoke a function setError by passing in our Arguements as usernameInput and the message
        //  telling the user he or she has not passed in a value
        setError(usernameInput, 'Name can not be empty' )
    }
    // we can also validate the length of character user tries to input 
    // here i will set the length to a min of 2 and a max of 4
    else if(usernameInput.value.trim().length < 2){
        setError(usernameInput, 'Name must be max 2 character')
    }
    // WE CALL A SUCCESS FUNCTION IF THE FORM VALIDATE TO BE SUCCESS
    else {
        setSuccess(usernameInput)
    }
    // EMAIL
    // we would check if email input field is empty
    if(emailInput.value.trim() === ''){
        setError(emailInput, 'Email can not be empty')
    }
    // we would also check for a valid email by calling a function inside the else if-statement
    else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput)
    }
    // if the email is not valid we call the setError function
    else{
        setError(emailInput, 'provide a valid email')
    }
    // PASSWORD
    // we would validate the password
    if(passwordInput.value.trim() === ''){
        setError(passwordInput, 'Password can not be empty')
    }
    // we valid the min character and max character of password 
    else if(passwordInput.value.trim().length < 5 || passwordInput.value.trim().length > 15){
        setError(passwordInput, "password min 5 characters and max 15 character")
    }
    // if the user meets the above validation
    else{
        setSuccess(passwordInput)
    }
    // CONFIRMPASSWORD
    // we would validate the confirm password input field
    if(confirmPasswordInput.value.trim() === ''){
        setError(confirmPasswordInput, 'password can not be empty')
    }
    // we would check if confirmPasswordInput and passwordInput are not thesame
    else if(confirmPasswordInput.value!== passwordInput.value ){
        setError(confirmPasswordInput, 'Password does not match')
    }
    // we would call set success if the above is valid
    else{
        setSuccess(confirmPasswordInput);
    }
}

// we create out function setError here: accessing the parent element
// of usernameInput which is our <div class="input-group"> 
// dont forget the <div class="input-group"> has an invisible attribute of success and error class
// we use the add methode to include the class="error" back to the <div class="input-group">
function setError(element, errorMessage){
    const parent = element.parentElement;
    // we check if the parent <div class="input-group"> constains class ="success"
    // we then remove it using remove method
    if(parent.classList.contains('success')){
        parent.classList.remove('success')
    }
    parent.classList.add('error');
    // we would also access our paragraph  through the parent element error message  and insert our error message using textContent
    const paragraphErrorMessage = parent.querySelector('p');
    paragraphErrorMessage.textContent = errorMessage;
}

function setSuccess(element){
    // we access the parent and add class success to it using classList
    const parent = element.parentElement;
    // we can also check if parent contains class="error" and use the remove method to remove 'error class
    if(parent.classList.contains('error')){
        parent.classList.remove('error')
    }
    parent.classList.add('success');

}

function isEmailValid(email){
    const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return reg.test(email);
}