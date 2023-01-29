const FormValidation = () => {
    var isValid = true;
    if (document.getElementById("firstname") != null) {
        if (document.getElementById("firstname")?.value === "") {
            isValid = false;
            document.getElementById("firstname").closest(".input-field").getElementsByTagName("span")[0].innerText = "* First name is must";
        } else {
            document.getElementById("firstname").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    if (document.getElementById("lastname") != null) {
        if (document.getElementById("lastname").value === "") {
            isValid = false;
            document.getElementById("lastname").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Last name is must";
        } else {
            document.getElementById("lastname").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    if (document.getElementById("email") != null) {
        if (document.getElementById("email").value === "") {
            isValid = false;
            document.getElementById("email").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Email is must";
        } else {
            document.getElementById("email").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    if (document.getElementById("username") != null) {
        if (document.getElementById("username").value === "") {
            isValid = false;
            document.getElementById("username").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Username is must";
        } else {
            document.getElementById("username").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    if (document.getElementById("password") != null) {
        if (document.getElementById("password").value === "") {
            isValid = false;
            document.getElementById("password").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Password is must";
        } else {
            document.getElementById("password").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    if (document.getElementById("confirmpassword") != null) {
        if (document.getElementById("confirmpassword").value === "") {
            isValid = false;
            document.getElementById("confirmpassword").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Confirm Password is must";
        } else if (document.getElementById("password").value !== document.getElementById("confirmpassword").value) {
            isValid = false;
            document.getElementById("confirmpassword").closest(".input-field").getElementsByTagName("span")[0].innerText = "* Confirm Password is not same";
        } else {
            document.getElementById("confirmpassword").closest(".input-field").getElementsByTagName("span")[0].innerText = "";
        }
    }
    return isValid;
}

export default FormValidation