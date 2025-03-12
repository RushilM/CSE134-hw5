document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    form.appendChild(errorMessage);

    let form_errors = []; // Array to track errors

    /** =============================== **/
    /**  MASKING MECHANISM (LIVE CHECK) **/
    /** =============================== **/
    function maskInput(event, regex, field, message) {
        if (!regex.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
            flashError(field, message);
        }
    }

    function flashError(field, message) {
        field.style.border = "2px solid red";
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
        setTimeout(() => {
            field.style.border = "";
            errorMessage.textContent = "";
        }, 2000);
    }

    // Masking for Name Field (Only Letters & Spaces)
 

    /** ============================= **/
    /**  CUSTOM VALIDATION MESSAGES  **/
    /** ============================= **/
    function validateField(field, message) {
        if (!field.checkValidity()) {
            field.setCustomValidity(message);
            addError(field.name, message);
        } else {
            field.setCustomValidity("");
        }
    }

    
    emailField.addEventListener("input", () => validateField(emailField, "Enter a valid email address (example@domain.com)."));
    messageField.addEventListener("input", () => validateField(messageField, "Message must be at least 10 characters."));

    /** ======================================= **/
    /**  CHARACTER COUNTDOWN (Textarea Message) **/
    /** ======================================= **/
    const charCounter = document.createElement("div");
    charCounter.id = "char-counter";
    messageField.parentElement.appendChild(charCounter);

    messageField.addEventListener("input", function () {
        let remaining = 500 - messageField.value.length;
        charCounter.textContent = `Characters left: ${remaining}`;

        if (remaining < 50) {
            charCounter.style.color = "orange";
        } else if (remaining < 10) {
            charCounter.style.color = "red";
        } else {
            charCounter.style.color = "black";
        }
    });


    function addError(field, message) {
        form_errors.push({ field: field, error: message });
    }

    form.addEventListener("submit", function (event) {
        form_errors = []; // Reset error tracking

        // Force validation before submission
        validateField(nameField, "Name must contain only letters and spaces.");
        validateField(emailField, "Enter a valid email address.");
        validateField(messageField, "Message must be at least 10 characters.");

        if (form_errors.length > 0) {
            event.preventDefault(); // Stop submission if errors exist
            const hiddenErrorsField = document.createElement("input");
            hiddenErrorsField.type = "hidden";
            hiddenErrorsField.name = "form-errors";
            hiddenErrorsField.value = JSON.stringify(form_errors);
            form.appendChild(hiddenErrorsField);
        }
    });
});
