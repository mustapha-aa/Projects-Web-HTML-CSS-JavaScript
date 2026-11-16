let name_input = document.getElementById('name');
let email_input = document.getElementById('email');
let password_input = document.getElementById('password');
let confirmPassword_input = document.getElementById('confirm-password');


let registrationForm = document.getElementById('registration-form');

let loginForm = document.getElementById('login-form');

let forgotPassForm = document.getElementById('forgotPass-Form');


function seveInfoUser() {
    if(password_input.value === confirmPassword_input.value){
        if (localStorage.getItem("users") === null) {
            localStorage.setItem("users", JSON.stringify([]));
        }
    
        let user = {
            name: name_input.value,
            email: email_input.value,
            password: password_input.value
        };
        let users = JSON.parse(localStorage.getItem("users"));
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));

        alert('Registration successful!');
        // Refresh Page
        location.reload();
    }
    else{
        alert('Passwords do not match!');
    }

}

let realUserPassword = '';
function UserExists() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let exists = false;
    users.forEach(element => {
        if(element.email.toLowerCase() === email_input.value.toLowerCase()){
            realUserPassword = element.password;
            exists = true;
        }
    });

    return exists;
}



if(registrationForm){

    registrationForm.addEventListener('submit', function(e){
        e.preventDefault();

        if(UserExists()){
            alert('This user already exists!');
        }
        else{
            seveInfoUser();
        }
    });
}



if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();


        if(UserExists()){
            if(password_input.value === realUserPassword){
                alert('Login successful!');
                // Refresh Page
                location.reload();
            }
            else{
                alert('Incorrect password!');
            }
        }
        else{
            alert('User not found! Please create an account.');
        }
    });
}


if(forgotPassForm){
    forgotPassForm.addEventListener('submit', function(e){
        e.preventDefault();


        if(UserExists()){
            alert('Check your email for a verification code.');
            // Refresh Page
            location.reload();
        }
        else{
            alert('No account found with this email!');
        }
    });
}